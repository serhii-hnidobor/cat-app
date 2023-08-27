"use client";
import { Dispatch, SetStateAction, useState } from "react";
import SearchIcon from "../icons/Search-icon";
import { useSearchParams } from "next/navigation";
import useKeyPress from "@/app/hooks/use-keypress";

interface Props {
  placeholder: string;
  onSearch: (searchValue: string) => void;
}

function getOnFocusAndOnBlur(setIsInFocus: Dispatch<SetStateAction<boolean>>) {
  return {
    onFocus: () => setIsInFocus(true),
    onBlur: () => setIsInFocus(false),
  };
}

function SearchInput({ placeholder, onSearch }: Props) {
  const searchParams = useSearchParams();
  const defaultSearchValue = searchParams.get("value");
  const [searchValue, setSearchValue] = useState(defaultSearchValue ?? "");
  const [isInFocus, setIsInFocus] = useState(false);

  const { onBlur, onFocus } = getOnFocusAndOnBlur(setIsInFocus);

  useKeyPress({
    keyArray: ["Enter"],
    callback: () => isInFocus && onSearch(searchValue),
  });

  return (
    <div
      className={
        "w-[470px] h-[60px] rounded-[20px]  bg-white relative leading-[30px] text-[20px] text-[#8C8C8C] non-italic font-normal "
      }
    >
      <input
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
        className="py-[10px] h-full pl-5 pr-[60px] w-full bg-white rounded-[20px] focus:outline-[2px] focus:outline-solid focus:outline-[#FBE0DC]"
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button
        onClick={() => onSearch(searchValue)}
        className="w-10 h-10 rounded-[10px] absolute top-[10px] right-[10px] flex justify-center items-center bg-[#FBE0DC]"
        aria-label="search"
      >
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchInput;
