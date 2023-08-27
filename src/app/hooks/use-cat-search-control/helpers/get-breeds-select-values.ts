import { Breed } from "@/app/api/api";

interface SelectValue {
  name: string;
  value: string;
}

const getBreedsSelectValues = (breedsData: Breed[] | null): SelectValue[] =>
  breedsData?.map((data) => ({ name: data.name, value: data.id })) ?? [];

export { getBreedsSelectValues as default, type SelectValue };
