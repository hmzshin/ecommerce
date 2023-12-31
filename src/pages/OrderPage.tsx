import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { fetchAddress, saveAddress } from "../store/slices/addressSlice";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  surname: string;
  phone: number;
  city: string;
  district: string;
  neighborhood: string;
  address: string;
  title: string;
};

const OrderPage = () => {
  const [firstStep, setFirstStep] = useState<boolean>(true);
  const [isNewAddress, setIsNewAddress] = useState<boolean>(false);
  const [provinceData, setProvinceData] = useState<any[]>();
  const [provinces, setProvinces] = useState<string[]>();
  const [districts, setDistricts] = useState<string[]>([]);
  const [city, setCity] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.address.address);
  useEffect(() => {
    console.log("user address ", addresses);
  }, [addresses]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setIsNewAddress(false);
    dispatch(saveAddress(data));
  };

  const fetchProvinces = async () => {
    try {
      const response = await axiosInstance.get(
        "https://turkiyeapi.dev/api/v1/provinces"
      );
      const provinces = response.data.data.map(
        (province: any) => province.name
      );
      setProvinceData(response.data.data);
      setProvinces(provinces);
      console.log("async ", response.data.data);
    } catch (error) {
      toast.error("Can not download city information");
      throw error;
    }
  };

  useEffect(() => {
    const province = provinceData?.find((province) => province.name === city);
    const districts = province?.districts.map((district: any) => district.name);
    setDistricts(districts);
  }, [city]);

  useEffect(() => {
    dispatch(fetchAddress());
    fetchProvinces();
  }, []);
  return (
    <>
      <Header />
      <section id="orderDetails" className="flex lg:px-[7%] py-5">
        <div
          id="shoppingChart"
          className={`bg-neutral-50 py-10 border rounded-md flex flex-col w-full`}
        >
          <div className="justify-center gap-3  items-start flex flex-wrap  md:flex-nowrap">
            <div className="rounded-lg w-full md:w-2/3 pl-3 flex flex-col gap-2 items-center  self-stretch">
              <div className="text-center text-xl font-bold flex w-full">
                <div
                  className={`w-1/2 h-20 text-left border shadow-[0px_5px_0px_0px] ${
                    firstStep ? " shadow-sky-300" : "shadow-neutral-300"
                  }`}
                >
                  Address Information
                </div>
                <div
                  className={`w-1/2 h-20 text-left border shadow-[0px_5px_0px_0px]  ${
                    firstStep ? "shadow-neutral-300" : " shadow-sky-300"
                  }`}
                >
                  {" "}
                  Payment Options
                </div>
              </div>
              <p>Delivery Address</p>
              <div className="flex flex-wrap w-full gap-y-2 justify-between ">
                <div
                  className="rounded-lg bg-white p-1 sm:p-3 shadow-md flex justify-center items-center gap-3 w-full xl:w-[calc(50%-5px)] h-32 flex-wrap cursor-pointer"
                  onClick={() => setIsNewAddress(true)}
                >
                  <Icon icon="material-symbols:add" />
                  <p className="text-center font-bold p-1 font-['Montserrat'] rounded-t-md ">
                    Add New Address
                  </p>
                </div>
                {addresses.map((address, i: number) => (
                  <div
                    key={i}
                    className="rounded-lg bg-white p-1 sm:p-3 shadow-md flex flex-col justify-between items-center gap-3 w-full xl:w-[calc(50%-5px)]"
                  >
                    <div className="w-full">
                      <p className="text-left font-bold p-1 pl-5 text-sky-50 font-['Montserrat'] bg-[#176B87] rounded-t-md">
                        {address.title}
                      </p>
                      <p className="text-center p-1 font-bold rounded-b-md font-['Montserrat'] bg-sky-100">
                        {address.user_id}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white p-1 sm:p-3  flex justify-between items-center gap-3 w-full">
                      <div className="ml-4  flex flex-col lg:flex-row gap-5 w-full  justify-between">
                        <div className="mt-1 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">
                            {}
                          </h2>
                          <p className="text-lg h-14 test-sm overflow-hidden text-gray-700">
                            {address.name}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap justify-between lg:justify-end gap-3 xl:space-y-6 xl:mt-0 xl:block "></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-full w-full rounded-lg border max-h-[500px] bg-white p-6 shadow-md md:mt-0 md:w-1/3 ">
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
            </div>
          </div>
        </div>

        {isNewAddress && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-neutral-800 bg-opacity-25 z-10 flex items-center justify-center ">
            <form
              ref={formRef}
              className="mx-auto w-full max-w-xl bg-white p-10  border shadow-lg rounded-xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-5 relative">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Name
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "The name must be at least three characters.",
                      },
                    })}
                    placeholder="Enter your name"
                    className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none ${
                      errors.name
                        ? "focus:border-red-400 border-red-400"
                        : "focus:border-sky-500 border-[#e0e0e0]"
                    } focus:shadow-md `}
                  />
                </label>
                {errors.name && (
                  <p
                    role="alert"
                    className="text-red-400 absolute top-0 right-0"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mb-5 relative">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Surname
                  <input
                    type="text"
                    {...register("surname", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "The name must be at least three characters.",
                      },
                    })}
                    placeholder="Enter your name"
                    className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none ${
                      errors.name
                        ? "focus:border-red-400 border-red-400"
                        : "focus:border-sky-500 border-[#e0e0e0]"
                    } focus:shadow-md `}
                  />
                </label>
                {errors.surname && (
                  <p
                    role="alert"
                    className="text-red-400 absolute top-0 right-0"
                  >
                    {errors.surname.message}
                  </p>
                )}
              </div>

              <div className="mb-5 relative">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Phone Number
                  <input
                    type="tel"
                    {...register("phone", {
                      pattern: {
                        value: /^(\+90|90|)?\d{10}$/,
                        message: "Enter a valid number",
                      },
                    })}
                    placeholder="Enter your phone number"
                    className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none ${
                      errors.phone
                        ? "focus:border-red-400 border-red-400"
                        : "focus:border-sky-500 border-[#e0e0e0]"
                    } focus:shadow-md `}
                  />
                </label>
                {errors.phone && (
                  <p
                    role="alert"
                    className="text-red-400 absolute top-0 right-0"
                  >
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  City <span className="text-sm">(Optional)</span>
                  <select
                    {...register("city")}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none focus:border-sky-500 focus:shadow-md"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  >
                    <option value="">Chose a City</option>
                    {provinces?.map((city, i) => (
                      <option key={i} value={city}>
                        {" "}
                        {city}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  District
                  <select
                    {...register("district")}
                    className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none focus:border-sky-500 border-[#e0e0e0] focus:shadow-md `}
                  >
                    {districts?.map((district, i) => (
                      <option key={i} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Neighborhood
                  <input
                    type="text"
                    {...register("neighborhood")}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none focus:border-sky-500 focus:shadow-md"
                  />{" "}
                </label>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Address
                  <input
                    type="text"
                    {...register("address")}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none focus:border-sky-500 focus:shadow-md"
                  />
                </label>
              </div>
              <div className="mb-5 relative">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Address Title
                  <input
                    type="text"
                    {...register("title", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "The name must be at least three characters.",
                      },
                    })}
                    placeholder="Enter your name"
                    className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none ${
                      errors.name
                        ? "focus:border-red-400 border-red-400"
                        : "focus:border-sky-500 border-[#e0e0e0]"
                    } focus:shadow-md `}
                  />
                </label>
              </div>
              <button
                className={`hover:bg-sky-400 w-full rounded-md bg-sky-500 py-3 px-8 text-center text-base font-semibold text-white outline-none `}
              >
                Add Address
              </button>
            </form>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default OrderPage;
