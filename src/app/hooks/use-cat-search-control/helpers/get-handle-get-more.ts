import { Dispatch, SetStateAction } from "react";

function getHandleGetMore(setPageIndex: Dispatch<SetStateAction<number>>) {
  return () => setPageIndex((page) => page + 1);
}

export default getHandleGetMore;
