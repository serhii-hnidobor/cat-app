import BackButton from "@/app/components/clients/Back-button";
import { useRouter } from "next/navigation";

function ControlSection() {
  const router = useRouter();

  return (
    <div className="flex gap-[10px]">
      <BackButton onClick={router.back} />
      <div className="px-[30px] py-[5px] bg-[#FF868E] rounded-[10px] flex justify-center items-center">
        <span className="uppercase text-xl text-white not-italic font-medium leading-[30px] tracking-[2px]">
          FAVOURITES
        </span>
      </div>
    </div>
  );
}

export default ControlSection;
