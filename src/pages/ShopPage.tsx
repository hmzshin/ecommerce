import Clients from "../components/Clients";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Products from "../components/Products";

import shop1 from "../assets/shopCards/shop1.svg";
import shop2 from "../assets/shopCards/shop2.svg";
import shop3 from "../assets/shopCards/shop3.svg";
import shop4 from "../assets/shopCards/shop4.svg";
import shop5 from "../assets/shopCards/shop5.svg";
import arrowRight from "../assets/shopCards/arrowRight.svg";

const content = [
  { img: shop1, title: "CLOTHS", item: "5 Items" },
  { img: shop2, title: "CLOTHS", item: "5 Items" },
  { img: shop3, title: "CLOTHS", item: "5 Items" },
  { img: shop4, title: "CLOTHS", item: "5 Items" },
  { img: shop5, title: "CLOTHS", item: "5 Items" },
];

const ShopPage = () => {
  return (
    <>
      <Header />
      <section id="shopCards">
        <div className="bg-neutral-50 flex justify-between items-center h-40 px-[15%]">
          <p className="text-slate-800 text-3xl font-bold font-['Montserrat'] tracking-[0.2px]">
            Shop
          </p>
          <div className="flex gap-5">
            <p className="text-center text-slate-800 font-bold font-['Montserrat'] tracking-[0.2px]">
              Home
            </p>
            <img src={arrowRight} />
            <p className="text-center text-stone-300 font-bold font-['Montserrat'] tracking-[0.2px]">
              Shop
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-10 px-[15%] pb-20 bg-neutral-50 ">
          {content.map((cardContent, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center w-56 h-[243.3px] relative "
            >
              <div className="w-full h-full absolute top-0 left-0 bg-neutral-800 bg-opacity-25 z-[1]"></div>
              <img
                src={cardContent.img}
                className="absolute top-0 left-0 z-[0] w-full"
              />
              <p className="text-center text-white text-lg font-bold font-['Montserrat'] tracking-[0.2px] z-[10]">
                {cardContent.title}
              </p>
              <p className=" text-white font-bold font-['Montserrat'] tracking-[0.2px] z-[10]">
                {cardContent.item}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Products />
      <Clients />
      <Footer />
    </>
  );
};

export default ShopPage;
