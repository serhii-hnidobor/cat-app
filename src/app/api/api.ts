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
  id: string;
  url: string;
  breeds?: Breed[];
}

interface GetImagesParam {
  limit?: number;
  page?: number;
  order?: Sort;
  has_breeds?: 0 | 1;
  breed?: string | null;
  imageType?: string;
}

interface Vote extends Record<string, unknown> {
  id: number;
  image_id: string;
  value: 1 | 0;
  created_at: string;
}

type ApiFetchedDataType = {
  breeds: {
    getAll: () => Promise<Response>;
    getImages: (param: GetImagesParam) => Promise<Response>;
    uploadImage: (data: FormData) => Promise<Response>;
    vote: (image_id: string, isLike: boolean) => Promise<void>;
    getVotes: () => Promise<Response>;
    deleteFavorites: (id: string) => Promise<void>;
    addToFavorites: (image_id: string) => Promise<Response>;
    getFavorites: () => Promise<Response>;
  };
};

export const api: ApiFetchedDataType = {
  breeds: {
    getImages: ({ limit, page, order, has_breeds, breed, imageType }) => {
      const stringifiedParams = queryString({
        limit,
        page,
        order: order ?? Sort.ASC,
        has_breeds,
        breed_ids: breed ? `${breed}` : undefined,
        mime_types: imageType,
      });

      return instance.request<CatImageData[]>(
        `/images/search?${stringifiedParams}`,
        "GET"
      );
    },
    getAll: () => instance.request<Breed[]>("/breeds", "GET"),
    uploadImage: (data: FormData) =>
      instance.request<void>("/images/upload", "POST", data),
    vote: async (image_id: string, isLike: boolean) => {
      await instance.request("/votes", "POST", {
        value: isLike ? 1 : 0,
        image_id,
      });
    },
    getVotes: () => instance.request<Vote[]>("/votes", "GET"),
    deleteFavorites: async (id: string) => {
      await instance.request(`/favourites/${id}`, "DELETE");
    },
    addToFavorites: (image_id: string) =>
      instance.request("/favourites", "POST", { image_id }),
    getFavorites: () => instance.request("/favourites", "GET"),
  },
};

export { type Breed, type CatImageData, type Vote };
