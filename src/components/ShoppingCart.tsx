import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addProduct,
  decreaseNumberOfItems,
  deleteProduct,
} from "../store/slices/shoppingCardSlice";
import { useNavigate } from "react-router-dom";

interface CardProps {
  isChartVisible: boolean;
  setIsChartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShoppingCart: React.FC<CardProps> = ({
  isChartVisible,
  setIsChartVisible,
}: CardProps) => {
  const navigate = useNavigate();
  const shoppingCart = useAppSelector((store) => store.shoppingCard.card);
  const dispatch = useAppDispatch();

  return (
    <div
      id="shoppingChart"
      className={`absolute top-[calc(100%+35px)] right-0 lg:right-20 w-[400px] sm:w-[500px]  bg-gray-100 px-3 pb-3 border shadow-2xl rounded-md ${
        isChartVisible ? "activeChart" : "passiveChart"
      } transition-all duration-300 overflow-hidden`}
    >
      <h1 className="py-3 sm:py-5 text-center text-xl font-bold">Cart Items</h1>
      <div className="justify-center gap-3 w-full  items-start flex flex-wrap ">
        <div className="rounded-lg  flex flex-col  gap-2 max-h-72 md:max-h-96  items-center overflow-y-auto self-stretch w-full">
          {shoppingCart.map((item, i) => (
            <div
              key={i}
              className="rounded-lg bg-white p-1 sm:p-3 shadow-md flex justify-start items-center gap-3 w-full"
            >
              <img
                src={item.product.images[0]["url"]}
                alt="product-image"
                className="w-[90px] rounded-lg sm:w-32 h-28 object-center object-cover "
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between sm:gap-2">
                <div className="mt-1 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900 text-left">
                    {item.product.name}
                  </h2>
                </div>
                <div className="mt-4 flex justify-between gap-3 sm:space-y-6 sm:mt-0 sm:block ">
                  <div className="flex items-center border-gray-100">
                    <span
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-sky-500 hover:text-blue-50"
                      onClick={() => dispatch(decreaseNumberOfItems(item))}
                    >
                      {" "}
                      -{" "}
                    </span>
                    <p className="h-8 w-8 border bg-white text-center text-base outline-none flex items-center justify-center">
                      {item.numberOfItem}
                    </p>
                    <span
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-sky-500 hover:text-blue-50"
                      onClick={() => dispatch(addProduct(item.product))}
                    >
                      {" "}
                      +{" "}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm whitespace-nowrap w-20">
                      {(item.numberOfItem * item.product.price).toFixed(2)} $
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="blueBtn w-full"
          onClick={() => {
            setIsChartVisible(false);
            navigate("/cart");
          }}
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
