const BestSellerProductCard = ({ bsProduct }) => {
  return (
    <div className="flex flex-col w-72 items-center gap-7 border hover:shadow-2xl hover:scale-[1.02] transition-all ">
      <img
        src={bsProduct.img}
        className="w-full h-full object-cover object-bottom"
      />
      <div className="flex flex-col items-center gap-4 pb-3">
        <p className="text-center text-slate-800 text-xl font-bold font-['Montserrat'] tracking-[0.2px]">
          {bsProduct.name}
        </p>
        <p className="text-center text-neutral-500 text-base font-bold font-['Montserrat'] tracking-[0.2px]">
          {bsProduct.description}
        </p>
        <p className="text-stone-300 text-xl font-bold font-['Montserrat'] tracking-[0.2px] flex justify-center gap-2">
          <span>{bsProduct.price}</span>
          <span className="text-teal-700">{bsProduct.priceDiscount}</span>
        </p>
      </div>
    </div>
  );
};

export default BestSellerProductCard;
