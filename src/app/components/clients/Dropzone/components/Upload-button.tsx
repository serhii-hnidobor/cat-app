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
    >
      {isLoading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="animate-spin mr-[10px]"
        >
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="url(#paint0_angular_1_1198)"
            strokeWidth="2"
          />
          <defs>
            <radialGradient
              id="paint0_angular_1_1198"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(8 8) rotate(90) scale(8)"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      )}
      {getButtonText(isLoading)}
    </Button>
  );
}

export default UploadButton;
