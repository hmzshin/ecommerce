import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default ({ slides, config }) => {
  return (
    <>
      <Swiper
        spaceBetween={config.spaceBetween}
        navigation={true}
        speed={config.speed}
        modules={config.modules}
        className={config.className}
        mousewheel={{ releaseOnEdges: true, invert: true }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
