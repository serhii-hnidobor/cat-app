import { CatImageData } from "@/app/api/api";
import Button from "../../Button";
import HeartIcon from "../../../icons/Heart-icon";
import { HTMLAttributes } from "react";
import clsx from "clsx";
import { isImageInFavorite } from "@/app/api/favorites";
import FilledHeart from "@/app/components/icons/Filled-heart";

interface Props {
  isLikeHover?: boolean;
  iconPathClassName?: string;
  img?: CatImageData;
}

const LikeButton = ({
  iconPathClassName,
  isInFavorite,
  ...restProps
}: HTMLAttributes<HTMLButtonElement> &
  Pick<Props, "iconPathClassName"> & { isInFavorite: boolean }) => (
  <Button
    className="flex justify-center items-center w-[40px] h-[40px] rounded-[10px] bg-white"
    {...restProps}
  >
    {isInFavorite ? (
      <FilledHeart />
    ) : (
      <HeartIcon pathClassName={iconPathClassName} />
    )}
  </Button>
);

function CatImageHover({ isLikeHover, img }: Props) {
  const isImgFavorite = isImageInFavorite(img?.id ?? "");

  return (
    <div
      className={clsx(
        "justify-center items-center cursor-pointer bg-[#FF868E99] w-full h-full p-[10px] rounded-[20px] group-hover:flex hidden relative",
        { "!items-end": !isLikeHover }
      )}
    >
      {isLikeHover ? (
        <LikeButton isInFavorite={isImgFavorite} />
      ) : (
        <label className="w-full bg-white rounded-[10px] flex justify-center items-center overflow-hidden whitespace-nowrap overflow-ellipsis truncate text-base font-normal uppercase text-[#FF868E] h-[34px]">
          {img?.breeds?.[0]?.name || "unknown breed"}
        </label>
      )}
    </div>
  );
}

export default CatImageHover;
