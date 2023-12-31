import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addProduct,
  decreaseNumberOfItems,
  deleteProduct,
} from "../store/slices/shoppingCardSlice";
import { useNavigate } from "react-router-dom";

const ShoppingCartPage = () => {
  const [subTotal, setSubtotal] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(15);
  const [totalPrice, setTotalPrice] = useState<number>();
  const shoppingCart = useAppSelector((store) => store.shoppingCard.card);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const total: number = shoppingCart.reduce(
      (sum, item) => sum + item.numberOfItem * item.product.price,
      0
    );

    const shipping: number = shoppingCart.reduce(
      (sum, item) => sum + item.shipping,
      0
    );
    setSubtotal(Number(total.toFixed(2)));
    setShipping(shipping);
  }, [shoppingCart]);

  useEffect(() => {
    setTotalPrice(Number((subTotal + shipping).toFixed(2)));
  }, [subTotal, shipping]);

  return (
    <>
      <Header />
      <section
        id="shoppingChart"
        className={`bg-gray-100 px-3 pb-3 border shadow-2xl rounded-md flex flex-col `}
      >
        <p className="py-3 sm:py-5 text-center text-xl font-bold">Cart Items</p>
        <div className="justify-center gap-3  items-start flex flex-wrap lg:px-[12%] md:flex-nowrap">
          <div className="rounded-lg w-full md:w-2/3 flex flex-col  gap-2  items-center  self-stretch">
            {shoppingCart.map((item, i) => (
              <div
                key={i}
                className="rounded-lg bg-white p-1 sm:p-3 shadow-md flex flex-col justify-between items-center gap-3 w-full"
              >
                <div className="w-full">
                  <p className="text-left font-bold p-1 pl-5 text-sky-50 font-['Montserrat'] bg-[#176B87] rounded-t-md">
                    {`Seller: ${item.product.store_id}`}
                  </p>
                  <p className="text-center p-1 font-bold rounded-b-md font-['Montserrat'] bg-sky-100">
                    {item.shipping === 0
                      ? ` Free Shipping`
                      : `Shipping:  ${item.shipping} $`}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-1 sm:p-3  flex justify-between items-center gap-3 w-full">
                  <img
                    src={item.product.images[0]["url"]}
                    alt="product-image"
                    className=" rounded-lg sm:w-40 h-52 object-center object-cover "
                  />
                  <div className="ml-4  flex flex-col lg:flex-row gap-5 w-full  justify-between">
                    <div className="mt-1 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.product.name}
                      </h2>
                      <p className="text-lg h-14 test-sm overflow-hidden text-gray-700">
                        {item.product.description}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-between lg:justify-end gap-3 xl:space-y-6 xl:mt-0 xl:block ">
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
                      <div className="flex items-center space-x-2 ">
                        <p className=" text-gray-700 font-bold w-20 whitespace-nowrap">
                          {(item.numberOfItem * item.product.price).toFixed(2)}{" "}
                          $
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
              </div>
            ))}
          </div>

          <div className="sticky top-0 h-full w-full rounded-lg border max-h-[500px] bg-white p-6 shadow-md md:mt-0 md:w-1/3 ">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">{subTotal} $</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">{shipping} $</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">{totalPrice} $</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button
              className="mt-6 w-full rounded-md bg-sky-500 py-1.5 font-medium text-blue-50 hover:bg-sky-400"
              onClick={() => navigate("/order")}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ShoppingCartPage;
