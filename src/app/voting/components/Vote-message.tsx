import DislikeIcon from "@/app/components/icons/Dilike-icon";
import HeartIcon from "@/app/components/icons/Heart-icon";
import LikeIcon from "@/app/components/icons/Like-icon";

interface Props {
  time: string;
  isLike?: boolean;
  isFavorite?: boolean;
  imageId: string;
}

interface VoteIconProps {
  isLike?: boolean;
  isFavorite?: boolean;
}

function VoteIcon({ isLike, isFavorite }: VoteIconProps) {
  if (isLike) {
    return <LikeIcon pathClassName="fill-[#97EAB9]" />;
  } else if (isLike === false) {
    return <DislikeIcon pathClassName="fill-[#FFD280]" />;
  } else if (isFavorite) {
    return <HeartIcon pathClassName="fill-red" />;
  }

  return null;
}

function getVoteCategoryMessage(isLike?: boolean, isFavorite?: boolean) {
  if (isLike) {
    return "was added to Likes";
  } else if (isLike === false) {
    return "was added to Dislikes";
  } else if (isFavorite) {
    return "was added to Favorites";
  }

  return "was removed from Favorites";
}

function VoteMessage({ time, isLike, imageId, isFavorite }: Props) {
  return (
    <div className="flex items-center justify-between bg-[#F8F8F7] rounded-5 pl-[15px] pr-[20px] py-[15px]">
      <div className="flex gap-5">
        <span className="block bg-white rounded-[5px] text-base	non-italic font-normal text-[#1D1D1D] py-[3px] px-[10px]">
          {time}
        </span>
        <span className="text-base	non-italic font-normal text-[#8C8C8C]">
          Image ID: <strong className="text-[#1D1D1D]">{imageId}</strong>&nbsp;
          {getVoteCategoryMessage(isLike, isFavorite)}
        </span>
      </div>
      <VoteIcon isLike={isLike} isFavorite={isFavorite} />
    </div>
  );
}

export default VoteMessage;
