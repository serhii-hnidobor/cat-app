import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";
import SearchInput from "./Search-input";
import queryString from "@/app/helpers/query-string";
import { useRouter } from "next/navigation";
import PageControlButton from "./Page-controll-button";
import useWindowDimensions from "@/app/hooks/use-window-dimension";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import OnlyDesktopWarning from "./Only-desktop-warning";

interface Props {
  isLoading: boolean;
  children: ReactNode;
  controlSection: ReactNode;
  isNothingFound: boolean;
}

const getOnSearch = (router: AppRouterInstance) => {
  return (searchValue: string) =>
    router.push(`/search?${queryString({ value: searchValue })}`);
};

interface NothingFoundMessageProps {
  isNothingFound: boolean;
  content: ReactNode;
  isLoading: boolean;
}

function NothingFoundMessage({
  isNothingFound,
  content,
  isLoading,
}: NothingFoundMessageProps) {
  if (!isNothingFound || isLoading) {
    return content;
  }

  return (
    <div className="bg-[#F8F8F7] rounded-[10px] px-5 py-[18px] flex items-start font-normal non-italic text-[#8C8C8C]">
      <span>No item found</span>
    </div>
  );
}

function PageContentContainer({
  isLoading,
  children,
  controlSection,
  isNothingFound,
}: Props) {
  let content = children;

  const router = useRouter();

  const { width } = useWindowDimensions();

  if (isLoading) {
    content = (
      <div className="w-full h-full flex justify-center items-center">
        <ClipLoader color="#FF868E" size={70} />
      </div>
    );
  }

  return (
    <>
      <OnlyDesktopWarning />
      <div>
        <div className="mb-[10px] flex gap-[10px]">
          <SearchInput
            placeholder={"Search for breeds by name"}
            onSearch={getOnSearch(router)}
          />
          <PageControlButton />
        </div>
        <div className="w-[680px] h-[850px] bg-white rounded-[20px] p-5 flex flex-col gap-5">
          {controlSection}
          {
            <NothingFoundMessage
              content={content}
              isLoading={isLoading}
              isNothingFound={isNothingFound}
            ></NothingFoundMessage>
          }
        </div>
      </div>
    </>
  );
}

export default PageContentContainer;
