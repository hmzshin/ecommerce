import { Link } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  return (
    <Link
      to={`/product`}
      className="flex flex-col items-center border gap-7 w-72  hover:shadow-2xl hover:scale-[1.01] transition-all pb-5"
    >
      <img src={product.img} className="w-72 " />
      <div className="flex flex-col items-center gap-4 pb-3">
        <p className="text-center text-slate-800 text-xl font-bold font-['Montserrat'] tracking-[.0.2px]">
          {product.name}
        </p>
        <p className="text-center text-neutral-500 text-base font-bold font-['Montserrat'] tracking-[0.02px]">
          {product.description}
        </p>
        <p className="text-stone-300 text-xl font-bold font-['Montserrat'] tracking-[0.02px] flex justify-center gap-2">
          <span>{product.price}</span>
          <span className="text-teal-700">{product.priceDiscount}</span>
        </p>
        <div className="flex justify-start items-center gap-2">
          {product.colors.map((color: any, i: number) => (
            <div key={i} className={`w-4 h-4 ${color} rounded-full`} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
