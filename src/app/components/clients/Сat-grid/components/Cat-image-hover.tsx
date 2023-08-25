import { CatImageData } from "@/app/api/api";
import Button from "../../Button";
import HeartIcon from "../../../icons/Heart-icon";
import { HTMLAttributes } from "react";
import clsx from 'clsx';

interface Props {
  isLikeHover?: boolean;
  img?: CatImageData;
}

const LikeButton = (props: HTMLAttributes<HTMLButtonElement>) => (
  <Button
    className="flex justify-center items-center w-[40px] h-[40px] rounded-[10px] bg-white"
    {...props}
  >
    <HeartIcon />
  </Button>
);

function CatImageHover({ isLikeHover, img }: Props) {
  return (
    <div className={clsx("justify-center items-center cursor-pointer bg-[#FF868E99] w-full h-full p-[10px] rounded-[20px] group-hover:flex hidden relative", { '!items-end': !isLikeHover })}>
      {isLikeHover ? (
        <LikeButton />
      ) : (
        <label className="w-full bg-white rounded-[10px] flex justify-center items-center overflow-hidden whitespace-nowrap overflow-ellipsis truncate text-base font-normal uppercase text-[#FF868E] h-[34px]">
          {img?.breeds[0].name}
        </label>
      )}{" "}
    </div>
  );
}

export default CatImageHover;
