import { Breed } from "@/app/api/api";

interface Props {
  breed?: Breed;
}

function BreedDescription({ breed }: Props) {
  if (!breed) {
    return null;
  }

  const { name, temperament, origin, weight, life_span } = breed;

  return (
    <div className="rounded-[20px] px-10 border-[2px] border-[#FBE0DC] border-solid relative py-[26px]">
      <div
        className="px-[40px] w-fit whitespace-nowrap bg-white py-[5px] text-[36px] font-medium leading-normal text-[#1D1D1D] h-[62px] rounded-[20px]"
        style={{
          position: "absolute",
          top: "-4px",
          left: "50%",
          right: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {name}
      </div>
      <span
        className={
          "block w-full text-center non-italic text-xl	font-medium leading-normal text-[#8C8C8C] mb-[20px]"
        }
      >
        {temperament}
      </span>
      <div className="flex items-center gap-[90px]">
        <div className="text-[#1D1D1D] text-base font-medium max-w-[225px]">
          <strong className="block">Temperament:</strong>
          <span className="text-[#8C8C8C]">{temperament}</span>
        </div>

        <ul className="flex flex-col gap-[10px]">
          <li className="text-base font-medium">
            <strong>Origin:&nbsp;</strong>
            <span className="text-[#8C8C8C]">{origin}</span>
          </li>
          <li className="text-base font-medium">
            <strong>Weight:&nbsp;</strong>
            <span className="text-[#8C8C8C]">{weight.imperial}&nbsp;kgs</span>
          </li>
          <li className="text-base font-medium">
            <strong>Life span:&nbsp;</strong>
            <span className="text-[#8C8C8C]">{life_span}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { BreedDescription as default };
