import Clients from "../components/Clients";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Products from "../components/Products";
import arrowRight from "../assets/shopCards/arrowRight.svg";
import { useAppSelector } from "../store/store";

const ShopPage = () => {
  const categories: any = useAppSelector((state) => state.global.categories);
  const categoriesCopy = [...categories];
  const len = categoriesCopy.length;
  for (let i: number = 0; i < len; i++) {
    for (let j: number = i + 1; j < len; j++) {
      let first = categoriesCopy[i];
      let second = categoriesCopy[j];
      if (second.rating > first.rating) {
        categoriesCopy[i] = second;
        categoriesCopy[j] = first;
      }
    }
  }
  const shoppingCategories = categoriesCopy.slice(0, 5);

  console.log("shopping categories", shoppingCategories);
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
        <div className="flex flex-wrap justify-center items-center gap-y-10  gap-x-5 xl:pb-20 bg-neutral-50 ">
          {shoppingCategories.map((cardContent: any, i: number) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center w-80 h-96 lg:w-60 lg:h-72 relative "
            >
              <div className="w-full h-full absolute top-0 left-0 bg-neutral-800 bg-opacity-25 z-[1]"></div>

              <img
                src={cardContent.img}
                className="absolute top-0 left-0 z-[0] w-full h-full object-cover object-center "
              />
              <p className="text-center text-white text-xl font-bold font-['Montserrat'] tracking-[0.2px] z-[10]">
                {cardContent.title}
              </p>
              <p className=" text-white font-bold text-sm font-['Montserrat'] tracking-[0.2px] z-[10]">
                {cardContent.gender === "k" ? "Kadın" : "Erkek"}
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
