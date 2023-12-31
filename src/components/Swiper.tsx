import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default ({ slides, config }: any) => {
  return (
    <>
      <Swiper
        spaceBetween={config.spaceBetween}
        speed={config.speed}
        modules={config.modules}
        className={config.className}
        mousewheel={{ releaseOnEdges: true, invert: true }}
        pagination={{ clickable: true }}
      >
        {slides.map((slide: any, i: number) => (
          <SwiperSlide key={i}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
