"use client";

import PageContentContainer from "@/app/components/clients/Page-content-container";
import ControlSection from "./components/Controll-section";
import { useApi } from "../hooks/use-api";
import { addFavorite, getFavoriteLogs, getFavorites } from "../api/favorites";
import isLoading from "../helpers/is-loading";
import CatGrid from "../components/clients/Сat-grid";
import { useState } from "react";
import SimpleBar from "simplebar-react";
import { MessageContainer } from "@/app/voting/components/Vote-message-container";

function FavoritePage() {
  const controlSectionElement = <ControlSection />;
  const [rerender, setRerender] = useState(false);

  const { data: favoritesData, dataStatus: favoritesDataStatus } = useApi({
    apiCallFunc: getFavorites,
    depsArray: [rerender],
  });

  const preparedData = favoritesData?.map(({ image }) => ({ ...image }));

  const favorites = getFavoriteLogs().map((data) => ({
    ...data,
    isFavorite: true,
  }));

  return (
    <PageContentContainer
      isLoading={isLoading(favoritesDataStatus)}
      controlSection={controlSectionElement}
      isNothingFound={!preparedData?.length}
    >
      <SimpleBar className={"h-[460px]"}>
        <CatGrid
          isLikeHover={true}
          breedImages={preparedData ?? []}
          hasMore={false}
          onCatClick={async (_, imageId) => {
            await addFavorite(imageId);
            setRerender((prev) => !prev);
          }}
        />
      </SimpleBar>
      <MessageContainer votesData={[]} favoritesData={favorites} />
    </PageContentContainer>
  );
}

export default FavoritePage;
