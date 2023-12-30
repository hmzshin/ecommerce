import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const OrderPage = () => {
  const [firstStep, setFirstStep] = useState<boolean>(true);
  return (
    <>
      <Header />
      <section id="orderDetails" className="flex lg:px-[12%] py-5">
        <table
          id="shoppingChart"
          className={`bg-neutral-50 py-10 border rounded-md flex flex-col w-full`}
        >
          <tbody className="justify-center gap-3  items-start flex flex-wrap  md:flex-nowrap">
            <td className="rounded-lg w-full md:w-2/3 flex flex-col gap-2 items-center  self-stretch">
              <tr className="text-center text-xl font-bold flex w-full">
                <td
                  className={`w-1/2 h-20 text-left border shadow-[0px_5px_0px_0px] ${
                    firstStep ? " shadow-sky-300" : "shadow-neutral-300"
                  }`}
                >
                  adres bilgileri
                </td>
                <td
                  className={`w-1/2 h-20 text-left border shadow-[0px_5px_0px_0px]  ${
                    firstStep ? "shadow-neutral-300" : " shadow-sky-300"
                  }`}
                >
                  {" "}
                  ödeme seçenekleri
                </td>
              </tr>

              {[1, 2, 3].map((item) => (
                <tr
                  key={item}
                  className="rounded-lg bg-white p-1 sm:p-3 shadow-md flex flex-col justify-between items-center gap-3 w-full"
                >
                  <td className="w-full">
                    <p className="text-left font-bold p-1 pl-5 text-sky-50 font-['Montserrat'] bg-[#176B87] rounded-t-md"></p>
                    <p className="text-center p-1 font-bold rounded-b-md font-['Montserrat'] bg-sky-100"></p>
                  </td>
                  <td className="rounded-lg bg-white p-1 sm:p-3  flex justify-between items-center gap-3 w-full">
                    <div className="ml-4  flex flex-col lg:flex-row gap-5 w-full  justify-between">
                      <div className="mt-1 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{}</h2>
                        <p className="text-lg h-14 test-sm overflow-hidden text-gray-700">
                          {}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap justify-between lg:justify-end gap-3 xl:space-y-6 xl:mt-0 xl:block "></div>
                    </div>
                  </td>
                </tr>
              ))}
            </td>

            <td className="h-full w-full rounded-lg border max-h-[500px] bg-white p-6 shadow-md md:mt-0 md:w-1/3 ">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">{} $</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">{} $</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">{} $</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button
                className="mt-6 w-full rounded-md bg-sky-500 py-1.5 font-medium text-blue-50 hover:bg-sky-400"
                onClick={() => setFirstStep(!firstStep)}
              >
                Proceed to checkout
              </button>
            </td>
          </tbody>
        </table>
      </section>
      <Footer />
    </>
  );
};

export default OrderPage;
