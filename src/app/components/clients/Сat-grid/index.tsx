import { CatImageData } from "@/app/api/api";
import getImgStyles from "./helpers/get-img-style";
import clsx from "clsx";
import isValidUrl from "@/app/helpers/is-valid-url";
import CatImageHover from "./components/Cat-image-hover";
import Image from "next/image";
import { imageBlurBase64 } from "@/app/common/constants";

interface Props {
  breedImages: CatImageData[];
  hasMore?: boolean;
  onCatClick: (breedId: string, imageId: string) => void;
  isLikeHover?: boolean;
}

const isPriorityImage = (blockIndex: number, width: number) =>
  !blockIndex && width >= 420;

const getBlockMap = (
  blockIndex: number,
  onCatClick: (breedId: string, imageId: string) => void,
  isLikeHover?: boolean
) => {
  const mapFunc = (img: CatImageData, imgIndex: number) => {
    const {
      className: imageStyles,
      width,
      height,
    } = getImgStyles(blockIndex, imgIndex);

    return (
      <div
        key={`cat-img-${img.url}`}
        onClick={() => onCatClick(img?.breeds?.[0]?.id ?? "", img?.id)}
        className={clsx(imageStyles, "group relative")}
      >
        <Image
          src={img.url}
          alt={"cat image"}
          width={width}
          priority={isPriorityImage(blockIndex, width)}
          height={height}
          placeholder="blur"
          blurDataURL={imageBlurBase64}
          className={clsx(
            { "opacity-0": !isValidUrl(img.url) },
            `rounded-[20px] cursor-pointer bg-no-repeat bg-cover bg-center w-full h-full object-cover`
          )}
        />
        <div className="absolute left-0 top-0" style={{ width, height }}>
          {<CatImageHover isLikeHover={isLikeHover} img={img} />}
        </div>
      </div>
    );
  };

  return mapFunc;
};

const addBlockPlaceholder = (
  blocks: Array<CatImageData[]>,
  hasMore?: boolean
) => {
  if (hasMore && blocks.length < 2) {
    blocks.push(
      new Array(5).fill({
        breed: "placeholder",
        url: "placeholder",
      })
    );
  }
};

function CatGrid({ breedImages, hasMore, onCatClick, isLikeHover }: Props) {
  const divideIntoBlocks = <T extends [][]>(
    array: unknown[],
    blockSize: number
  ): T => {
    const result = [];
    for (let i = 0; i < array.length; i += blockSize) {
      result.push(array.slice(i, i + blockSize));
    }

    return result as T;
  };

  const blocks: Array<CatImageData[]> = divideIntoBlocks(breedImages, 5);

  addBlockPlaceholder(blocks, hasMore);

  return blocks.map((block, blockIndex) => {
    const blockMapFunc = getBlockMap(blockIndex, onCatClick, isLikeHover);

    return (
      <div
        key={`cat-block-${block[0].url}-block`}
        className={clsx(
          { "mt-0": !blockIndex },
          `grid grid-cols-3 grid-rows-3 w-full h-[460px] gap-5 my-5`
        )}
      >
        {block.map(blockMapFunc)}
      </div>
    );
  });
}

export default CatGrid;
