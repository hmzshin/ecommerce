import TopProductsOfWeek from "../components/TopProductOfWeek.tsx";
import Blog from "../components/Blog.tsx";
import Clients from "../components/Clients.tsx";
import Featured from "../components/Featured.tsx";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import Hero from "../components/Hero.tsx";
import BestSellerProductCard from "../components/BestsellerProductCard.tsx";
import Swiper from "../components/Swiper.tsx";
import contentImg1 from "../assets/content/contentImg1.svg";
import contentImg2 from "../assets/content/contentImg2.svg";
import { homeBestsellers } from "../data.js";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper/modules";

const HomePage = () => {
  return (
    <>
      <Header />
      <Swiper
        slides={[<Hero />, <Hero />]}
        config={{
          spaceBetween: 100,
          speed: "1000",
          modules: [Navigation, Pagination, Scrollbar, A11y, Mousewheel],
          className: "xl:w-[90vw]",
        }}
      />
      <Clients />
      <TopProductsOfWeek />
      <section id="bestsellers">
        <div className=" flex flex-col items-center gap-20 px-[12%] py-20">
          <div className="inline-flex flex-col justify-start items-center gap-2.5 ">
            <p className="text-center text-neutral-500 text-xl font-normal font-['Montserrat'] leading-loose tracking-tight hidden lg:block">
              Featured Products
            </p>
            <p className="text-center text-slate-800 text-2xl font-bold font-['Montserrat'] leading-loose tracking-tight">
              BESTSELLER PRODUCTS
            </p>
            <p className="text-center text-neutral-500 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
              Problems trying to resolve the conflict between{" "}
            </p>
          </div>

          <div className=" flex flex-wrap gap-10 justify-around">
            {homeBestsellers.map((product, i) => (
              <BestSellerProductCard
                key={i}
                bsProduct={product}
                style={"w-80 sm:w-56"}
              />
            ))}
          </div>
          <div className="h-14 px-10 py-4 rounded-md border border-sky-500 flex justify-center items-center  text-sky-500 text-sm font-bold font-['Montserrat'] tracking-tight ">
            LOAD MORE PRODUCTS
          </div>
        </div>
      </section>
      <section id="featuredProducts">
        <div className="px-10 lg:px-[10%] py-20 flex flex-wrap-reverse 2xl:flex-nowrap items items- 2xl:justify-around gap-20">
          <div className="flex gap-5">
            {" "}
            <img src={contentImg1} className="h-[350px] md:h-[700px] " />
            <img src={contentImg2} className="h-[350px] md:h-[700px]" />
          </div>

          <div className="flex-col justify-center items-start gap-10 inline-flex ">
            <div className="text-sky-500 text-2xl font-bold font-['Montserrat'] leading-normal tracking-[0.1px]">
              Featured Products
            </div>
            <div className="w-[400px] lg:max-w-[700px] text-slate-800 text-6xl font-bold font-['Montserrat'] tracking-tight">
              We love what we do
            </div>
            <div className="w-[370px] lg:w-[500px] text-neutral-500 text-lg font-normal font-['Montserrat'] leading-tight tracking-[0.2px]">
              Problems trying to resolve the conflict between{" "}
              <br className="hidden md:block" />
              the two major realms of Classical physics:{" "}
              <br className="hidden md:block" />
              Newtonian mechanics.
              <br /> <br />
              Problems trying to resolve the conflict between{" "}
              <br className="hidden md:block" />
              the two major realms of Classical physics:{" "}
              <br className="hidden md:block" />
              Newtonian mechanics{" "}
            </div>
          </div>
        </div>
      </section>
      <Featured />
      <Blog />
      <Footer />
    </>
  );
};

export default HomePage;
