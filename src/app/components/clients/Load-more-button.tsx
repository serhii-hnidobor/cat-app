import Button from "../clients/Button";
import LoadMoreIcon from "../icons/Load-more";
import clsx from "clsx";

interface Props {
  disabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
  className?: string;
}

function LoadMoreButton({ disabled, isLoading, onClick, className }: Props) {
  return (
    <Button
      className={clsx(
        className,
        "w-10 h-10 rounded-[10px] bg-white hover:bg-[#FF868E] group disabled:bg-white flex justify-center items-center",
      )}
      disabled={disabled}
      onClick={onClick}
      aria-label="load more"
    >
      <LoadMoreIcon
        pathClassName="group-hover:fill-white disabled:fill-[#8C8C8C]"
        className={clsx("group", { "animate-spin": isLoading })}
      />
    </Button>
  );
}

export default LoadMoreButton;
