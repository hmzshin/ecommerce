import BestSellerProductCard from "../components/BestsellerProductCard-product";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductDetailCard from "../components/ProductDetailCard";

import { productRelatedBestsellers } from "../data";

const product = {};
const ProductPage = () => {
  return (
    <>
      <Header />
      <ProductDetailCard product={product} />
      <section id="bestsellers">
        <div className=" flex flex-col items-center gap-20 px-[15%] py-20">
          <div className=" flex flex-wrap gap-10 justify-around">
            {productRelatedBestsellers.map((bsProduct) => (
              <BestSellerProductCard bsProduct={bsProduct} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductPage;
