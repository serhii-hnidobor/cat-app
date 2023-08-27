import { CatImageData } from "@/app/api/api";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { imageBlurBase64 } from "@/app/common/constants";

interface Props {
  catImageData: CatImageData[];
}

function BreedSwiper({ catImageData }: Props) {
  return (
    <Swiper
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: (index, className) =>
          `<span class=${className} style='width:10px;height:10px;border-radius:100%;'></span>`,
      }}
      modules={[Pagination]}
      className="h-[360px] rounded-[20px] relative"
    >
      {catImageData?.map(({ url }, index) => (
        <SwiperSlide key={`${url}-img-cat`} className="bg-cover bg-center">
          <Image
            alt="cat-image"
            src={url}
            blurDataURL={imageBlurBase64}
            placeholder={"blur"}
            width={640}
            height={360}
            className={"w-full"}
            priority={index === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function BreedImgView({ catImageData }: Props) {
  return (
    <div className="relative mb-[10px]">
      {Boolean(catImageData) && <BreedSwiper catImageData={catImageData} />}
      <div
        className="swiper-pagination bg-white p-[10px] rounded-[10px] absolute left-1/2 right-1/2"
        style={{
          display: "flex",
          width: "fit-content",
          left: "50%",
          right: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          bottom: "-30px",
          zIndex: "1000",
        }}
      />
    </div>
  );
}

export { BreedImgView as default };
