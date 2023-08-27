import BackButton from "@/app/components/clients/Back-button";
import AlphabetSortDesc from "@/app/components/icons/Alphabet-sort-desc";
import Button from "@/app/components/clients/Button";
import { useRouter } from "next/navigation";
import { SetStateAction, Dispatch } from "react";
import Select from "@/app/components/clients/Select";
import { CatImageData } from "@/app/api/api";
import AlphabetSortAsc from "@/app/components/icons/Alphabet-sort-asc";
import { Sort } from "@/app/common/enums";
import clsx from "clsx";

interface Option {
  value: string;
  name: string;
}

interface Props {
  onCurBreedIdChange: Dispatch<SetStateAction<string | null>>;
  onPageIndexChange: Dispatch<SetStateAction<number>>;
  onItemsPerPageChange: Dispatch<SetStateAction<number>>;
  onAllImageChange: Dispatch<SetStateAction<CatImageData[] | null>>;
  breedsSelectValue: Option[];
  handleSortChange: (sortOrder: Sort) => void;
  sortOrder: Sort;
}

const handleBreedSelectChange = ({
  onAllImageChange,
  onCurBreedIdChange,
  onPageIndexChange,
}: Omit<
  Props,
  | "breedsSelectValue"
  | "onItemsPerPageChange"
  | "handleSortChange"
  | "sortOrder"
>) => {
  return (_: unknown, value: string | null) => {
    if (!value) {
      return;
    }

    if (value === "all") {
      onCurBreedIdChange(null);
      onAllImageChange([]);
      onPageIndexChange(0);
      return;
    }

    onCurBreedIdChange(value);
    onAllImageChange([]);
    onPageIndexChange(0);
  };
};

function SelectBlock({
  onCurBreedIdChange,
  onPageIndexChange,
  onItemsPerPageChange,
  onAllImageChange,
  breedsSelectValue,
}: Props) {
  return (
    <>
      <Select
        values={[{ value: "all", name: "All breeds" }, ...breedsSelectValue]}
        defaultValue="all"
        className="w-[226px] rounded-[10px] bg-[#F8F8F7] text-gray-500"
        listBoxClassName="w-[226px] max-h-[300px] overflow-y-scroll"
        onChange={handleBreedSelectChange({
          onAllImageChange,
          onCurBreedIdChange,
          onPageIndexChange,
        })}
      />
      <Select
        values={[5, 10, 15, 20, 25].map((num) => ({
          value: String(num),
          name: `Limit: ${num}`,
        }))}
        defaultValue={"10"}
        className="w-[101px] rounded-[10px] bg-[#F8F8F7]"
        listBoxClassName="!w-[101px] max-h-[300px]"
        onChange={(_, value) => {
          const newItemPerPage = Number(value);
          if (!Number.isNaN(newItemPerPage)) {
            onItemsPerPageChange(Number(newItemPerPage));
            onPageIndexChange(0);
          }
        }}
      />
    </>
  );
}

const getSortIconFillColor = (sortOrder: Sort, iconSortOrder: Sort) =>
  sortOrder === iconSortOrder ? "#FF868E" : undefined;

function ControlPanel(props: Props) {
  const router = useRouter();

  const isSortAsc = props.sortOrder === Sort.ASC;

  return (
    <div className="flex gap-[10px]">
      <BackButton onClick={router.back} />
      <div className="px-[30px] py-[5px] bg-[#FF868E] rounded-[10px] flex justify-center items-center">
        <span className="uppercase text-xl text-white not-italic font-medium leading-[30px] tracking-[2px]">
          breeds
        </span>
      </div>
      <SelectBlock {...props} />
      <Button
        className={clsx({
          "w-[40px] h-[40px]": true,
          activeSortButtonClass: isSortAsc,
        })}
        onClick={() => props.handleSortChange(Sort.ASC)}
        aria-label="sort by alphabet ascending"
      >
        <AlphabetSortAsc
          fill={getSortIconFillColor(props.sortOrder, Sort.ASC)}
        />
      </Button>
      <Button
        className={clsx({
          "w-[40px] h-[40px]": true,
          activeSortButtonClass: !isSortAsc,
        })}
        onClick={() => props.handleSortChange(Sort.DESC)}
        aria-label="sort by alphabet descending"
      >
        <AlphabetSortDesc
          fill={getSortIconFillColor(props.sortOrder, Sort.DESC)}
        />
      </Button>
    </div>
  );
}

export { ControlPanel as default };
