"use client";

import { useSearchParams } from "next/navigation";
import useCatSearchControl from "../hooks/use-cat-search-control/use-cat-search-control";
import PageContentContainer from "../components/clients/Page-content-container";
import isLoading from "../helpers/is-loading";
import ControlSection from "./components/Controll-section";
import { SelectValue } from "../hooks/use-cat-search-control/helpers/get-breeds-select-values";
import { useEffect } from "react";
import CatView from "../components/clients/Cat-view";

const searchBreedName = (
  breedValues: SelectValue[],
  searchBreedName: string | null
) =>
  searchBreedName
    ? breedValues.find(
        (breedData) =>
          breedData.name.toLowerCase() === searchBreedName.toLowerCase()
      )?.value
    : undefined;

function SearchPage() {
  const searchParams = useSearchParams();
  const targetBreedName = searchParams.get("value");

  const {
    breedsSelectValue,
    setCurBreedId,
    breedsDataStatus,
    imagesDataStatus,
    hasMore,
    allImages,
    setPageIndex,
    setAllImages,
  } = useCatSearchControl();

  const controlSectionElement = <ControlSection />;

  const findBreed = searchBreedName(breedsSelectValue, targetBreedName);

  useEffect(() => {
    if (!findBreed) {
      return;
    }
    setAllImages([]);
    setCurBreedId(findBreed);
  }, [findBreed]);

  return (
    <PageContentContainer
      isNothingFound={!findBreed}
      isLoading={isLoading(breedsDataStatus)}
      controlSection={controlSectionElement}
    >
      {Boolean(findBreed) && (
        <CatView
          isLoading={isLoading(imagesDataStatus)}
          hasMore={hasMore}
          allImages={allImages ?? []}
          loadMore={() => setPageIndex((prev) => prev + 1)}
        />
      )}
    </PageContentContainer>
  );
}

export default SearchPage;
