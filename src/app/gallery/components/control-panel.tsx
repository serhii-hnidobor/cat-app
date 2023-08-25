import BackButton from "@/app/components/clients/Back-button";
import Button from "@/app/components/clients/Button";
import { useRouter } from "next/navigation";
import { SetStateAction, Dispatch } from "react";
import { SelectWithLabel } from "@/app/components/clients/Select";
import { CatImageData } from "@/app/api/api";
import { DataStatus, ImageType, Sort } from "@/app/common/enums";
import LoadMoreButton from "@/app/components/clients/Load-more-button";
import isLoading from "@/app/helpers/is-loading";
import UploadButton from "@/app/components/clients/Dropzone/components/Upload-button";
import UploadCatImageButton from "@/app/components/clients/Upload-cat-image-button";

interface Option {
  value: string;
  name: string;
}

interface Props {
  onCurBreedIdChange: Dispatch<SetStateAction<string | null>>;
  onPageIndexChange: Dispatch<SetStateAction<number>>;
  onItemsPerPageChange: Dispatch<SetStateAction<number>>;
  onAllImageChange: Dispatch<SetStateAction<CatImageData[] | null>>;
  onLoadMore: () => void;
  breedsSelectValue: Option[];
  handleSortChange: (sortOrder: Sort) => void;
  handleImageTypeChange: (imageType: ImageType) => void;
  sortOrder: Sort;
  imagesDataStatus: DataStatus;
  haveMore: boolean;
  handleUploadImage: () => void;
}

type HandleBreedSelectArg = Pick<
  Props,
  'onAllImageChange' |
  'onCurBreedIdChange' |
  'onPageIndexChange'
>

const handleBreedSelectChange = ({
  onAllImageChange,
  onCurBreedIdChange,
  onPageIndexChange,
}: HandleBreedSelectArg) => {
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

interface HandleImageTypeChangeArg {
  onImageTypeChange: (imageType: ImageType) => void;
  onAllImageChange: Dispatch<SetStateAction<CatImageData[] | null>>;
}

const getHandleImageTypeChange = ({ onAllImageChange, onImageTypeChange }: HandleImageTypeChangeArg) => {
  return (_: unknown, newSortValue: string | null) => {
    onImageTypeChange(newSortValue as ImageType);
    onAllImageChange([]);
  }
}

interface HandleSortChangeArg {
  onSortChange: (sortOrder: Sort) => void;
  onAllImageChange: Dispatch<SetStateAction<CatImageData[] | null>>;
}

const getHandleSortChange = ({ onAllImageChange, onSortChange }: HandleSortChangeArg) => {
  return (_: unknown, newSortValue: string | null) => {
    onSortChange(newSortValue as Sort);
    onAllImageChange([]);
  }
}

function SelectBlock({
  onCurBreedIdChange,
  onPageIndexChange,
  onItemsPerPageChange,
  onAllImageChange,
  breedsSelectValue,
  handleSortChange,
  handleImageTypeChange,
  onLoadMore,
  imagesDataStatus,
  haveMore
}: Props) {

  const onSortChange = getHandleSortChange({ onAllImageChange, onSortChange: handleSortChange })
  const onImageTypeChange = getHandleImageTypeChange({ onAllImageChange, onImageTypeChange: handleImageTypeChange });

  return (
    <div className="w-full h-[156px] bg-[#F8F8F7] rounded-[20px] grid grid-cols-2 grid-rows-2 gap-x-[20px] gap-y-[10px] px-5 pb-5 pt-[10px]">
      <SelectWithLabel
        label="order"
        labelClassName="uppercase ml-[10px] text-[#8C8C8C] non-italic leading-[18px] font-medium text-[10px]"
        values={[{ value: Sort.ASC, name: 'Asc' }, { value: Sort.DESC, name: 'Desc' }, { value: Sort.RANDOM, name: 'Random' }]}
        defaultValue={Sort.RANDOM}
        className="w-[290px] rounded-[10px] bg-[#F8F8F7] text-gray-500"
        listBoxClassName="!w-[290px] max-h-[300px] overflow-y-auto"
        onChange={onSortChange}
      />
      <SelectWithLabel
        label="type"
        labelClassName="uppercase ml-[10px] text-[#8C8C8C] non-italic leading-[18px] font-medium text-[10px]"
        values={[{ value: ImageType.ALL, name: 'All' }, { value: ImageType.ANIMATED, name: 'Animated' }, { value: ImageType.STATIC, name: 'Static' }]}
        defaultValue={ImageType.ALL}
        className="w-[290px] rounded-[10px] bg-[#F8F8F7] text-gray-500"
        listBoxClassName="!w-[290px] max-h-[300px] overflow-y-auto"
        onChange={onImageTypeChange}
      />
      <SelectWithLabel
        label="type"
        labelClassName="uppercase ml-[10px] text-[#8C8C8C] non-italic leading-[18px] font-medium text-[10px]"
        values={[{ value: "all", name: "All breeds" }, ...breedsSelectValue]}
        defaultValue="all"
        className="w-[290px] rounded-[10px] bg-[#F8F8F7] text-gray-500"
        listBoxClassName="!w-[290px] max-h-[300px] overflow-y-auto"
        onChange={handleBreedSelectChange({
          onAllImageChange,
          onCurBreedIdChange,
          onPageIndexChange,

        })}
      />
      <div className="flex gap-[10px] relative items-end">
        <SelectWithLabel
          label="limit"
          labelClassName="uppercase ml-[10px] text-[#8C8C8C] non-italic leading-[18px] font-medium text-[10px]"
          values={[5, 10, 15, 20, 25].map((num) => ({
            value: String(num),
            name: `${num} items per page`,
          }))}
          defaultValue={"10"}
          className="w-[240px] rounded-[10px] bg-[#F8F8F7] text-gray-500"
          listBoxClassName="!w-[240px] max-h-[300px] overflow-y-auto"
          containerClassName="w-[240px]"
          onChange={(_, value) => {
            const newItemPerPage = Number(value);
            if (!Number.isNaN(newItemPerPage)) {
              onItemsPerPageChange(Number(newItemPerPage));
              onPageIndexChange(0);
            }
          }}
        />
        <LoadMoreButton onClick={onLoadMore} isLoading={isLoading(imagesDataStatus)} disabled={!haveMore} />
      </div>
    </div>
  );
}

function ControlPanel(props: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex justify-between">
        <div className="flex gap-[10px]">
          <BackButton onClick={router.back} />
          <div className="w-[143px] h-[40px] bg-[#FF868E] rounded-[10px] flex justify-center items-center">
            <span className="uppercase text-xl text-white not-italic font-medium leading-[30px] tracking-[2px]">
              GALLERY
            </span>
          </div>
        </div>
        <UploadCatImageButton onClick={props.handleUploadImage}/>
      </div>
      <SelectBlock {...props} />
    </div>
  );
}

export { ControlPanel as default };
