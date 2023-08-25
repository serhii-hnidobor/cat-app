import { CatImageData } from "@/app/api/api";
import { Sort } from "@/app/common/enums";
import { Dispatch, SetStateAction } from "react";

const getHandleChangeSortOrder = (
  setSortOrder: Dispatch<SetStateAction<Sort>>,
  setAllImages: Dispatch<SetStateAction<CatImageData[] | null>>
) => {
  return (sortOrder: Sort) => {
    setSortOrder(sortOrder);
    setAllImages([]);
  };
};

export { getHandleChangeSortOrder as default };
