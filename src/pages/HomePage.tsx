import TopProductsOfWeek from "../components/TopProductOfWeek.tsx";
import Blog from "../components/Blog.tsx";
import Clients from "../components/Clients.tsx";
import Featured from "../components/Featured.tsx";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import Hero from "../components/Hero.tsx";
import Swiper from "../components/Swiper.tsx";
import contentImg1 from "../assets/content/contentImg1.svg";
import contentImg2 from "../assets/content/contentImg2.svg";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper/modules";
import { useAppDispatch, useAppSelector } from "../store/store.ts";
import ProductCard from "../components/ProductCard.tsx";
import { useEffect } from "react";
import { fetchBestseller } from "../store/slices/bestsellerSlice.ts";

const HomePage = () => {
  const shoppingCart = useAppSelector((store) => store.shoppingCard.card);
  const categories = useAppSelector((store) => store.global.categories);
  const productBestsellers = useAppSelector(
    (state) => state.bestseller.products
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchBestseller({
        params: { sort: "rating:desc", limit: 24 },
      })
    );
  }, []);
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
            {productBestsellers.map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                categories={categories}
                shoppingCart={shoppingCart}
              />
            ))}
          </div>
          <div className="h-14 px-10 py-4 rounded-md border border-sky-500 flex justify-center items-center  text-sky-500 text-sm font-bold font-['Montserrat'] tracking-tight ">
            LOAD MORE PRODUCTS
          </div>
        </div>
      </section>
      <section id="featuredProducts">
        <div className="px-[10%] py-20 gap-20 flex flex-wrap-reverse xl:flex-nowrap items-center justify-around 2xl:justify-around">
          <div className="flex gap-5  ">
            {" "}
            <img
              src={contentImg1}
              className="h-[300px] sm:h-[450px]  2xl:h-[600px]"
            />
            <img
              src={contentImg2}
              className="h-[300px] sm:h-[450px]  2xl:h-[600px]"
            />
          </div>

          <div className="flex flex-col justify-center items-start gap-10 ">
            <div className="text-sky-500 text-xl xl:text-2xl font-bold font-['Montserrat'] leading-normal tracking-[0.1px]">
              Featured Products
            </div>
            <div className="max-w-[400px] xl:max-w-[700px] text-slate-800 text-5xl  xl:text-6xl font-bold font-['Montserrat'] tracking-tight">
              We love what we do
            </div>
            <div className="max-w-[370px] xl:max-w-[500px] text-neutral-500 text-lg font-normal font-['Montserrat'] leading-tight tracking-[0.2px]">
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
