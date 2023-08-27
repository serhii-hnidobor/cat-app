import { storage } from "../storage/local-storage";
import { Vote, api } from "./api";

interface Favorites extends Vote {
  image: {
    id: string;
    url: string;
  };
}

const findFavorite = (favoriteData: Favorites[], image_id: string) =>
  favoriteData.find((data) => data.image_id === image_id);

async function addFavorite(imageId: string) {
  let favoritesData = storage.retrieve<Favorites[]>("favorites");
  let favoritesRawData = storage.retrieve<string[]>("favorites-raw");

  if (!favoritesData) {
    favoritesData = [];
    storage.save("favorites", favoritesData);
  }

  if (!favoritesData) {
    favoritesRawData = [];
    storage.save("favorites-raw", favoritesRawData);
  }

  const favoriteToDelete = findFavorite(favoritesData, imageId);

  if (favoriteToDelete) {
    await api.breeds.deleteFavorites(String(favoriteToDelete.id));
    const created_at = new Date().toISOString();
    favoritesData.push({
      ...favoriteToDelete,
      created_at,
      value: 0,
    });

    const filteredRawData = favoritesRawData?.filter(
      (imageIdData) => imageId !== imageIdData
    );

    storage.save("favorites-raw", filteredRawData);
    storage.save("favorites", favoritesData);
    return;
  }

  const response = (await (
    await api.breeds.addToFavorites(imageId)
  ).json()) as { id: string };
  const created_at = new Date().toISOString();
  favoritesData.push({
    id: Number(response.id),
    image_id: imageId,
    created_at,
    value: 1,
    image: {
      id: "",
      url: "",
    },
  });
  favoritesRawData?.push(imageId);
  storage.save("favorites-raw", favoritesRawData);
  storage.save("favorites", favoritesData);
}

const getFavoriteLogs = () => {
  let favoritesData = storage.retrieve<Favorites[]>("favorites");
  let favoritesRawData = storage.retrieve<string[]>("favorites-raw");

  if (!favoritesData) {
    favoritesData = [];
    storage.save("favorites", favoritesData);
  }

  if (!favoritesRawData) {
    favoritesRawData = [];
    storage.save("favorites-raw", favoritesRawData);
  }

  return favoritesData;
};

async function getFavorites() {
  return (await api.breeds.getFavorites()).json() as Promise<Favorites[]>;
}

const isImageInFavorite = (imageId: string) => {
  let favoritesRawData = storage.retrieve<string[]>("favorites-raw");

  if (!favoritesRawData) {
    favoritesRawData = [];
    storage.save("favorites-raw", favoritesRawData);
    return false;
  }

  const res = favoritesRawData.find((imgIdData) => imgIdData === imageId);

  return Boolean(res);
};

export {
  addFavorite,
  getFavoriteLogs,
  isImageInFavorite,
  type Favorites,
  getFavorites,
};
