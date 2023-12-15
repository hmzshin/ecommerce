import { useEffect, useRef, useState } from "react";

import img1 from "../assets/productDetail/img1.svg";
import img2 from "../assets/productDetail/img2.jpg";
import img3 from "../assets/productDetail/img3.jpg";
import img4 from "../assets/productDetail/img4.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
const Thumb = () => {
  const [activeId, setActiveId] = useState(0);
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
  }, [activeId]);
  return (
    <div className="flex flex-col gap-2">
      <section className="relative w-[600px] h-[500px]">
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

        {arr.map((image, i) =>
          activeId == i ? (
            <div key={i} className="w-full h-full">
              <img src={image} className="default-img" />
            </div>
          ) : (
            ""
          )
        )}
      </section>
      <section
        className="w-[600px] h-[200px] flex gap-5 overflow-hidden "
        ref={container2Ref}
      >
        {arr.map((image, i) => (
          <div
            key={i}
            className={`w-36 h-24 opacity-50 shrink-0  ${
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
