"use client";
import { useState } from "react";
import SearchIcon from "../icons/Search-icon";
import { useSearchParams } from "next/navigation";
import useKeyPress from "@/app/hooks/use-keypress";

interface Props {
  placeholder: string;
  onSearch: (searchValue: string) => void;
}

function SearchInput({ placeholder, onSearch }: Props) {
  const searchParams = useSearchParams();
  const defaultSearchValue = searchParams.get("value");
  const [searchValue, setSearchValue] = useState(defaultSearchValue ?? "");

  useKeyPress({ keyArray: ["Enter"], callback: () => onSearch(searchValue) });

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
      />
      <button
        onClick={() => onSearch(searchValue)}
        className="w-10 h-10 rounded-[10px] absolute top-[10px] right-[10px] flex justify-center items-center bg-[#FBE0DC]"
      >
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchInput;
