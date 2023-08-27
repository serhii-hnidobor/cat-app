"use client";

import { useApi } from "@/app/hooks/use-api";
import { CatImageData, api } from "@/app/api/api";
import ControlPanel from "./components/control-panel";
import BreedImgView from "./components/breed-img-slider";
import BreedDescription from "./components/breed-description";
import isLoading from "@/app/helpers/is-loading";
import PageContentContainer from "@/app/components/clients/Page-content-container";

interface PageProps {
  params: { id: string };
}

const getBreed = async (breedId: string): Promise<CatImageData[]> => {
  const res = await api.breeds.getImages({ breed: breedId, limit: 10 });
  return res.json();
};

export default function Page({ params }: PageProps) {
  const { id: breedId } = params;

  const { data: imageData, dataStatus: imageDataStatus } = useApi<
    CatImageData[]
  >({ apiCallFunc: () => getBreed(breedId), depsArray: [] });

  const control = <ControlPanel breedId={breedId} />;

  return (
    <PageContentContainer
      isLoading={isLoading(imageDataStatus)}
      controlSection={control}
      isNothingFound={!imageData?.length}
    >
      <div className="mb-[61px]">
        {imageData && <BreedImgView catImageData={imageData} />}
      </div>
      {imageData && <BreedDescription breed={imageData?.[0]?.breeds?.[0]} />}
    </PageContentContainer>
  );
}
