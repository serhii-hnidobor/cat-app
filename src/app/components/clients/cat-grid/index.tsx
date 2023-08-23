import { CatImageData } from "@/app/api/api";
import getImgStyles from "./helpers/get-img-style";

interface Props {
  breedImages: CatImageData[];
  hasMore?: boolean;
  onCatClick: (breedId: string) => void;
}

function CatGrid({ breedImages, hasMore, onCatClick }: Props) {
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

  if (hasMore && blocks.length < 2) {
    blocks.push(
      new Array(5).fill({
        breed: "placeholder",
        url: "placeholder",
      })
    );
  }

  return blocks.map((block, blockIndex) => {
    return (
      <div
        key={`cat-block-${blockIndex}`}
        className={`grid grid-cols-3 grid-rows-3 w-full h-[460px] gap-5 my-5 ${!blockIndex ? "mt-0" : ""
          }`}
      >
        {block.map((img, imgIndex) => (
          <div
            key={`cat-img-${JSON.stringify(img)}}`}
            className={`${getImgStyles(
              blockIndex,
              imgIndex
            )} rounded-[20px] cursor-pointer bg-no-repeat bg-cover bg-center group ${img.url === "placeholder" ? "opacity-0" : ""
              }`}
            style={{
              backgroundImage:
                img.url !== "placeholder" ? `url('${img.url}')` : undefined,
            }}
            onClick={() => onCatClick(img.breeds[0].id)}
          >
            {img.url !== "placeholder" && (
              <div className="bg-[#FF868E99] w-full h-full rounded-[20px] group-hover:block hidden relative">
                <label className="absolute h-[34px] w-[calc(100%_-_20px)] left-[10px] bottom-[10px] bg-white rounded-[10px] flex justify-center items-center overflow-hidden whitespace-nowrap overflow-ellipsis truncate text-base not-italic	font-normal	uppercase text-[#FF868E]">
                    {img.breeds[0].name}
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  });
}

export default CatGrid;
