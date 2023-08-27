"use client";

import CatFeedbackButton from "../components/clients/Cat-feedback-button";
import { useApi } from "../hooks/use-api";
import getMoreImages from "../hooks/use-cat-search-control/helpers/get-more-images";
import { DataStatus, ImageType, Sort } from "../common/enums";
import { CatImageData, Vote, api } from "@/app/api/api";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import PageContentContainer from "../components/clients/Page-content-container";
import ControlSection from "./components/Controll-section";
import isSuccess from "../helpers/isSuccess";
import { imageBlurBase64 } from "../common/constants";
import { addFavorite, getFavoriteLogs } from "../api/favorites";
import { MessageContainer } from "./components/Vote-message-container";

async function vote(
  isLike: boolean,
  setImageIndex: Dispatch<SetStateAction<number>>,
  setIsLoading: Dispatch<SetStateAction<DataStatus>>,
  imageId?: string
) {
  if (imageId) {
    setIsLoading(DataStatus.PENDING);
    await api.breeds.vote(imageId, isLike);
  }
  setImageIndex((prev) => prev + 1);
}

async function getVotes() {
  const response = await api.breeds.getVotes();

  return response.json() as Promise<Vote[]>;
}

interface GetAddFavoriteInstanceParam {
  setDataStatus: Dispatch<SetStateAction<DataStatus>>;
  image_id?: string;
  setImageIndex: Dispatch<SetStateAction<number>>;
}

function getAddFavoriteInstance({
  setDataStatus,
  image_id,
  setImageIndex,
}: GetAddFavoriteInstanceParam) {
  return async () => {
    setDataStatus(DataStatus.PENDING);
    await addFavorite(image_id ?? "");
    setImageIndex((prev) => prev + 1);
  };
}

export default function Voting() {
  const [voteDataStatus, setVoteDataStatus] = useState<DataStatus>(
    DataStatus.IDLE
  );
  const [imageIndex, setImageIndex] = useState(0);

  const { data: votesData, dataStatus: newVoteDataStatus } = useApi<Vote[]>({
    apiCallFunc: getVotes,
    depsArray: [imageIndex],
  });

  const { data, dataStatus } = useApi<{
    images: CatImageData[];
  }>({
    apiCallFunc: getMoreImages({
      itemsPerPage: 1,
      pageIndex: imageIndex,
      breed: null,
      sortOrder: Sort.RANDOM,
      imageType: ImageType.STATIC,
    }),
    depsArray: [imageIndex],
  });

  useEffect(() => {
    setVoteDataStatus(newVoteDataStatus);
  }, [newVoteDataStatus]);

  const controlSection = (
    <>
      <ControlSection />
    </>
  );

  const image = data?.images[0];

  const addFavorite = getAddFavoriteInstance({
    setDataStatus: setVoteDataStatus,
    image_id: image?.id,
    setImageIndex,
  });
  const favorites = getFavoriteLogs();

  return (
    <PageContentContainer
      isLoading={!isSuccess(dataStatus) || !isSuccess(voteDataStatus)}
      controlSection={controlSection}
      isNothingFound={!image}
    >
      <div className="relative mb-[60px]">
        <Image
          src={image?.url ?? ""}
          placeholder="blur"
          blurDataURL={imageBlurBase64}
          alt={`cat`}
          className="w-[640px] h-[360px] object-cover rounded-[20px]"
          width={640}
          height={360}
          priority={true}
        />
        <CatFeedbackButton
          onFavorite={addFavorite}
          onVoteLike={() =>
            vote(true, setImageIndex, setVoteDataStatus, image?.id)
          }
          onVoteDislike={() =>
            vote(false, setImageIndex, setVoteDataStatus, image?.id)
          }
          className={
            "absolute left-1/2 transform -translate-x-1/2 bottom-[-42px]"
          }
        />
      </div>
      <MessageContainer votesData={votesData} favoritesData={favorites} />
    </PageContentContainer>
  );
}
