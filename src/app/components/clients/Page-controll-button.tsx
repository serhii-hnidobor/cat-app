"use client";

import DislikeIcon from "../icons/Dilike-icon";
import LikeIcon from "../icons/Like-icon";
import HeartIcon from "../icons/Heart-icon";
import Button from "./Button";
import { clsx } from "clsx";
import { useRouter, usePathname } from "next/navigation";

function getButtonStyle(
  type: "like" | "favorite" | "dislike",
  pathname: string,
) {
  const activeStyle = {
    class: "!bg-[#FF868E]",
    iconPathClass: "!fill-white",
  };

  const defaultStyle = {
    class: undefined,
    iconPathClass: undefined,
  };

  switch (type) {
    case "like": {
      return pathname.includes("/likes") ? activeStyle : defaultStyle;
    }
    case "favorite": {
      return pathname.includes("/favorites") ? activeStyle : defaultStyle;
    }
    case "dislike": {
      return pathname.includes("/dislikes") ? activeStyle : defaultStyle;
    }
  }
}

function PageControlButton() {
  const router = useRouter();
  const pathname = usePathname();

  const likeButtonStyle = getButtonStyle("like", pathname);
  const favoriteButtonStyle = getButtonStyle("favorite", pathname);
  const dislikeButtonStyle = getButtonStyle("dislike", pathname);

  return (
    <div className="flex gap-[10px]">
      <Button
        className={clsx(
          "w-[60px] h-[60px] rounded-[20px] bg-white hover:bg-[#FBE0DC] flex justify-center items-center group",
          likeButtonStyle.class,
        )}
        onClick={() => router.push("/likes")}
        aria-label="go to likes page"
      >
        <LikeIcon
          className="group"
          pathClassName={clsx(
            "group-hover:fill-white fill-[#ff748b]",
            likeButtonStyle.iconPathClass,
          )}
        />
      </Button>
      <Button
        onClick={() => router.push("/favorites")}
        className={clsx(
          "w-[60px] h-[60px] rounded-[20px] bg-white hover:bg-[#FBE0DC] flex justify-center items-center group",
          favoriteButtonStyle.class,
        )}
        aria-label="go to favorites page"
      >
        <HeartIcon
          className="group"
          pathClassName={clsx(
            "group-hover:fill-white fill-[#ff748b]",
            favoriteButtonStyle.iconPathClass,
          )}
        />
      </Button>
      <Button
        className={clsx(
          "w-[60px] h-[60px] rounded-[20px] bg-white hover:bg-[#FBE0DC] flex justify-center items-center group",
          dislikeButtonStyle.class,
        )}
        onClick={() => router.push("/dislikes")}
        aria-label="go to dislikes page"
      >
        <DislikeIcon
          className="group"
          pathClassName={clsx(
            "group-hover:fill-white fill-[#ff748b]",
            dislikeButtonStyle.iconPathClass,
          )}
        />
      </Button>
    </div>
  );
}

export default PageControlButton;
