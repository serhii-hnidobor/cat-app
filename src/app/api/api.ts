import instance from "./fetch-instance";
import { Sort } from "../common/enums";
import queryString from "../helpers/query-string";

interface Breed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  weight: {
    imperial: string;
    metric: string;
  };
  life_span: string;
}

interface CatImageData {
  url: string;
  breeds: Breed[];
}

interface GetImagesParam {
  limit?: number;
  page?: number;
  order?: Sort;
  has_breeds?: 0 | 1;
  breed?: string | null;
  imageType?: string;
}

type ApiFetchedDataType = {
  breeds: {
    getAll: () => Promise<Response>;
    getImages: (param: GetImagesParam) => Promise<Response>;
    uploadImage: (data: FormData) => Promise<Response>;
  };
};

const filterImage = (breedImg: CatImageData) =>
  Array.isArray(breedImg.breeds) && breedImg.breeds.length;

export const api: ApiFetchedDataType = {
  breeds: {
    getImages: ({ limit, page, order, has_breeds, breed, imageType }) => {
      const stringifiedParams = queryString({
        limit,
        page,
        order: order ?? Sort.ASC,
        has_breeds,
        breed_ids: breed ? `${breed}` : undefined,
        mime_types: imageType
      });

      return instance.request<CatImageData[]>(
        `/images/search?${stringifiedParams}`,
        "GET"
      );
    },
    getAll: () => instance.request<Breed[]>("/breeds", "GET"),
    uploadImage: (data: FormData) =>
      instance.request<void>("/images/upload", "POST", data),
  },
};

export { type Breed, type CatImageData };
