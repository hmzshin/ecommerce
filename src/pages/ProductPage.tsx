import ProductDetail from "../components/ProductDetail";

import Clients from "../components/Clients";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBestseller } from "../store/slices/bestsellerSlice";
import ProductCard from "../components/ProductCard";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProductPage = () => {
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const routerParams = useParams();
  const products = useAppSelector((state) => state.product.products);
  const shoppingCart = useAppSelector((store) => store.shoppingCard.card);
  const categories = useAppSelector((store) => store.global.categories);
  const productRelatedBestsellers = useAppSelector(
    (state) => state.bestseller.products
  );
  const dispatch = useAppDispatch();
  const product = [...products, ...productRelatedBestsellers].filter(
    (product) => product.id === Number(routerParams.productId)
  )[0];

  console.log(routerParams);

  useEffect(() => {
    setProductsLoading(true);
    dispatch(
      fetchBestseller({
        params: {
          category: product.category_id,
          sort: "rating:desc",
          limit: 24,
        },
      })
    ).finally(() => setProductsLoading(false));
  }, []);

  return (
    <>
      <ProductDetail product={product} />
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
  );
};

export default ProductPage;
