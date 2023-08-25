import { CatImageData, api } from "@/app/api/api";
import { Sort } from "@/app/common/enums";
import { Dispatch, SetStateAction } from "react";

interface GetMoreImagesProps {
  itemsPerPage: number;
  pageIndex: number;
  breed: string | null;
  onTotalImagesChange: Dispatch<SetStateAction<number | null>>;
  onAllImagesChange: Dispatch<SetStateAction<CatImageData[] | null>>;
  sortOrder?: Sort;
  imageType?: string;
}

const getMoreImages =
  ({
    itemsPerPage,
    pageIndex,
    breed,
    onAllImagesChange,
    onTotalImagesChange,
    sortOrder,
    imageType,
  }: GetMoreImagesProps) =>
  async () => {
    const apiResponse = await api.breeds.getImages({
      limit: itemsPerPage,
      page: pageIndex,
      has_breeds: 1,
      breed,
      order: sortOrder,
      imageType,
    });

    const totalImages = apiResponse.headers.get("pagination-count");

    const images: CatImageData[] = await apiResponse.json();

    onTotalImagesChange(Number(totalImages));

    onAllImagesChange((prev) => (prev ? prev.concat(images) : images));

    return { images, totalImages: Number(totalImages) };
  };

export { getMoreImages as default };
