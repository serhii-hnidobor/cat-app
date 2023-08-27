import { HTMLAttributes } from "react";
import UploadFileIcon from "../icons/Upload-file-icon";
import Button from "./Button";

function UploadCatImageButton(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      {...props}
      className={
        "px-[30px] py-[12px] rounded-[10px] bg-[#FBE0DC] text-[#FF868E] text-[12px] non-italic font-medium leading-[16px] tracking-[2px] uppercase hover:bg-[#FF868E] hover:text-white group flex gap-[10px]"
      }
    >
      <UploadFileIcon
        className="group"
        pathClassName="group-hover:fill-white"
      />
      upload
    </Button>
  );
}

export default UploadCatImageButton;
