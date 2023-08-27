import FailedIcon from "@/app/components/icons/Failed-icon";
import SuccessIcon from "@/app/components/icons/Success-icon";

interface Props {
  isSuccess?: boolean;
  isRejected?: boolean;
  message: string;
}

function DropzoneMessage({ isSuccess, message, isRejected }: Props) {
  if (!isSuccess && !isRejected) {
    return null;
  }

  let iconToShow = null;

  if (isSuccess) {
    iconToShow = <SuccessIcon />;
  } else if (isRejected) {
    iconToShow = <FailedIcon />;
  }

  return (
    <div className="p-5 flex gap-[10px] text-base text-[#8C8C8C] font-normal bg-white rounded-[10px]">
      {iconToShow}
      <span>{message}</span>
    </div>
  );
}

export default DropzoneMessage;
