"use client";

import isLoading from "@/app/helpers/is-loading";
import CatView from "../components/clients/Cat-view";
import ControlPanel from "./components/control-panel";
import useCatSearchControl from "../hooks/use-cat-search-control/use-cat-search-control";
import PageContentContainer from "../components/clients/Page-content-container";

export default function Breeds() {
  const {
    hasMore,
    breedsSelectValue,
    handleSortOrderChange,
    imagesDataStatus,
    allImages,
    setAllImages,
    setPageIndex,
    setCurBreedId,
    setItemsPerPage,
    sortOrder,
    breedsDataStatus,
    pageIndex,
  } = useCatSearchControl();

  const controlSection = (
    <ControlPanel
      onAllImageChange={setAllImages}
      onCurBreedIdChange={setCurBreedId}
      onItemsPerPageChange={setItemsPerPage}
      onPageIndexChange={setPageIndex}
      breedsSelectValue={breedsSelectValue}
      handleSortChange={handleSortOrderChange}
      sortOrder={sortOrder}
    />
  );

  return (
    <PageContentContainer
      isLoading={
        isLoading(breedsDataStatus) ||
        (isLoading(imagesDataStatus) && pageIndex === 0)
      }
      controlSection={controlSection}
      isNothingFound={!allImages?.length}
    >
      <CatView
        isLoading={isLoading(imagesDataStatus)}
        hasMore={hasMore}
        allImages={allImages ?? []}
        loadMore={() => setPageIndex((prev) => prev + 1)}
      />
    </PageContentContainer>
  );
}
