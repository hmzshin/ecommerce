import Clients from "../components/Clients";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBestseller } from "../store/slices/bestsellerSlice";
import ProductCard from "../components/ProductCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchProduct, resetProduct } from "../store/slices/productSlice";
import Thumb from "../components/Thumb";
import { addProduct } from "../store/slices/shoppingCardSlice";
import detailImg from "../assets/productDetail/detailImage.jpeg";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const routerParams = useParams();
  const product = useAppSelector((state) => state.product.product);
  const shoppingCart = useAppSelector((store) => store.shoppingCard.card);
  const categories = useAppSelector((store) => store.global.categories);
  const productRelatedBestsellers = useAppSelector(
    (state) => state.bestseller.products
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ratingArray: number[] = [];
  const int = parseInt(String(product.rating));
  for (let i = 1; i < 6; i++) {
    if (i <= product.rating) {
      ratingArray.push(i);
    } else if (i - 1 < product.rating) {
      ratingArray.push(product.rating % int);
    } else {
      ratingArray.push(0);
    }
  }

  function cleanupFunction() {
    dispatch(
      resetProduct({
        id: 0,
        name: "",
        description: "",
        price: 0,
        stock: 0,
        store_id: 0,
        category_id: 0,
        rating: 0,
        sell_count: 0,
        images: [],
      })
    );
  }
  useEffect(() => {
    dispatch(fetchProduct(routerParams.productId))
      .unwrap()
      .then(async () => {
        return dispatch(
          fetchBestseller({
            params: {
              category: routerParams.category_id,
              sort: "rating:desc",
              limit: 24,
            },
          })
        )
          .unwrap()
          .catch((error) => {
            toast.error(
              "An unexpected problem occurred while loading the product. Please refresh the page."
            );
            throw error;
          })
          .finally(() => setProductsLoading(false));
      })
      .catch((error) => {
        toast.error(
          "An unexpected problem occurred while loading the product. Please refresh the page."
        );
        throw error;
      });

    window.scrollTo(0, 0);
    return cleanupFunction;
  }, [routerParams]);

  return product.name ? (
    <>
      <section id="productDatails " className="pb-20">
        <section className="bg-neutral-50 flex justify-between items-center py-10 px-[15%]">
          <div className="flex gap-5 items-center">
            <Icon
              icon="mdi:arrow-left"
              className="w-7 h-7 text-balck-400 font-bold"
              onClick={() => navigate(-1)}
            />
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

        <section className="flex flex-wrap justify-around gap-20 bg-neutral-50 px-[5%] pb-20 2xl:justify-center">
          <Thumb images={product.images} />
          <div className="max-w-lg flex flex-col items-start ">
            <p className="text-slate-800 text-2xl font-normal font-['Montserrat']  tracking-[0.2px]">
              {product.name}
            </p>
            <div className="flex items-center py-5 ">
              {ratingArray.map((int, i) =>
                int >= 1 ? (
                  <Icon
                    key={i}
                    className="text-[#F3CD03] w-6 h-6"
                    icon="mdi:star"
                  />
                ) : int == 0 ? (
                  <Icon
                    key={i}
                    className="text-[#F3CD03] w-6 h-6"
                    icon="mdi:star-outline"
                  />
                ) : (
                  <Icon
                    key={i}
                    className="text-[#F3CD03] w-6 h-6"
                    icon="mdi:star-half-full"
                  />
                )
              )}

              <p className=" text-neutral-500 font-bold text-base font-['Montserrat'] tracking-[0.2px] pl-3">
                10 Reviews
              </p>
            </div>
            <p className="text-center text-slate-800 text-2xl font-bold font-['Montserrat']  tracking-tight">
              {product.price} $
            </p>
            <p className="text-neutral-500 text-base font-bold font-['Montserrat']  tracking-tight pt-3">
              Availability :{" "}
              <span className="text-sky-500 ">
                {product.stock === 0 ? "Not in Stock" : "In Stock"}{" "}
              </span>
            </p>
            <p className="text-zinc-500 text-base font-normal font-['Montserrat']  tracking-tight pt-10">
              {product.description}
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

            <div className="flex gap-3 md:gap-5 pt-10">
              <div
                className="blueBtn cursor-pointer active:bg-sky-600"
                onClick={() => dispatch(addProduct(product))}
              >
                Add to Cart
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
        <section className="flex  justify-around items-center py-20 lg:justify-center lg:gap-20">
          <p className="text-center text-neutral-500 text-sm md:text-lg font-semibold font-['Montserrat'] tracking-tight">
            Description
          </p>
          <p className="text-center text-neutral-500 text-sm md:text-lg font-semibold font-['Montserrat'] tracking-tight whitespace-nowrap">
            Additional Information
          </p>
          <p className="flex text-center text-neutral-500 text-sm md:text-lg font-semibold font-['Montserrat'] tracking-tight md:block">
            Reviews <span className="text-teal-700 ">(0)</span>
          </p>
        </section>

        <section className=" flex flex-wrap justify-center gap-10 px-[12%] xl:flex-nowrap">
          <div className="rounded-lg shadow-[10px_10px_0px_0px] shadow-stone-300 xl:w-1/3 ">
            {" "}
            <img
              src={detailImg}
              className=" w-full h-full rounded-lg object-cover object-center"
            />
          </div>
          <div className="flex flex-wrap justify-between xl:w-2/3 xl:flex-nowrap">
            <div className="flex flex-col gap-10 sm:w-[calc(50%-10px)]">
              <p className="text-slate-800 text-2xl font-bold font-['Montserrat']  tracking-tight">
                the quick fox jumps over{" "}
              </p>
              <p className="text-neutral-500 text-sm font-normal font-['Montserrat'] tracking-tight">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met. <br /> <br />
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
                <br /> <br />
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>
            </div>
            <div className="sm:w-[calc(50%-10px)]">
              <p className="text-slate-800 text-2xl font-bold font-['Montserrat']  tracking-tight">
                the quick fox jumps over{" "}
              </p>
              <div className="flex flex-col gap-3 pt-10">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-5 items-center">
                    <Icon icon="iconamoon:arrow-right-2-thin" />
                    <p className="text-neutral-500 text-sm font-normal font-['Montserrat']  tracking-tight">
                      the quick fox jumps over the lazy dog
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-slate-800 text-2xl font-bold font-['Montserrat']  tracking-tight  py-10">
                the quick fox jumps over{" "}
              </p>
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-5 items-center">
                    <Icon icon="iconamoon:arrow-right-2-thin" />
                    <p className="text-neutral-500 text-sm font-normal font-['Montserrat']  tracking-tight">
                      the quick fox jumps over the lazy dog
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
      <section id="bestsellers" className="px-[15%] py-20 bg-neutral-50 ">
        <p className=" text-slate-800 text-2xl font-bold font-['Montserrat'] tracking-tight">
          BESTSELLER PRODUCTS
        </p>
        <div className=" flex flex-col items-center gap-20 pt-20">
          {productsLoading ? (
            <Icon icon="svg-spinners:180-ring" className="m-auto w-20 h-20" />
          ) : (
            <div className=" flex flex-wrap gap-10 justify-around">
              {productRelatedBestsellers.map((bsProduct, i) => (
                <ProductCard
                  key={i}
                  product={bsProduct}
                  categories={categories}
                  shoppingCart={shoppingCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <Clients bgColor={"bg-neutral-50"} />
    </>
  ) : (
    <Icon icon="svg-spinners:180-ring" className="m-auto w-20 h-20" />
  );
};

export default ProductPage;
