import Clients from "../components/Clients";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMoreProducts, fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
interface Params {
  category?: string;
  filter?: string;
  sort?: string;
}
type RouterParams = {
  category_id?: string | undefined;
  gender?: string | undefined;
  category?: string | undefined;
  productId?: string | undefined;
  productName?: string | undefined;
};

type FormData = {
  filter?: string;
  sort?: string;
};
const ShopPage = () => {
  const routerParams = useParams<RouterParams>();
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [params, setParams] = useState<Params>();

  const dispatch = useAppDispatch();
  const categories: any = useAppSelector((state) => state.global.categories);
  const shoppingCart = useAppSelector((state) => state.shoppingCard.card);
  const { products, total }: any = useAppSelector((state) => state.product);

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

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { filter: routerParams.gender },
  });

  const fetchProductsHandler = (params = {}) => {
    setProductsLoading(true);
    dispatch(
      fetchProducts({
        params,
      })
    ).finally(() => {
      setTimeout(() => {
        setProductsLoading(false);
      }, 500);
    });
  };
  console.log(total);
  const onSubmit = (data: FormData) => {
    if (data.filter) {
      setParams({
        ...params,
        filter: data.filter,
        sort: data.sort,
      });
      fetchProductsHandler({ ...params, filter: data.filter, sort: data.sort });
    } else {
      setParams({ ...params, sort: data.sort });
      fetchProductsHandler({ ...params, sort: data.sort });
    }
  };

  useEffect(() => {
    setParams({
      category: routerParams.category_id,
      filter: routerParams.category_id ? "" : routerParams.gender,
    });
    fetchProductsHandler({
      category: routerParams.category_id,
      filter: routerParams.category_id ? "" : routerParams.gender,
    });
  }, [routerParams]);

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
        <div className="flex flex-wrap justify-center gap-5 xl:justify-between items-center px-[12%] py-20">
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
          <form
            className="m-auto lg:m-0 flex justify-center flex-wrap gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("filter")}
              placeholder={`Search in ${
                routerParams.category
                  ? routerParams.gender + " " + routerParams.category
                  : routerParams.gender
                  ? routerParams.gender
                  : "store"
              }`}
              className="w-full sm:w-44 h-14 pl-3 bg-stone-50 rounded-md border border-zinc-300 "
            />
            <select
              {...register("sort")}
              className="w-full sm:w-fit h-14 px-1 bg-stone-50 rounded-md border border-zinc-300 "
            >
              <option value="">Sort by: Featured</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>{" "}
            <button className="text-center text-white text-base font-normal font-['Montserrat'] leading-7 tracking-[0.2px] w-28 h-14 bg-sky-500 rounded-lg  border border-neutral-200">
              Filter
            </button>
          </form>
        </div>
        {productsLoading ? (
          <Icon icon="svg-spinners:180-ring" className="m-auto w-20 h-20" />
        ) : products.length === 0 ? (
          <p className="text-center text-rose-500 text-base font-bold font-['Montserrat']  tracking-[0.2px]">
            Ürün bulunamadı
          </p>
        ) : (
          <InfiniteScroll
            dataLength={pageNumber * 25}
            next={() =>
              dispatch(
                fetchMoreProducts({
                  params: { ...params, offset: 25 },
                })
              ).then(() => {
                setPageNumber(pageNumber + 1);
              })
            }
            hasMore={pageNumber * 25 < total ? true : false}
            loader={
              <Icon icon="svg-spinners:180-ring" className="m-auto w-20 h-20" />
            }
            className="flex flex-wrap gap-20 justify-around px-[7%] pb-20 lg:px-[12%]"
          >
            {products.map((product: any, i: number) => (
              <ProductCard
                key={i}
                product={product}
                categories={categories}
                shoppingCart={shoppingCart}
              />
            ))}
          </InfiniteScroll>
        )}
      </section>
      <Clients />
      <Footer />
    </>
  );
};

export default ShopPage;
