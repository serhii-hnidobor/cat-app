"use client";

import { Breed, CatImageData, api } from "../api/api";
import { Dispatch, SetStateAction, useState } from "react";
import { useApi } from "../hooks/use-api";
import isLoading from "@/app/helpers/is-loading";
import CatView from "./components/cat-view";
import ControlPanel from "./components/control-panel";
import { Sort } from "../common/enums";

const isHasMore = (
  allItemsArray: unknown[] | null = [],
  totalItemsNum: number | null = 0
) =>
  Boolean(
    allItemsArray &&
      totalItemsNum &&
      allItemsArray?.length > 0 &&
      totalItemsNum > allItemsArray.length
  );
interface GetMoreImagesProps {
  itemsPerPage: number;
  pageIndex: number;
  breed: string | null;
  onTotalImagesChange: Dispatch<SetStateAction<number | null>>;
  onAllImagesChange: Dispatch<SetStateAction<CatImageData[] | null>>;
  sortOrder?: Sort;
}

const getMoreImages =
  ({
    itemsPerPage,
    pageIndex,
    breed,
    onAllImagesChange,
    onTotalImagesChange,
    sortOrder,
  }: GetMoreImagesProps) =>
  async () => {
    const apiResponse = await api.breeds.getImages({
      limit: itemsPerPage,
      page: pageIndex,
      has_breeds: 1,
      breed,
      order: sortOrder,
    });

    const totalImages = apiResponse.headers["pagination-count"];

    const images = apiResponse.data;

    onTotalImagesChange(Number(totalImages));

    onAllImagesChange((prev) => (prev ? prev.concat(images) : images));

    return { images, totalImages: Number(totalImages) };
  };

const getBreedsSelectValues = (breedsData: Breed[] | null) =>
  breedsData?.map((data) => ({ name: data.name, value: data.id })) || [];

const getHandleChangeSortOrder = (
  setSortOrder: Dispatch<SetStateAction<Sort>>,
  setAllImages: Dispatch<SetStateAction<CatImageData[] | null>>
) => {
  return (sortOrder: Sort) => {
    setSortOrder(sortOrder);
    setAllImages([]);
  };
};

export default function Breeds() {
  const [allImages, setAllImages] = useState<CatImageData[] | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [curBreedId, setCurBreedId] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalImages, setTotalImages] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<Sort>(Sort.ASC);

  const { data: breedsData } = useApi<Breed[]>({
    apiCallFunc: async () => {
      const res = await api.breeds.getAll();
      return res.data;
    },
    depsArray: [],
  });

  const { dataStatus: imagesDataStatus } = useApi<{
    images: CatImageData[];
    totalImages: number;
  }>({
    apiCallFunc: getMoreImages({
      itemsPerPage,
      pageIndex,
      onAllImagesChange: setAllImages,
      onTotalImagesChange: setTotalImages,
      breed: curBreedId,
      sortOrder,
    }),
    depsArray: [pageIndex, curBreedId, itemsPerPage, sortOrder],
  });

  const hasMore = isHasMore(allImages, totalImages);

  const breedsSelectValue = getBreedsSelectValues(breedsData);

  const handleSortOrderChange = getHandleChangeSortOrder(
    setSortOrder,
    setAllImages
  );

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
