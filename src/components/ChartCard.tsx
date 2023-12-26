interface ChartCardProps {
  isChartVisible: boolean;
}
const ChartCard: React.FC<ChartCardProps> = ({
  isChartVisible,
}: ChartCardProps) => {
  return (
    <>
      {true && (
        <div
          id="shoppingChart"
          className={`absolute top-[calc(100%+35px)] right-0 lg:right-20 w-[350px] sm:w-[500px] md:w-[700px] bg-gray-100 px-3 pb-3 border shadow-2xl rounded-md ${
            isChartVisible ? "activeChart" : "passiveChart"
          } transition-all duration-500 overflow-hidden`}
        >
          <h1 className="py-3 sm:py-5 text-center text-xl font-bold">
            Cart Items
          </h1>
          <div className="justify-center gap-3  items-start flex flex-wrap md:flex-nowrap">
            <div className="rounded-lg md:w-2/3 flex flex-col  gap-2 max-h-72 md:max-h-96  items-center overflow-auto self-stretch">
              {[1, 2, 3, 3, 3, 3].map(() => (
                <div className="rounded-lg bg-white p-1 sm:p-3 shadow-md flex justify-between items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80"
                    alt="product-image"
                    className="w-[90px] rounded-lg sm:w-32 h-full"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between sm:gap-2">
                    <div className="mt-1 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        Nike Air Max 2019
                      </h2>
                    </div>
                    <div className="mt-4 flex justify-between gap-3 sm:space-y-6 sm:mt-0 sm:block ">
                      <div className="flex items-center border-gray-100">
                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-sky-500 hover:text-blue-50">
                          {" "}
                          -{" "}
                        </span>
                        <p className="h-8 w-8 border bg-white text-center text-base outline-none flex items-center justify-center">
                          3
                        </p>
                        <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-sky-500 hover:text-blue-50">
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm">259.000 $</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-full w-full rounded-lg border max-h-[500px] bg-white p-6 shadow-md md:mt-0 md:w-1/3 ">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">$129.99</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$4.99</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-sky-500 py-1.5 font-medium text-blue-50 hover:bg-sky-400">
                Check out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChartCard;
