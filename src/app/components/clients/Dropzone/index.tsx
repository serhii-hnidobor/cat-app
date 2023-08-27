import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadImgIcon from "../../icons/Upload-img-icon";
import ImageFileName from "./components/Image-file-name";
import DropzoneInstruction from "./components/Dropzone-instruction";
import UploadButton from "./components/Upload-button";
import { clsx } from "clsx";
import DropzoneMessage from "./components/Dropzone-message";
import Image from "next/image";

interface Props {
  onFileUpload: (file: File) => unknown;
  isLoading: boolean;
  isImageAcceptError: boolean;
  isSuccess?: boolean;
  isRejected?: boolean;
  onImageChange: () => void;
}

const getMessage = (isSuccess?: boolean, isRejected?: boolean) => {
  if (isSuccess) {
    return "Thanks for the Upload - Cat found!";
  } else if (isRejected) {
    return "No Cat found - try a different one";
  }
  return "";
};

function Dropzone({
  onFileUpload,
  isLoading,
  isImageAcceptError,
  isSuccess,
  onImageChange,
  isRejected,
}: Props) {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    isSuccess && setFile(null);
  }, [isSuccess]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onImageChange();
      setFile(acceptedFiles[0]);
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const rootClassName = clsx(
    "flex justify-center px-[41px] py-5 items-center w-full h-[320px] bg-white border-[2px] border-dashed border-[#FBE0DC] rounded-[20px] relative mb-5",
    { "!bg-[#FBE0DC] !border-[#FF868E]": isImageAcceptError }
  );

  return (
    <div>
      <div {...getRootProps({ className: rootClassName })}>
        <input {...getInputProps()} />
        <UploadImgIcon className={"z-[1] absolute"} />
        {file ? (
          <Image
            className="w-full h-full bg-cover bg-center z-[5] object-cover"
            src={URL.createObjectURL(file)}
            alt={"uploaded cat"}
            width={558}
            height={280}
          />
        ) : (
          <p className="z-[2] text-[20px] non-italic font-regular leading-[30px] text-[#8C8C8C]">
            <DropzoneInstruction isDragActive={isDragActive} />
          </p>
        )}
      </div>
      <div className="mb-5">
        <ImageFileName file={file} />
      </div>
      <div className="flex justify-center items-center mb-5">
        {Boolean(file) && (
          <UploadButton
            isLoading={isLoading}
            onClick={() => onFileUpload(file as File)}
          />
        )}
      </div>
      <DropzoneMessage
        message={getMessage(isSuccess, isRejected)}
        isSuccess={isSuccess}
        isRejected={isRejected}
      />
    </div>
  );
}

export default Dropzone;
