import { Link } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  return (
    <Link
      to={`/product`}
      className="flex flex-col items-center border gap-5 w-[350px]  lg:w-72  hover:shadow-2xl hover:scale-[1.01] transition-all "
    >
      <img
        src={product.images[0]["url"]}
        className="w-full h-full object-cover object-center"
      />
      <div className="flex flex-col items-center gap-4 pb-3 px-1">
        <p className="text-center text-slate-800 text-xl font-bold font-['Montserrat'] tracking-[.0.2px]">
          {product.name}
        </p>
        <p className="text-center text-neutral-500 text-base font-bold font-['Montserrat'] tracking-[0.02px]">
          {product.description}
        </p>
        <p className="text-stone-300 text-xl font-bold font-['Montserrat'] tracking-[0.02px] flex justify-center gap-2">
          <span className="text-teal-700">{product.price}$</span>
        </p>
        <div className="flex justify-start items-center gap-2">
          {product.colors?.map((color: any, i: number) => (
            <div key={i} className={`w-4 h-4 ${color} rounded-full`} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
