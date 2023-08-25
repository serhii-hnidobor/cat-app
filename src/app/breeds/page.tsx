"use client";

import isLoading from "@/app/helpers/is-loading";
import CatView from "../components/clients/Cat-view";
import ControlPanel from "./components/control-panel";
import useCatSearchControl from "../hooks/use-cat-search-control/use-cat-search-control";


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
    } = useCatSearchControl();

    return (
        <div className="w-[680px] h-[850px] bg-white rounded-[20px] p-5">
            <ControlPanel
                onAllImageChange={setAllImages}
                onCurBreedIdChange={setCurBreedId}
                onItemsPerPageChange={setItemsPerPage}
                onPageIndexChange={setPageIndex}
                breedsSelectValue={breedsSelectValue}
                handleSortChange={handleSortOrderChange}
                sortOrder={sortOrder}
            />
            <CatView
                isLoading={isLoading(imagesDataStatus)}
                hasMore={hasMore}
                allImages={allImages ?? []}
                loadMore={() => setPageIndex((prev) => prev + 1)}
            />
        </div>
    );
}
