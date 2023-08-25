"use client";

import { Button } from "@mui/base";
import { useModal } from "../../hooks/use-modal";
import CloseIcon from "../icons/Close-icon";
import { Portal } from "./Portal";
import dynamic from "next/dynamic";
import { DataStatus } from "@/app/common/enums";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { api } from "@/app/api/api";
import isLoading from "@/app/helpers/is-loading";
import isRejected from "@/app/helpers/is-rejected";
import isSuccess from "@/app/helpers/isSuccess";

const Dropzone = dynamic(() => import("./Dropzone"));

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const imageUploadProcess = (
  uploadPromise: Promise<unknown>,
  setDataStatus: Dispatch<SetStateAction<DataStatus>>
) =>
  uploadPromise
    .then(() => setDataStatus(DataStatus.SUCCESS))
    .catch(() => setDataStatus(DataStatus.FAILED));

const LoadImageModal = ({ isOpen, onClose }: Props) => {
  const [dataStatus, setDataStatus] = useState<DataStatus>(DataStatus.IDLE);

  const onImageChange = useCallback(() => {
    setDataStatus(DataStatus.IDLE);
  }, []);

  const { handleDisableContentContainerClick, handleOutsideClick } = useModal({
    onClose: () => { setDataStatus(DataStatus.IDLE); onClose() },
  });

  const onFileUpload = async (image: File) => {
    const data = new FormData();
    data.append("file", image);
    setDataStatus(DataStatus.PENDING);
    return imageUploadProcess(api.breeds.uploadImage(data), setDataStatus);
  };

  return (
    isOpen && (
      <Portal className="flex justify-center items-center">
        <div
          className={
            "my-[30px] mx-auto flex justify-end max-w-[1440px] w-[calc(100vw-187px)] relative"
          }
          onClick={handleOutsideClick}
        >
          <div
            className={
              "h-[840px] w-[680px] rounded-[20px] bg-[#F8F8F7] relative pt-[100px] px-[20px]"
            }
            onClick={handleDisableContentContainerClick}
          >
            <Button
              className="absolute top-5 right-5 w-10 h-10 bg-white rounded-[10px] flex justify-center items-center"
              onClick={onClose}
            >
              <CloseIcon />
            </Button>
            <div className="mb-[40px]">
              <h2 className="text-[36px] text-center non-italic font-medium leading-none mb-[10px]">
                Upload a .jpg or .png Cat Image
              </h2>
              <h3 className="text-[20px] text-center leading-[30px] text-[#8C8C8C] font-normal">
                Any uploads must comply with the&nbsp;
                <a
                  className="text-[#FF868E]"
                  href="https://thecatapi.com/privacy"
                  target="_blank"
                >
                  upload guidelines
                </a>&nbsp;
                or face deletion.
              </h3>
            </div>
            <Dropzone
              onFileUpload={onFileUpload}
              isLoading={isLoading(dataStatus)}
              isImageAcceptError={isRejected(dataStatus)}
              isSuccess={isSuccess(dataStatus)}
              isRejected={isRejected(dataStatus)}
              onImageChange={onImageChange}
            />
          </div>
        </div>
      </Portal>
    )
  );
};

export { LoadImageModal as default };
