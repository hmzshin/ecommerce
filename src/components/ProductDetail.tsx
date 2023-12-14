import { Icon } from "@iconify/react";
import Swiper from "./Swiper";
import {
  Pagination,
  Navigation,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper/modules";

import img1 from "../assets/productDetail/img1.svg";
import img2 from "../assets/productDetail/img2.jpg";
import img3 from "../assets/productDetail/img3.jpg";
import img4 from "../assets/productDetail/img4.jpg";
import detailImg from "../assets/productDetail/detailImage.jpeg";

const ProductDetail = () => {
  return (
    <section id="productDatails " className="pb-20">
      <section className="bg-neutral-50 flex justify-between items-center py-10 px-[15%]">
        <div className="flex gap-5 items-center">
          <p className="text-center text-slate-800 text-lg font-bold font-['Montserrat'] tracking-[0.2px]">
            Home
          </p>
          <Icon
            icon="mingcute:right-fill"
            className="w-5 h-5 text-stone-300 font-bold"
          />
          <p className="text-center text-lg text-stone-300 font-bold font-['Montserrat'] tracking-[0.2px]">
            Shop
          </p>
        </div>
      </section>

      <section className="flex gap-20 bg-neutral-50 px-[15%] pb-20 ">
        <Swiper
          slides={[
            <img src={img1} className="w-full h-full" />,
            <img src={img2} className="w-full h-full" />,
            <img src={img3} className="w-full h-full" />,
            <img src={img4} className="w-full h-full" />,
          ]}
          config={{
            spaceBetween: 50,
            speed: "1000",
            modules: [Pagination, Navigation, Scrollbar, A11y, Mousewheel],
            className: "w-[600px] h-[450px] m-0",
          }}
        />

        <div className="w-[500px] flex flex-col items-start ">
          <p className="text-slate-800 text-2xl font-normal font-['Montserrat']  tracking-[0.2px]">
            Floating Phone
          </p>
          <div className="flex items-center py-5 ">
            {[1, 2, 3, 4, 5].map((star: any, i) =>
              i == 4 ? (
                <Icon
                  className="text-[#F3CD03] w-6 h-6"
                  icon="mdi:star-outline"
                />
              ) : (
                <Icon className="text-[#F3CD03] w-6 h-6" icon="mdi:star" />
              )
            )}

            <p className=" text-neutral-500 font-bold text-base font-['Montserrat'] tracking-[0.2px] pl-3">
              10 Reviews
            </p>
          </div>
          <p className="text-center text-slate-800 text-2xl font-bold font-['Montserrat']  tracking-tight">
            $1,139.33
          </p>
          <p className="text-neutral-500 text-base font-bold font-['Montserrat']  tracking-tight pt-3">
            Availability : <span className="text-sky-500 ">In Stock </span>
          </p>
          <p className="text-zinc-500 text-base font-normal font-['Montserrat']  tracking-tight pt-10">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>
          <hr className="w-full border border-stone-300 my-5" />
          <div className="flex justify-start items-center gap-2">
            {[
              "bg-sky-500",
              "bg-green-500",
              "bg-orange-400",
              "bg-slate-800",
            ].map((color, i) => (
              <div key={i} className={`w-4 h-4 ${color} rounded-full`} />
            ))}
          </div>

          <div className="flex gap-5 pt-10">
            <div className="w-36h-11 px-5 py-2.5 bg-sky-500 rounded-md  text-center text-white text-base font-bold font-['Montserrat'] tracking-tight">
              Select Options
            </div>{" "}
            {[
              "mdi:heart-outline",
              "mdi:shopping-cart-outline",
              "bi:eye-fill",
            ].map((icon, i) => (
              <div
                key={i}
                className="w-10 h-10 relative bg-white rounded-3xl border border-gray-200"
              >
                <Icon icon={icon} className="w-full h-full p-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center gap-20 p-20">
        <p className="text-center text-neutral-500 text-lg font-semibold font-['Montserrat'] tracking-tight">
          Description
        </p>
        <p className="text-center text-neutral-500 text-lg font-semibold font-['Montserrat'] tracking-tight">
          Additional Information
        </p>
        <p className="text-center text-neutral-500 text-lg font-semibold font-['Montserrat'] tracking-tight">
          Reviews <span className="text-teal-700 ">(0)</span>
        </p>
      </section>

      <section className="px-[15%] flex gap-10 ">
        <div className="w-1/3 rounded-lg shadow-[10px_10px_0px_0px] shadow-stone-300  ">
          {" "}
          <img
            src={detailImg}
            className=" w-full h-full rounded-lg object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-10 w-1/3">
          <p className="text-slate-800 text-3xl font-bold font-['Montserrat']  tracking-tight">
            the quick fox jumps over{" "}
          </p>
          <p className="text-neutral-500 text-base font-normal font-['Montserrat']  tracking-tight">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met. <br /> <br />
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
            <br /> <br />
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>
        </div>
        <div className="w-1/3">
          <p className="text-slate-800 text-3xl font-bold font-['Montserrat']  tracking-tight">
            the quick fox jumps over{" "}
          </p>
          <div className="flex flex-col gap-3 pt-10">
            {[1, 2, 3, 4].map((p, i) => (
              <div key={i} className="flex gap-5 items-center">
                <Icon icon="iconamoon:arrow-right-2-thin" />
                <p className="text-neutral-500 text-base font-normal font-['Montserrat']  tracking-tight">
                  the quick fox jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>

          <p className="text-slate-800 text-3xl font-bold font-['Montserrat']  tracking-tight  py-10">
            the quick fox jumps over{" "}
          </p>
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((p, i) => (
              <div key={i} className="flex gap-5 items-center">
                <Icon icon="iconamoon:arrow-right-2-thin" />
                <p className="text-neutral-500 text-base font-normal font-['Montserrat']  tracking-tight">
                  the quick fox jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductDetail;
