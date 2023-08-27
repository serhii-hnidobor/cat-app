import { DataStatus } from "@/app/common/enums";
import { useEffect, useState } from "react";

interface Arg<T> {
  apiCallFunc: () => Promise<T>;
}

export const useApi = <T>({ apiCallFunc }: Arg<T>) => {
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
  }, [apiCallFunc]);

  return { data, dataStatus };
};
