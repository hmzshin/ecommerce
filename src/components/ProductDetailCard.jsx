import { Icon } from "@iconify/react";
import Swiper from "./Swiper";
import {
  Pagination,
  FreeMode,
  Thumbs,
  Navigation,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper/modules";

import img1 from "../assets/productDetail/img1.svg";
import img2 from "../assets/productDetail/img2.jpg";
import img3 from "../assets/productDetail/img3.jpg";
import img4 from "../assets/productDetail/img4.jpg";

const ProductDetailCard = ({ product }) => {
  return (
    <section id="productDatails">
      <div className="bg-neutral-50 flex justify-between items-center h-40 px-[15%]">
        <div className="flex gap-5 items-center">
          <p className="text-center text-slate-800 font-bold font-['Montserrat'] tracking-[0.2px]">
            Home
          </p>
          <Icon
            icon="simple-line-icons:arrow-right"
            className="w-5 h-5  text-stone-300 font-bold"
          />
          <p className="text-center text-stone-300 font-bold font-['Montserrat'] tracking-[0.2px]">
            Shop
          </p>
        </div>
      </div>

      <Swiper
        slides={[<img src={img1} />, <img src={img2} />, <img src={img3} />]}
        config={{
          spaceBetween: 50,
          speed: "1000",
          modules: [
            FreeMode,
            Pagination,
            Thumbs,
            Navigation,
            Scrollbar,
            A11y,
            Mousewheel,
          ],
          className: "w-[500px]",
        }}
      />
    </section>
  );
};

export default ProductDetailCard;
