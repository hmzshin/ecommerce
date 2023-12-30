import { Link } from "react-router-dom";
import slugify from "slugify";
import { useAppDispatch } from "../store/store";
import { addProduct, deleteProduct } from "../store/slices/shoppingCardSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
const ProductCard = ({ product, categories, shoppingCart }: any) => {
  const category: any = categories.filter(
    (category: any) => category.id === product.category_id
  )[0];

  const productInCart = shoppingCart.find(
    (item: any) => item.product.id === product.id
  );

  const dispatch = useAppDispatch();

  const slug = slugify(product.name, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "tr", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
  function addToChart(product: any) {
    dispatch(addProduct(product));
  }

  return (
    <div className="border hover:shadow-2xl hover:scale-[1.01]  transition-all flex flex-col items-center justify-between pb-3 relative">
      {productInCart && (
        <div
          className="absolute top-3 left-0 cursor-pointer"
          onClick={() => {
            dispatch(deleteProduct(productInCart));
          }}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full border bg-white absolute -top-1 left-2 "></div>
            <Icon
              icon="material-symbols-light:shopping-cart-outline"
              className="w-8 h-8 text-black-500 font-bold absolute z-10 left-4 top-2"
            />
            <span className="absolute w-4 h-4 left-[24px] -top-[0px] text-xs rounded-full bg-rose-200 flex items-center justify-center">
              {productInCart?.numberOfItem}
            </span>
          </div>
        </div>
      )}
      <Link
        to={`/shop/${product.category_id}/${
          category?.gender === "k" ? "kadın" : "erkek"
        }/${category?.title?.toLowerCase()}/${product.id}/${slug}`}
        className="flex flex-col items-center gap-5 w-[350px] lg:w-72   "
      >
        <img
          src={product.images[0]["url"]}
          className="w-full h-80 object-cover object-center"
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
      <button
        onClick={() => addToChart(product)}
        className="blueBtn active:bg-sky-600"
      >
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

export default ProductCard;
