import { useCallback, useState } from "react";
import { ImageType, Sort } from "../../common/enums";
import { Breed, CatImageData, api } from "../../api/api";
import getMoreImages from "./helpers/get-more-images";
import getHandleChangeSortOrder from "./helpers/get-handle-change-sort-order";
import getBreedsSelectValues from "./helpers/get-breeds-select-values";
import { useApi } from "../use-api";
import isHasMore from "../../helpers/pagination/is-has-more";
import getHandleGetMore from "./helpers/get-handle-get-more";

function useCatSearchControl() {
  const [allImages, setAllImages] = useState<CatImageData[] | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [curBreedId, setCurBreedId] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalImages, setTotalImages] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<Sort>(Sort.ASC);
  const [imageType, setImageType] = useState<ImageType>(ImageType.ALL);

  const breedApiCallFunction = useCallback(async () => {
    const res = await api.breeds.getAll();
    return res.json() as Promise<Breed[]>;
  }, []);

  const getMoreImageApiCallFunction = useCallback(() => {
    const func = getMoreImages({
      itemsPerPage,
      pageIndex,
      onAllImagesChange: setAllImages,
      onTotalImagesChange: setTotalImages,
      breed: curBreedId,
      sortOrder,
      imageType,
    });

    return func();
  }, [pageIndex, curBreedId, itemsPerPage, sortOrder, imageType]);

  const { data: breedsData, dataStatus: breedsDataStatus } = useApi<Breed[]>({
    apiCallFunc: breedApiCallFunction,
  });

  const { dataStatus: imagesDataStatus } = useApi<{
    images: CatImageData[];
    totalImages: number;
  }>({
    apiCallFunc: getMoreImageApiCallFunction,
  });

  const hasMore = isHasMore(allImages, totalImages);

  const breedsSelectValue = getBreedsSelectValues(breedsData);

  const handleSortOrderChange = getHandleChangeSortOrder(
    setSortOrder,
    setAllImages
  );

  const handleGetMore = getHandleGetMore(setPageIndex);

  return {
    hasMore,
    breedsSelectValue,
    handleSortOrderChange,
    imagesDataStatus,
    imageType,
    setImageType,
    allImages,
    setAllImages,
    pageIndex,
    setPageIndex,
    curBreedId,
    setCurBreedId,
    itemsPerPage,
    setItemsPerPage,
    totalImages,
    setTotalImages,
    sortOrder,
    setSortOrder,
    handleGetMore,
    breedsDataStatus,
  };
}

export default useCatSearchControl;
