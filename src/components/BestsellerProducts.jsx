import { products } from "../data";
import ProductCard from "./ProductCard";
const BestsellerProducts = () => {
  return (
    <section id="bestsellers">
      <div className=" flex flex-col items-center gap-20 px-[15%] py-20">
        <div className="inline-flex flex-col justify-start items-center gap-2.5 ">
          <p className="text-center text-neutral-500 text-xl font-normal font-['Montserrat'] leading-loose tracking-tight">
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
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
        <div className="w-64 h-14 px-10 py-4 rounded-md border border-sky-500 flex-col justify-start items-center gap-2.5 inline-flex">
          <p className="text-center text-sky-500 text-sm font-bold font-['Montserrat'] leading-snug tracking-tight">
            LOAD MORE PRODUCTS
          </p>
        </div>
      </div>
    </section>
  );
};

export default BestsellerProducts;
