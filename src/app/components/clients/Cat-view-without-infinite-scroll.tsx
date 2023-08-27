"use client";

import { useRouter } from "next/navigation";
import CatGrid from "@/app/components/clients/Сat-grid";
import clsx from "clsx";
import { CatViewProps, Loader } from "./Cat-view";
import SimpleBar from "simplebar-react";

function CatViewWithoutInfiniteScroll({
  isLoading,
  hasMore,
  allImages,
  className,
  onCatClick,
  isLikeHover,
  isDisableHover,
}: Omit<CatViewProps, "loadMore">) {
  const router = useRouter();

  const handleCatClick =
    onCatClick ?? ((breedId: string) => router.push(`/breeds/${breedId}`));

  const isClassProvided = className?.length;

  return (
    <SimpleBar className={clsx({ "h-[748px]": !isClassProvided }, className)}>
      <CatGrid
        breedImages={allImages || []}
        hasMore={Boolean(hasMore)}
        onCatClick={handleCatClick}
        isLikeHover={isLikeHover}
        isDisableHover={isDisableHover}
      />
      <Loader isLoading={isLoading} />
    </SimpleBar>
  );
}

export { CatViewWithoutInfiniteScroll as default };
