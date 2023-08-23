import { AxiosResponse } from "axios";
import instance from "./axios-interceptors";
import queryString from "query-string";
import { Sort } from "../common/enums";

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

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
}

type ApiFetchedDataType = {
  breeds: {
    getAll: () => FetchedDataType<Breed[]>;
    getImages: (param: GetImagesParam) => FetchedDataType<CatImageData[]>;
  };
};

const filterImage = (breedImg: CatImageData) => Array.isArray(breedImg.breeds) && breedImg.breeds.length;

export const api: ApiFetchedDataType = {
  breeds: {
    getImages: async ({ limit, page, order, has_breeds, breed }) => {
      const stringifiedParams = queryString.stringify({
        limit,
        page,
        order: order ?? Sort.ASC,
        has_breeds,
        breed_ids: breed ? `${breed}` : undefined,
      });

      const response = (await instance.get(`/images/search?${stringifiedParams}`));
      
      response.data = response.data.filter(filterImage);

      return response;
    },
    getAll: () => instance.get("/breeds"),
  },
};

export { type Breed, type CatImageData };
