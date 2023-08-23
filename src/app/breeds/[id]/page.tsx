"use client";

import { useApi } from "@/app/hooks/use-api";
import { CatImageData, api } from "@/app/api/api";
import ControlPanel from "./components/control-panel";
import BreedImgView from "./components/breed-img-slider";
import BreedDescription from "./components/breed-description";
import { ClipLoader } from "react-spinners";
import isLoading from "@/app/helpers/is-loading";

interface PageProps {
  params: { id: string };
}

const getBreed = async (breedId: string) => {
  const res = await api.breeds.getImages({ breed: breedId, limit: 10 });
  return res.data;
};

export default function Page({ params }: PageProps) {
  const { id: breedId } = params;

  const { data: imageData, dataStatus: imageDataStatus } = useApi<
    CatImageData[]
  >({ apiCallFunc: () => getBreed(breedId), depsArray: [] });

  return (
    <div className="w-[680px] h-[850px] bg-white rounded-[20px] p-5">
      {isLoading(imageDataStatus) ? (
        <div className="flex justify-center items-center w-full h-full">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        <>
          <ControlPanel breedId={breedId} />
          <div className="mb-[61px]">
            {imageData && <BreedImgView catImageData={imageData} />}
          </div>
          {imageData && <BreedDescription breed={imageData[0].breeds[0]} />}
        </>
      )}
    </div>
  );
}
