const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col items-center gap-7 w-56 border hover:shadow-2xl hover:scale-[1.05] transition-all duration-300">
      <img src={product.img} className="w-full" />
      <div className="flex flex-col items-center gap-4 pb-3">
        <p className="text-center text-slate-800 text-xl font-bold font-['Montserrat'] leading-normal tracking-tight">
          {product.name}
        </p>
        <p className="text-center text-neutral-500 text-base font-bold font-['Montserrat'] leading-normal tracking-tight">
          {product.description}
        </p>
        <p className="text-stone-300 text-xl font-bold font-['Montserrat'] leading-normal tracking-tight flex justify-center gap-2">
          <span>{product.price}</span>
          <span className="text-teal-700">{product.priceDiscount}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
