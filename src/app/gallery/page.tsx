"use client";

import ControlPanel from "./components/control-panel";
import useCatSearchControl from "../hooks/use-cat-search-control/use-cat-search-control";
import isLoading from "../helpers/is-loading";
import CatViewWithoutInfiniteScroll from "../components/clients/Cat-view-without-infinite-scroll";
import LoadImageModal from "../components/clients/Load-image-modal";
import { useState } from "react";
import { addFavorite } from "../api/favorites";
import PageContentContainer from "../components/clients/Page-content-container";

export default function Gallery() {
  const [isNeedLoadImageModal, setIsNeedLoadImageModal] = useState(false);
  const [_, setRerender] = useState(false);

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
    setImageType,
    handleGetMore,
    breedsDataStatus,
  } = useCatSearchControl();

  const control = (
    <ControlPanel
      onAllImageChange={setAllImages}
      onCurBreedIdChange={setCurBreedId}
      onItemsPerPageChange={setItemsPerPage}
      onPageIndexChange={setPageIndex}
      breedsSelectValue={breedsSelectValue}
      handleSortChange={handleSortOrderChange}
      sortOrder={sortOrder}
      handleImageTypeChange={setImageType}
      haveMore={hasMore}
      onLoadMore={handleGetMore}
      imagesDataStatus={imagesDataStatus}
      handleUploadImage={() => setIsNeedLoadImageModal(true)}
    />
  );

  return (
    <PageContentContainer
      isNothingFound={!allImages?.length}
      controlSection={control}
      isLoading={isLoading(imagesDataStatus) || isLoading(breedsDataStatus)}
    >
      <CatViewWithoutInfiniteScroll
        className="h-[570px]"
        isLoading={isLoading(imagesDataStatus)}
        hasMore={hasMore}
        allImages={allImages ?? []}
        isLikeHover={true}
        onCatClick={async (_, imageId) => {
          await addFavorite(imageId);
          setRerender((prev) => !prev);
        }}
      />
      <LoadImageModal
        isOpen={isNeedLoadImageModal}
        onClose={() => setIsNeedLoadImageModal(false)}
      />
    </PageContentContainer>
  );
}
