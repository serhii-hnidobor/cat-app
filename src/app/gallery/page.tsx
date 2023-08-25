'use client';

import ControlPanel from "./components/control-panel";
import useCatSearchControl from "../hooks/use-cat-search-control/use-cat-search-control";
import isLoading from "../helpers/is-loading";
import CatViewWithoutInfiniteScroll from "../components/clients/Cat-view-without-infinite-scroll";
import LoadImageModal from "../components/clients/Load-image-modal";
import { useState } from "react";

export default function Gallery() {
    const [isNeedLoadImageModal, setIsNeedLoadImageModal] = useState(false);

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
    } = useCatSearchControl();


    return (
        <div className="w-[680px] h-[850px] bg-white rounded-[20px] p-5 flex flex-col gap-5">
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
            <CatViewWithoutInfiniteScroll
                className="h-[570px]"
                isLoading={isLoading(imagesDataStatus)}
                hasMore={hasMore}
                allImages={allImages ?? []}
                isLikeHover={true}
                onCatClick={() => setIsNeedLoadImageModal(true)}
            />
            <LoadImageModal isOpen={isNeedLoadImageModal} onClose={() => setIsNeedLoadImageModal(false)} />
        </div>
    );
}