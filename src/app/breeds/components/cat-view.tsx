import { useRouter } from "next/navigation";
import { useRef } from 'react';
import handleInfiniteScroll from '@/app/helpers/infinite-scroll';
import CatGrid from "@/app/components/clients/cat-grid";
import SimpleBar from 'simplebar-react';
import { ClipLoader } from "react-spinners";
import { CatImageData } from "@/app/api/api";

interface Props {
    isLoading: boolean;
    loadMore: () => void;
    hasMore: boolean;
    allImages: CatImageData[]
}

const Loader = ({ isLoading }: { isLoading: boolean }) => isLoading && <div className="flex justify-center items-center"><ClipLoader color="#36d7b7" /></div>;

function CatView({ isLoading, hasMore, loadMore, allImages }: Props) {
    const router = useRouter();

    const containerRef = useRef<HTMLDivElement | null>(null);

    const onCatClick = (breedId: string) => router.push(`/breeds/${breedId}`);

    const onScroll = handleInfiniteScroll({ containerRef, loadMore, isLoading, hasMore })

    return <SimpleBar
        className="h-[768px]"
        id="scroll"
        scrollableNodeProps={{ ref: containerRef, onScroll }}
    >
        <CatGrid breedImages={allImages || []} hasMore={Boolean(hasMore)} onCatClick={onCatClick} />
        <Loader isLoading={isLoading} />
    </SimpleBar>;
}

export { CatView as default };