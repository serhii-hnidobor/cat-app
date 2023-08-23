import { DataStatus } from "@/app/common/enums";
import { useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

interface Arg<T> {
  apiCallFunc: () => Promise<T>;
  depsArray: unknown[];
}

export const useApi = <T>({ apiCallFunc, depsArray }: Arg<T>) => {
  const [dataStatus, setDataStatus] = useState<DataStatus>(DataStatus.IDLE);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    setDataStatus(DataStatus.PENDING);
    apiCallFunc()
      .then((data: T) => {
        setDataStatus(DataStatus.SUCCESS);
        setData(data);
      })
      .catch((e: unknown) => {
        console.error(e);
        setDataStatus(DataStatus.FAILED);
      });
  }, [...depsArray]);

  return { data, dataStatus };
};
