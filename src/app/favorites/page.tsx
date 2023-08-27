"use client";

import PageContentContainer from "@/app/components/clients/Page-content-container";
import ControlSection from "./components/Controll-section";
import {
  Favorites,
  addFavorite,
  getFavoriteLogs,
  getFavorites,
} from "../api/favorites";
import isLoading from "../helpers/is-loading";
import CatGrid from "../components/clients/Сat-grid";
import { useCallback, useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import { MessageContainer } from "@/app/voting/components/Vote-message-container";
import { DataStatus } from "../common/enums";

function FavoritePage() {
  const controlSectionElement = <ControlSection />;
  const [favoritesData, setFavoritesData] = useState<Favorites[]>([]);
  const [favoritesDataStatus, setFavoritesDataStatus] = useState<DataStatus>(
    DataStatus.IDLE
  );
  const getFavoritesFunc = useCallback(() => getFavorites(), []);

  useEffect(() => {
    const fetchFavorites = async () => {
      setFavoritesDataStatus(DataStatus.IDLE);
      const favorites = await getFavorites();
      setFavoritesData(favorites);
      setFavoritesDataStatus(DataStatus.SUCCESS);
    };
    fetchFavorites();
  }, []);

  const preparedData = favoritesData?.map(({ image }) => ({ ...image }));

  const favorites = getFavoriteLogs().map((data) => ({
    ...data,
    isFavorite: true,
  }));

  return (
    <PageContentContainer
      isLoading={isLoading(favoritesDataStatus)}
      controlSection={controlSectionElement}
      isNothingFound={!preparedData?.length}
    >
      <SimpleBar className={"h-[460px]"}>
        <CatGrid
          isLikeHover={true}
          breedImages={preparedData ?? []}
          hasMore={false}
          onCatClick={async (_, imageId) => {
            setFavoritesDataStatus(DataStatus.PENDING);
            await addFavorite(imageId);
            const updatedFavorites = await getFavorites();
            setFavoritesData(updatedFavorites);
            setFavoritesDataStatus(DataStatus.SUCCESS);
          }}
        />
      </SimpleBar>
      <MessageContainer votesData={[]} favoritesData={favorites} />
    </PageContentContainer>
  );
}

export default FavoritePage;
