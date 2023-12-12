import BestSellerProductCard from "../components/BestsellerProductCard-product";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductDetail from "../components/ProductDetail";

import { productRelatedBestsellers } from "../data";
import Clients from "../components/Clients";

const product = {};
const ProductPage = () => {
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
            {productRelatedBestsellers.map((bsProduct) => (
              <BestSellerProductCard bsProduct={bsProduct} />
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
