import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchOrders } from "../store/slices/ordersSlice";
import { formatDistanceToNow } from "date-fns";

const SuccessPage = () => {
  const orders = useAppSelector((store) => store.orders.orders);
  const dispatch = useAppDispatch();

  function beautify(date: string) {
    const formatString = formatDistanceToNow(date);
    const capital = formatString[0].toUpperCase();
    const finalString = formatString.replace(formatString[0], capital);
    return finalString;
  }

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <section
      id="orders"
      className={`bg-gray-100 px-3 pb-5 border shadow-2xl rounded-md flex flex-col `}
    >
      <p className="py-3 sm:py-5 text-center text-xl font-bold">Orders</p>
      <div className="justify-center gap-3  items-start flex flex-wrap lg:px-[7%] md:flex-nowrap">
        <div className="rounded-lg w-full 2xl:w-2/3 flex flex-col  gap-5  items-center  self-stretch">
          {[...orders]
            .sort((a, b) => Date.parse(b.order_date) - Date.parse(a.order_date))
            .map((item, i) => (
              <div
                key={i}
                className="rounded-lg bg-white p-1 sm:p-3 shadow-md flex justify-between items-center gap-3 w-full h-full"
              >
                <div className="mt-1 sm:mt-0">
                  <p className="text-base font-bold text-gray-900 text-left">
                    {`Order Number: ${item.id}`}
                  </p>
                  <p>{`${beautify(item.order_date)} ago.`}</p>
                </div>
                <div className="flex justify-between w-1/2">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                      color="#87CEEB"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12 21a9 9 0 0 0 7.51-13.961l-7.155 7.95a2 2 0 0 1-2.687.262L6.4 12.8a1 1 0 0 1 1.2-1.6l3.268 2.451l7.346-8.161A9 9 0 1 0 12 21"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Order is completed</p>
                  </div>

                  <div className="mt-4 flex justify-between gap-3 sm:space-y-6 sm:mt-0 sm:block ">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm whitespace-nowrap w-20 text-[#176B87]">
                        {item.price} $
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
