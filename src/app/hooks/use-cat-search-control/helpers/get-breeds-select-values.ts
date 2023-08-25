import { Breed } from "@/app/api/api";

const getBreedsSelectValues = (breedsData: Breed[] | null) =>
  breedsData?.map((data) => ({ name: data.name, value: data.id })) ?? [];

export { getBreedsSelectValues as default };
