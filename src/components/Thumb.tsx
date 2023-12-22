import { useEffect, useRef, useState } from "react";

import img1 from "../assets/productDetail/img1.svg";
import img2 from "../assets/productDetail/img2.jpg";
import img3 from "../assets/productDetail/img3.jpg";
import img4 from "../assets/productDetail/img4.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
const Thumb = () => {
  const [activeId, setActiveId] = useState(0);
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);

  const arr = [img1, img2, img3, img4, img2, img3];

  const toLeft = () => {
    setActiveId(activeId === 0 ? arr.length - 1 : activeId - 1);
  };

  const toRight = () => {
    setActiveId(activeId === arr.length - 1 ? 0 : activeId + 1);
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
    console.log("ref1", container1Ref);
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
      console.log("active element", activeElement1);
    }
  }, [activeId]);

  return (
    <div className="flex flex-col gap-2">
      <section className="relative ">
        <div
          className="absolute top-0 left-0 w-16 h-full flex items-center"
          onClick={toLeft}
        >
          <Icon
            icon="fluent:ios-arrow-left-24-filled"
            className="w-16 h-16 text-white pl-5"
          />
        </div>
        <div
          className="absolute top-0 right-0 w-16 h-full flex items-center"
          onClick={toRight}
        >
          <Icon
            icon="fluent:ios-arrow-right-24-filled"
            className="w-16 h-16 text-white pr-5"
          />
        </div>
        <div
          className="flex overflow-hidden w-96 h-60 md:w-[600px] md:h-[500px] gap-5 "
          ref={container1Ref}
        >
          {arr.map((image, i) => (
            <div
              key={i}
              className={`shrink-0 w-96 h-60 md:w-[600px] md:h-[500px] ${
                activeId == i ? "active" : ""
              }`}
            >
              <img src={image} className="default-img" />
            </div>
          ))}
        </div>
      </section>
      <section
        className="w-96 h-16 md:w-[600px] md:h-32 flex gap-5 overflow-x-scroll "
        ref={container2Ref}
      >
        {arr.map((image, i) => (
          <div
            key={i}
            className={`opacity-50 shrink-0 md:w-52 ${
              activeId == i ? "active" : ""
            }`}
            onClick={() => handleClick(i)}
          >
            <img src={image} className="default-img " />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Thumb;
