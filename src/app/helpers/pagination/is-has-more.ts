const isHasMore = (
  allItemsArray: unknown[] | null = [],
  totalItemsNum: number | null = 0
): boolean =>
  Boolean(
    allItemsArray &&
      totalItemsNum &&
      allItemsArray?.length > 0 &&
      totalItemsNum > allItemsArray.length
  );

export { isHasMore as default };
