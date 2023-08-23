import BackButton from "@/app/components/clients/Back-button";
import { useRouter } from "next/navigation";

interface Props {
    breedId: string;
}

const ControlPanel = ({ breedId }: Props) => {
    const router = useRouter();

    return <div className="flex gap-[10px] mb-5">
        <BackButton onClick={() => router.back()} />
        <div className="w-[143px] h-[40px] bg-[#FBE0DC] rounded-[10px] flex justify-center items-center">
            <span className="uppercase text-xl text-[#FF868E] not-italic font-medium leading-[30px] tracking-[2px]">
                breeds
            </span>
        </div>
        <div className="py-[5px] px-[30px] uppercase text-xl bg-[#FF868E] text-white not-italic font-medium leading-[30px] tracking-[2px] rounded-[10px]">
            {breedId}
        </div>
    </div>
}

export { ControlPanel as default };