import BestSellerProductCard from "../components/BestsellerProductCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductDetail from "../components/ProductDetail";

import { productRelatedBestsellers } from "../data";
import Clients from "../components/Clients";
import { useAppSelector } from "../store/store";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const routerParams = useParams();
  const products = useAppSelector((state) => state.product.products);
  const product = products.filter(
    (product: any) => product.id == routerParams.productId
  )[0];

  console.log(product);
  return (
    <>
      <Header />
      <ProductDetail product={product} />
      <section id="bestsellers" className="px-[15%] py-20 bg-neutral-50 ">
        <p className=" text-slate-800 text-2xl font-bold font-['Montserrat'] tracking-tight">
          BESTSELLER PRODUCTS
        </p>
        <div className=" flex flex-col items-center gap-20 pt-20">
          <div className=" flex flex-wrap gap-10 justify-around">
            {productRelatedBestsellers.map((bsProduct, i) => (
              <BestSellerProductCard
                key={i}
                bsProduct={bsProduct}
                style={"w-72"}
              />
            ))}
          </div>
        </div>
      </section>
      <Clients bgColor={"bg-neutral-50"} />
      <Footer bgColor={"bg-white"} />
    </>
  );
};

export default ProductPage;
