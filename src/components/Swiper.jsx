import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

export default ({ slides, config }) => {
  return (
    <Swiper
      modules={config.modules}
      spaceBetween={config.spaceBetween}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      speed={config.speed}
      direction={"horizontal"}
      mousewheel={{
        releaseOnEdges: true,
        thresholdDelta: 1,
      }}
      className={config.className}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
};
