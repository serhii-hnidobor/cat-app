import { Vote, api } from "../api/api";
import CatViewWithoutInfiniteScroll from "../components/clients/Cat-view-without-infinite-scroll";
import PageContentContainer from "../components/clients/Page-content-container";
import ControlSection from "./components/Controll-section";

async function getVotes() {
  const response = await api.breeds.getVotes();
  return response.json() as Promise<Vote[]>;
}

export default async function Likes() {
  const likesImagesData = (await getVotes())
    .filter((vote) => vote.value === 1)
    .map(({ image }) => ({ ...image }));

  const controlSection = <ControlSection />;

  return (
    <PageContentContainer
      isLoading={false}
      isNothingFound={!likesImagesData.length}
      controlSection={controlSection}
    >
      <CatViewWithoutInfiniteScroll
        isLoading={false}
        hasMore={false}
        isDisableHover={true}
        allImages={likesImagesData}
      />
    </PageContentContainer>
  );
}
