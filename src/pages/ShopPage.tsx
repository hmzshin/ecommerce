import Clients from "../components/Clients";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";

const ShopPage = () => {
  const routerParams = useParams();
  const [spinner, setSpinner] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSpinner(true);
    dispatch(
      fetchProducts({ params: { category: routerParams.category_id } })
    ).finally(() => {
      setTimeout(() => {
        setSpinner(false);
      }, 500);
    });
  }, [routerParams]);

  const categories: any = useAppSelector((state) => state.global.categories);
  const products: any = useAppSelector((state) => state.product.products);

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
        <div className="bg-neutral-50 flex justify-between items-center h-40 px-[15%]  ">
          <p className="text-slate-800 text-3xl font-bold font-['Montserrat'] tracking-[0.2px]">
            Shop
          </p>
          <div className="flex gap-5">
            <p className="text-center text-slate-800 font-bold font-['Montserrat'] tracking-[0.2px]">
              Home
            </p>
            <Icon icon="mingcute:right-fill" className="w-6 h-6" />
            <p className="text-center text-stone-300 font-bold font-['Montserrat'] tracking-[0.2px]">
              Shop
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-y-10  gap-x-5 xl:pb-20 bg-neutral-50 ">
          {shoppingCategories.map((cardContent: any, i: number) => (
            <Link
              key={i}
              to={`/shop/${cardContent.id}/${
                cardContent.gender === "k" ? "kadın" : "erkek"
              }/${cardContent.title.toLowerCase()}`}
              className="flex flex-col items-center justify-center w-80 h-96 lg:w-60 lg:h-72 relative "
            >
              <div className="w-full h-full absolute top-0 left-0 bg-neutral-800 bg-opacity-25 z-[1]"></div>

              <img
                src={cardContent.img}
                className="absolute top-0 left-0 z-[0] w-full h-full object-cover object-center "
              />
              <p className="text-center text-white text-xl font-bold font-['Montserrat'] tracking-[0.2px] z-[1]">
                {cardContent.title}
              </p>
              <p className=" text-white font-bold text-sm font-['Montserrat'] tracking-[0.2px] z-[1]">
                {cardContent.gender === "k" ? "Kadın" : "Erkek"}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section id="products">
        <div className="flex flex-wrap justify-center gap-5 md:justify-between items-center px-[12%] py-20">
          <p className="text-neutral-500 text-base font-bold font-['Montserrat']  tracking-[0.2px]">
            {`Showing all ${products.length} results`}
          </p>
          <div className="flex gap-5 items-center">
            <p className="text-neutral-500 text-base font-bold font-['Montserrat']  tracking-[0.2px]">
              Views:
            </p>
            <div className="w-12 h-12 p-2 rounded-md border border-gray-200 ">
              <Icon icon="material-symbols:window" className="w-full h-full" />
            </div>
            <div className="w-12 h-12 p-3 rounded-md border border-gray-200 ">
              <Icon icon="icon-park-outline:list" className="w-full h-full" />
            </div>
          </div>
          ))}
        </div>
        {spinner ? (
          <Icon icon="svg-spinners:180-ring" className="m-auto w-20 h-20" />
        ) : products.length === 0 ? (
          <p className="text-center text-rose-500 text-base font-bold font-['Montserrat']  tracking-[0.2px]">
            Ürün bulunamadı
          </p>
        ) : (
          <div className=" flex flex-wrap gap-20 justify-around px-[7%] lg:px-[12%]">
            {products?.map((product: any, i: number) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        )}

        <div className="w-80 h-20 bg-white rounded-md shadow border border-stone-300 flex m-auto mt-40">
          <p className="p-7 bg-zinc-100 border border-stone-300 text-stone-300 text-base font-bold font-['Montserrat']  tracking-[0.2px]">
            First
          </p>

          {[1, 2, 3].map((number, i) => (
            <p
              key={i}
              className="py-7 w-20 bg-white border border-gray-200  text-center text-sky-500 text-base font-bold font-['Montserrat'] tracking-[0.2px] hover:text-white hover:bg-sky-500"
            >
              {number}
            </p>
          ))}

          <p className="p-6 bg-white border border-gray-200 text-sky-500 text-base font-bold font-['Montserrat'] tracking-[0.2px]">
            Next
          </p>
        </div>
      </section>
      <Clients />
      <Footer />
    </>
  );
};

export default ShopPage;
