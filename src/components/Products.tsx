import icon1 from "../assets/products/icon1.svg";
import icon2 from "../assets/products/icon2.svg";

import { shopProducts } from "../data";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <section id="products">
      <div className="flex flex-wrap justify-center gap-5 md:justify-between items-center px-[15%] py-20">
        <p className="text-neutral-500 text-base font-bold font-['Montserrat']  tracking-[0.2px]">
          Showing all 12 results
        </p>
        <div className="flex gap-5 items-center">
          <p className="text-neutral-500 text-base font-bold font-['Montserrat']  tracking-[0.2px]">
            Views:
          </p>
          <div className="w-12 h-12 p-4 rounded-md border border-gray-200 ">
            <img src={icon1} />
          </div>
          <div className="w-12 h-12 p-4 rounded-md border border-gray-200 ">
            <img src={icon2} />
          </div>
        </div>
        <form className="m-auto lg:m-0">
          <select className="w-40 h-14 bg-stone-50 rounded-md border border-zinc-300 pl-8">
            <option value="product">Product</option>
          </select>{" "}
          <button className="text-center text-white text-base font-normal font-['Montserrat'] leading-7 tracking-[0.2px] w-28 h-14 bg-sky-500 rounded-lg  border border-neutral-200">
            Filter
          </button>
        </form>
      </div>
      <div className=" flex flex-wrap gap-20 justify-around px-[7%] lg:px-[12%]">
        {shopProducts.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>

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
  );
};

export default Products;
