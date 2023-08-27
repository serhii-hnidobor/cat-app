import BackButton from "@/app/components/clients/Back-button";
import { useRouter } from "next/navigation";

function ControlSection() {
  const router = useRouter();

  return (
    <div className="flex gap-[10px]">
      <BackButton onClick={router.back} />
      <div className="w-[143px] h-[40px] bg-[#FF868E] rounded-[10px] flex justify-center items-center">
        <span className="uppercase text-xl text-white not-italic font-medium leading-[30px] tracking-[2px]">
          search
        </span>
      </div>
    </div>
  );
}

export default ControlSection;
