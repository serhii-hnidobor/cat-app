import VoteMessage from "../components/Vote-message";
import SimpleBar from "simplebar-react";
import sortByDateDesc from "../../helpers/sort-by-date-desc";
import formateTime from "../../helpers/convert-date-string-to-hour-minute";
import { Favorites } from "@/app/api/favorites";
import { Vote } from "@/app/api/api";

interface MessageContainerProps {
  votesData: Vote[] | null;
  favoritesData: Favorites[];
}

const getMessageParam = (value: 0 | 1, isFavorite: boolean) => {
  if (isFavorite) {
    return {
      isLike: undefined,
      isFavorite: Boolean(value),
    };
  }

  return {
    isLike: Boolean(value),
    isFavorite: undefined,
  };
};

export const MessageContainer = ({
  votesData,
  favoritesData,
}: MessageContainerProps) => {
  const preparedFavoritesData = favoritesData.map((data) => ({
    ...data,
    isFavorite: true,
  }));

  const preparedVotesData = votesData?.map((data) => ({
    ...data,
    isFavorite: false,
  }));

  const data = [...(preparedVotesData ?? []), ...preparedFavoritesData].sort(
    sortByDateDesc
  );

  return (
    <SimpleBar className="h-[280px]">
      <div className="flex flex-col gap-[10px]">
        {data.map(({ id, image_id, value, created_at, isFavorite }) => {
          const { isFavorite: isFavoriteComputedValue, isLike } =
            getMessageParam(value, isFavorite);

          return (
            <VoteMessage
              time={formateTime(created_at)}
              key={`${id}-${image_id}-vote-message-${isFavorite}-${value}`}
              isLike={isLike}
              isFavorite={isFavoriteComputedValue}
              imageId={image_id}
            />
          );
        })}
      </div>
    </SimpleBar>
  );
};
