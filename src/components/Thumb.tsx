import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Thumb = ({ images }: any) => {
  const [activeId, setActiveId] = useState(0);
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);

  const toLeft = () => {
    setActiveId(activeId === 0 ? images.length - 1 : activeId - 1);
  };

  const toRight = () => {
    setActiveId(activeId === images.length - 1 ? 0 : activeId + 1);
  };

  const handleClick = (index: number) => {
    setActiveId(index);
  };

  useEffect(() => {
    if (container2Ref.current) {
      const activeElement = container2Ref.current.querySelector(".active");
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeId]);
  useEffect(() => {
    if (container1Ref.current) {
      const activeElement1 = container1Ref.current.querySelector(".active");
      if (activeElement1) {
        activeElement1.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeId]);

  return (
    <div className="flex flex-col gap-2">
      <section className="relative ">
        <div
          className="absolute top-0 left-0 w-16 h-full flex items-center cursor-pointer"
          onClick={toLeft}
        >
          <Icon
            icon="fluent:ios-arrow-left-24-filled"
            className="w-16 h-16 text-neutral-500 pl-5"
          />
        </div>
        <div
          className="absolute top-0 right-0 w-16 h-full flex items-center cursor-pointer"
          onClick={toRight}
        >
          <Icon
            icon="fluent:ios-arrow-right-24-filled"
            className="w-16 h-16 text-neutral-500 pr-5 "
          />
        </div>
        <div
          className="flex overflow-hidden w-96 h-60 md:w-[600px] md:h-[500px] gap-5 "
          ref={container1Ref}
        >
          {images.map((image: any, i: number) => (
            <div
              key={i}
              className={`shrink-0 w-96 h-60 md:w-[600px] md:h-[500px] ${
                activeId == i ? "active" : ""
              } flex justify-center`}
            >
              <img src={image.url} className="h-full" />
            </div>
          ))}
        </div>
      </section>
      <section
        className="w-96 h-16 md:w-[600px] md:h-32 flex gap-5 overflow-x-auto "
        ref={container2Ref}
      >
        {images.map((image: any, i: number) => (
          <div
            key={i}
            className={`opacity-50 shrink-0 md:w-52 ${
              activeId == i ? "active" : ""
            } flex justify-center items-center`}
            onClick={() => handleClick(i)}
          >
            <img src={image.url} className="h-full cursor-pointer" />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Thumb;
