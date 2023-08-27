import { ClipLoader } from "react-spinners";
import Button from "../../Button";

interface Props {
  isLoading: boolean;
  onClick: () => void;
}

const getButtonText = (isLoading: boolean) =>
  isLoading ? "uploading" : "upload photo";

function UploadButton({ isLoading, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      className="flex text-white px-[30px] py-[12px] text-[12px] non-italic font-medium leading-4 tracking-[2px] uppercase bg-[#FF868E] rounded-[10px] hover:bg-[#FBE0DC] !hover:text-blue-600"
      aria-label="upload file"
    >
      {isLoading && (
        <ClipLoader color="white" size={16} className="mr-[10px]" />
      )}
      {getButtonText(isLoading)}
    </Button>
  );
}

export default UploadButton;
