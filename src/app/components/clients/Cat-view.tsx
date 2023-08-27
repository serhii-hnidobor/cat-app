"use client";

import { useRouter } from "next/navigation";
import { useRef, useId } from "react";
import handleInfiniteScroll from "@/app/helpers/infinite-scroll";
import CatGrid from "@/app/components/clients/Сat-grid";
import SimpleBar from "simplebar-react";
import { ClipLoader } from "react-spinners";
import { CatImageData } from "@/app/api/api";
import clsx from "clsx";

interface Props {
  isLoading: boolean;
  loadMore: () => void;
  hasMore: boolean;
  allImages: CatImageData[];
  className?: string;
  onCatClick?: (breedId: string, imageId: string) => void;
  isLikeHover?: boolean;
  isDisableHover?: boolean;
}

const Loader = ({ isLoading }: { isLoading: boolean }) =>
  isLoading && (
    <div className="flex justify-center items-center">
      <ClipLoader color="#36d7b7" />
    </div>
  );

function CatView({
  isLoading,
  hasMore,
  loadMore,
  allImages,
  className,
  onCatClick,
  isLikeHover,
  isDisableHover,
}: Props) {
  const router = useRouter();

  const id = useId();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleCatClick =
    onCatClick ?? ((breedId: string) => router.push(`/breeds/${breedId}`));

  const onScroll = handleInfiniteScroll({
    containerRef,
    loadMore,
    isLoading,
    hasMore,
  });

  const isClassProvided = className?.length;

  return (
    <SimpleBar
      className={clsx({ "h-[748px]": !isClassProvided }, className)}
      id={id}
      scrollableNodeProps={{ ref: containerRef, onScroll }}
    >
      <CatGrid
        breedImages={allImages || []}
        hasMore={Boolean(hasMore)}
        onCatClick={handleCatClick}
        isLikeHover={isLikeHover}
        isDisableHover={isDisableHover}
      />
      {isLoading && (
        <div className="flex justify-center items-center">
          <ClipLoader color="#FF868E" size={30} />
        </div>
      )}
    </SimpleBar>
  );
}

export { CatView as default, type Props as CatViewProps, Loader };
