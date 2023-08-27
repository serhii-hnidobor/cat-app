import { HTMLAttributes } from "react";
import DislikeIcon from "../icons/Dilike-icon";
import HeartIcon from "../icons/Heart-icon";
import LikeIcon from "../icons/Like-icon";
import Button from "./Button";
import clsx from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
  onVoteLike: () => void;
  onVoteDislike: () => void;
  onFavorite: () => void;
}

function CatFeedbackButton({
  className,
  onVoteLike,
  onVoteDislike,
  onFavorite,
  ...containerProps
}: Props) {
  return (
    <div
      {...containerProps}
      className={clsx(
        className,
        "flex gap-1 bg-white rounded-[20px] border-[5px] border-solid border-white"
      )}
    >
      <Button
        className="w-20 h-20 rounded-tl-[20px] rounded-bl-[20px] bg-[#7cf6b8] hover:bg-[#97eab94d] flex justify-center items-center group"
        onClick={onVoteLike}
      >
        <LikeIcon
          className="group"
          pathClassName="group-hover:fill-[#7cf6b8]"
        />
      </Button>
      <Button
        onClick={onFavorite}
        className="w-20 h-20 bg-[#ff748b] hover:bg-[#ffd7dd] flex justify-center items-center group"
      >
        <HeartIcon
          className="group"
          pathClassName="fill-white group-hover:fill-[#ff748b]"
        />
      </Button>
      <Button
        className="w-20 h-20 bg-[#ffd977] hover:bg-[#fef5d7] flex justify-center items-center rounded-tr-[20px] rounded-br-[20px] group"
        onClick={onVoteDislike}
      >
        <DislikeIcon
          className="group"
          pathClassName="fill-white group-hover:fill-[#ffd977]"
        />
      </Button>
    </div>
  );
}

export default CatFeedbackButton;
