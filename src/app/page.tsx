import GirlAndPets from "../../public/images/girl-and-pets.webp";

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[680px] h-[840px] rounded-[20px] bg-[#FBE0DC]" />
      <div
        className="h-full absolute top-[-45px] max-w-[775px] w-[59vw] max-h-[900px] bg-cover	bg-no-repeat right-[-93px]"
        style={{ backgroundImage: `url(${GirlAndPets.src})` }}
      />
    </div>
  );
}
