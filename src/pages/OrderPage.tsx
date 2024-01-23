import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { fetchAddress, saveAddress } from "../store/slices/addressSlice";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-toastify";
import { setAddressInfo } from "../store/slices/shoppingCardSlice";
import { fetchCards, saveCard } from "../store/slices/paymentSlice";
import { AxiosResponse } from "axios";

type FormDataAddress = {
  name: string;
  surname: string;
  phone: number;
  city: string;
  district: string;
  neighborhood: string;
  address: string;
  title: string;
};
type FormDataCard = {
  card_no: number;
  ccv: number;
  exp_date: string;
  name: string;
};
type CardInfo = {
  card_no: number;
  ccv: number;
  expire_month: string;
  expire_year: string;
  name_on_card: string;
};
const OrderPage = () => {
  const [firstStep, setFirstStep] = useState<boolean>(true);
  const [isNewAddress, setIsNewAddress] = useState<boolean>(false);
  const [addNewCard, setAddNewCard] = useState<boolean>(false);
  const [provinceData, setProvinceData] = useState<any[]>();
  const [provinces, setProvinces] = useState<string[]>();
  const [districts, setDistricts] = useState<string[]>([]);
  const [activeAddress, setActiveAddress] = useState<string>();
  const [activeBillingAddress, setActiveBillingAddress] = useState<string>();
  const [city, setCity] = useState<string>("default");
  const [activeCard, setActiveCard] = useState<CardInfo>();
  const formRef = useRef<HTMLFormElement>(null);
  const cardFormRef = useRef<HTMLFormElement>(null);
  const addRef = useRef<HTMLDivElement>(null);
  const addCardRef = useRef<HTMLLIElement>(null);
  const dispatch = useAppDispatch();
  const userToken = useAppSelector((state) => state.user.token);
  const addresses = useAppSelector((state) => state.address.address);
  const cards = useAppSelector((state) => state.payment.cards);
  const payment = useAppSelector((state) => state.shoppingCard.payment);
  const productsInCart = useAppSelector((state) => state.shoppingCard.card);

  const shippingAddress = useAppSelector(
    (state) => state.shoppingCard.address.shipping
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataAddress>();
  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    formState: { errors: errorsCard },
  } = useForm<FormDataCard>();

  function handleCityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setValue("city", selectedCity, { shouldValidate: true });
  }
  function onSubmit(data: FormDataAddress) {
    setIsNewAddress(false);
    dispatch(saveAddress(data));
  }

  function onSubmitCard(data: FormDataCard) {
    setAddNewCard(false);
    const date = data.exp_date.split("/");
    const expire_month = date[0];
    const expire_year = date[1];
    console.log("On submit çalışıyor");
    dispatch(
      saveCard({
        card_no: String(data.card_no),
        expire_month: Number(expire_month),
        expire_year: Number(`20${expire_year}`),
        name_on_card: data.name,
      })
    )
      .unwrap()
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchProvinces() {
    try {
      const response = await axiosInstance.get(
        "https://turkiyeapi.dev/api/v1/provinces"
      );
      const provinces = response.data.data.map(
        (province: any) => province.name
      );
      setProvinceData(response.data.data);
      setProvinces(provinces);
    } catch (error) {
      toast.error("Can not download city information");
      throw error;
    }
  }

  function addressChangeHandler(e: any) {
    if (e.target.name === "activeAddress") {
      setActiveAddress(e.target.value);
      setActiveBillingAddress(e.target.value);
    } else {
      setActiveBillingAddress(e.target.value);
    }
  }

  function cardChangeHandler(e: any) {
    const { value } = e.target;
    const chosenCard = cards.find((card) => card.card_no === value);
    setActiveCard(chosenCard);
  }

  async function makeOrder() {
    const orderDetails = {
      address_id: shippingAddress.id,
      order_date: new Date(),
      card_no: activeCard?.card_no,
      card_name: activeCard?.name_on_card,
      card_expire_month: activeCard?.expire_month,
      card_expire_year: activeCard?.expire_year,
      card_ccv: 123,
      price: payment.total,
      products: productsInCart.map((product) => {
        return {
          product_id: product.product.id,
          count: product.numberOfItem,
          detail: product.product.description,
        };
      }),
    };
    try {
      const response: AxiosResponse = await axiosInstance.post(
        "/order",
        orderDetails
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function stepHandler() {
    if (firstStep && activeAddress && activeBillingAddress) {
      setFirstStep(false);
      const shipping = addresses.find(
        (address) => address.title == activeAddress
      );
      const billing = addresses.find(
        (address) => address.title == activeBillingAddress
      );
      if (shipping && billing) {
        dispatch(setAddressInfo({ shipping: shipping, billing: billing }));
      }
    } else if (firstStep) {
      toast.warn("Please choose an address");
    } else {
      makeOrder();
    }
  }

  useEffect(() => {
    const handleClick = (event: any) => {
      if (
        addRef.current &&
        formRef.current &&
        !formRef.current?.contains(event.target) &&
        !addRef.current?.contains(event.target)
      ) {
        setIsNewAddress(false);
      }
    };
    const handleClickCard = (event: any) => {
      if (
        addCardRef.current &&
        cardFormRef.current &&
        !cardFormRef.current?.contains(event.target) &&
        !addCardRef.current?.contains(event.target)
      ) {
        setAddNewCard(false);
      }
    };
    window.addEventListener("click", handleClick);
    window.addEventListener("click", handleClickCard);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("click", handleClickCard);
    };
  }, [addRef, addCardRef, cardFormRef, formRef]);

  useEffect(() => {
    const province = provinceData?.find((province) => province.name === city);
    const districts = province?.districts.map((district: any) => district.name);
    setDistricts(districts);
  }, [city]);

  useEffect(() => {
    if (userToken) {
      dispatch(fetchAddress())
        .unwrap()
        .catch((error) => {
          console.log(error);
          toast.error("Saved addresses could not loaded, Please refresh page.");
        });
      fetchProvinces();
      dispatch(fetchCards())
        .unwrap()
        .catch((error) => {
          toast.error("Saved cards could not loaded, Please refresh page.");
          throw error;
        });
    }
  }, [userToken]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <>
      <section id="orderDetails" className="flex xl:px-[5%] py-5">
        <div
          id="shoppingChart"
          className={`bg-neutral-50 py-10 pr-3 border rounded-md flex flex-col w-full`}
        >
          <div className="flex flex-wrap justify-center gap-3 items-start md:flex-nowrap ">
            <div className="rounded-lg w-full md:w-2/3 ml-3 flex flex-col gap-2 items-center  self-stretch shadow-sm xl:border">
              <div className="text-center text-xl flex w-full ">
                <div
                  className={`w-full xl:w-1/2 min-h-[100px] xl:min-h-[185px]  flex flex-col items-start justify-start border shadow-[0px_5px_0px_0px] ${
                    firstStep
                      ? " shadow-[#176B87]"
                      : "shadow-neutral-300 hidden xl:flex"
                  }`}
                >
                  <p className="text-lg px-5 pt-5 font-bold w-full flex flex-wrap items-center justify-between">
                    Address Information
                    {!firstStep && (
                      <span
                        className="text-sm text-[#176B87] cursor-pointer"
                        onClick={() => setFirstStep(true)}
                      >
                        Change Address
                      </span>
                    )}
                  </p>

                  {!firstStep && (
                    <div className="rounded-lg bg-neutral-50 p-1 sm:p-3 flex flex-col justify-between items-center w-full  font-['Montserrat']">
                      <div className="w-full pb-2">
                        <p className="flex gap-5 text-left pl-2 text-sm font-['Montserrat'] rounded-md">
                          {shippingAddress.title}
                        </p>
                      </div>
                      <div className="rounded-lg bg-neutral-50 pl-2 flex flex-col justify-between items-center  w-full">
                        <div className="flex flex-col items-start w-full ">
                          <p className=" mr-2 font-['Montserrat'] text-sm">
                            <span>{shippingAddress.neighborhood}</span>{" "}
                            <span>{shippingAddress.address}</span>{" "}
                          </p>
                          <p className=" mr-2 self-end font-['Montserrat'] text-sm">
                            <span>{shippingAddress.district}</span>
                            <span>/</span>
                            <span>{shippingAddress.city}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <p
                  className={`w-full xl:w-1/2 h-20 pl-3 text-lg flex flex-col items-start justify-start border shadow-[0px_5px_0px_0px] min-h-[100px] xl:min-h-[185px] pt-5 font-bold ${
                    firstStep
                      ? "shadow-neutral-300 hidden xl:flex"
                      : " shadow-[#176B87]"
                  }`}
                >
                  {" "}
                  Payment Options
                </p>
              </div>
              {firstStep ? (
                <>
                  <div className="text-center font-bold p-5 font-['Montserrat'] border rounded-md flex flex-wrap gap-3 items-center justify-between w-full">
                    <p> Delivery Address</p>
                    <p>
                      Billing Address:
                      <select
                        name="billingAddress"
                        id="billingAddress"
                        value={activeBillingAddress}
                        className="text-[#176B87] ml-1 bg-neutral-50"
                        onChange={(e) => addressChangeHandler(e)}
                      >
                        {addresses.map((address, i: number) => (
                          <option key={i} value={address.title}>
                            {address.title}
                          </option>
                        ))}
                      </select>
                    </p>
                  </div>
                  <div className="flex flex-wrap w-full gap-y-2 justify-between ">
                    <div
                      className="rounded-lg bg-white p-1 sm:p-3 min-h-[150px] shadow-md flex justify-center items-center gap-3 w-full xl:w-[calc(50%-5px)] flex-wrap cursor-pointer border"
                      onClick={() => setIsNewAddress(true)}
                      ref={addRef}
                    >
                      <Icon icon="material-symbols:add" className="w-5 h-5" />
                      <p className="text-center font-bold p-1 font-['Montserrat']">
                        Add New Address
                      </p>
                    </div>
                    {!addresses ? (
                      <Icon
                        icon="svg-spinners:180-ring"
                        className="m-auto w-20 h-20"
                      />
                    ) : (
                      addresses.map((address, i: number) => (
                        <div
                          key={i}
                          className="rounded-lg bg-white p-1 sm:p-3 shadow-md border flex flex-col justify-between items-center w-full xl:w-[calc(50%-5px)]"
                        >
                          <div className="w-full">
                            <label className="flex gap-5 text-left font-bold p-1 pl-5 text-sky-50 font-['Montserrat'] bg-[#176B87] rounded-md">
                              <input
                                type="radio"
                                name="activeAddress"
                                value={address.title}
                                className="bg-gray-100 border-gray-300 focus:ring-red-500"
                                onChange={(e) => addressChangeHandler(e)}
                              />
                              {address.title}
                            </label>
                          </div>
                          <div className="rounded-lg bg-white p-1 sm:p-3 flex flex-col justify-between items-center  w-full">
                            <div className=" w-full flex gap-2 justify-between items-center font-['Montserrat']  pb-5">
                              <div className="flex items-center">
                                <Icon
                                  icon="material-symbols:person"
                                  className="w-6 h-6 mr-3"
                                />
                                <p className="text-lg  text-gray-900 mr-2 font-['Montserrat']">
                                  {address.name}
                                </p>
                                <p className="text-lg   text-gray-700 font-['Montserrat']">
                                  {address.surname}
                                </p>
                              </div>
                              <p>{address.phone}</p>
                            </div>
                            <div className="flex flex-col items-start w-full ">
                              <p className=" text-gray-900 mr-2 font-['Montserrat']">
                                <span>{address.neighborhood}</span>{" "}
                                <span>{address.address}</span>{" "}
                              </p>
                              <p className=" text-gray-900 mr-2 self-end font-['Montserrat']">
                                <span>{address.district}</span>
                                <span>/</span>
                                <span>{address.city}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>{" "}
                </>
              ) : (
                <ul className="flex flex-wrap w-full gap-y-2 justify-between ">
                  <li
                    className="rounded-lg bg-white p-1 sm:p-3 min-h-[150px] shadow-md flex justify-center items-center gap-3 w-full xl:w-[calc(50%-5px)] flex-wrap cursor-pointer border"
                    onClick={() => setAddNewCard(true)}
                    ref={addCardRef}
                  >
                    <Icon icon="material-symbols:add" className="w-5 h-5" />
                    <p className="text-center font-bold p-1 font-['Montserrat']">
                      Add New Card
                    </p>
                  </li>
                  {!cards ? (
                    <Icon
                      icon="svg-spinners:180-ring"
                      className="m-auto w-20 h-20"
                    />
                  ) : (
                    cards.map((card, i: number) => (
                      <li
                        key={i}
                        className=" rounded-lg bg-white shadow-md border flex flex-col justify-between items-center w-full h-[250px] xl:w-[calc(50%-5px)]"
                      >
                        <input
                          type="radio"
                          id={String(card.card_no)}
                          name="activeCard"
                          value={card.card_no}
                          className="hidden peer"
                          onChange={(e) => cardChangeHandler(e)}
                        />
                        <label
                          htmlFor={String(card.card_no)}
                          className="flex items-center justify-around w-full h-full p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-sky-500 peer-checked:border-[2px] hover:text-gray-600 hover:bg-gray-100 "
                        >
                          <div className="w-full h-full  bg-black-100 rounded-xl relative text-white shadow-2xl flex">
                            <img
                              className="object-cover w-full h-full rounded-xl"
                              src="https://images.unsplash.com/photo-1599239663833-4c1cdc22892a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            />

                            <div className="w-full px-8 absolute top-8">
                              <div className="flex justify-between">
                                <div className="font-['Montserrat']">
                                  <p className="font-light">Name</p>
                                  <p className="font-medium tracking-tight">
                                    {card.name_on_card}
                                  </p>
                                </div>
                                <img
                                  className="w-14 h-14"
                                  src="https://i.imgur.com/bbPHJVe.png"
                                />
                              </div>
                              <div className="pt-1 ">
                                <p className="font-light font-['Montserrat']">
                                  Card Number
                                </p>
                                <p className="font-medium tracking-tight font-['Montserrat']">
                                  ************{String(card.card_no).slice(-4)}
                                </p>
                              </div>
                              <div className="pt-6 pr-6">
                                <div className="flex justify-between">
                                  <div className="">
                                    <p className="font-light text-sm font-['Montserrat']">
                                      Expiry Date
                                    </p>
                                    <p className="font-medium tracking-tight text-sm font-['Montserrat']">
                                      <span>{card.expire_month}</span>
                                      <span>/ </span>
                                      <span>{card.expire_year}</span>
                                    </p>
                                  </div>

                                  <div className="">
                                    <p className="font-light text-sm font-['Montserrat']">
                                      CVV
                                    </p>
                                    <p className="font-bold tracking-tight text-sm">
                                      ***
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>{" "}
                        </label>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>

            <div className=" w-full rounded-lg border max-h-[500px] bg-white p-6 shadow-md md:mt-0 md:w-1/3 ">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">{payment.subtotal} $</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">{payment.shipping} $</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">{payment.total} $</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button
                className="mt-6 w-full rounded-md bg-sky-500 py-1.5 font-medium text-blue-50 hover:bg-sky-400"
                onClick={stepHandler}
              >
                {firstStep ? "Save and Continue" : "Proceed to Payment"}
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
                <label className="inputLabel">
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
                    className={`defaultInput ${
                      errors.name ? "inputWithError" : ""
                    }  `}
                  />
                </label>
                {errors.name && (
                  <p role="alert" className="formErrorMessage">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mb-5 relative">
                <label className="inputLabel">
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
                    placeholder="Enter your surname"
                    className={`defaultInput ${
                      errors.name ? "inputWithError" : ""
                    }  `}
                  />
                </label>
                {errors.surname && (
                  <p role="alert" className="formErrorMessage">
                    {errors.surname.message}
                  </p>
                )}
              </div>

              <div className="mb-5 relative">
                <label className="inputLabel">
                  Phone Number
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^(\+90|90|)?\d{10}$/,
                        message: "Enter a valid number",
                      },
                    })}
                    placeholder="Enter your phone number"
                    className={`defaultInput ${
                      errors.phone ? "inputWithError" : ""
                    }  `}
                  />
                </label>
                {errors.phone && (
                  <p role="alert" className="formErrorMessage">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="mb-5 relative">
                <label className="inputLabel">
                  City
                  <select
                    {...register("city", {
                      validate: (val: string) => {
                        if (val == "default") {
                          return "Choose a city";
                        }
                      },
                    })}
                    className={`defaultInput ${
                      errors.city ? "inputWithError" : ""
                    }`}
                    value={city}
                    onChange={(e) => handleCityChange(e)}
                  >
                    <option value="default" disabled>
                      Chose a City
                    </option>
                    {provinces?.map((city, i) => (
                      <option key={i} value={city}>
                        {" "}
                        {city}
                      </option>
                    ))}
                  </select>
                </label>
                {errors.city && (
                  <p role="alert" className="formErrorMessage">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="mb-5 relative">
                <label className="inputLabel">
                  District
                  <select
                    {...register("district", {
                      validate: (val: string) => {
                        if (val === "default") {
                          return "Choose a district";
                        }
                      },
                    })}
                    className={`defaultInput ${
                      errors.district ? "inputWithError" : ""
                    }`}
                    defaultValue="default"
                  >
                    <option value="default" disabled>
                      Choose a district
                    </option>
                    {districts?.map((district, i) => (
                      <option key={i} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </label>
                {errors.district && (
                  <p role="alert" className="formErrorMessage">
                    {errors.district.message}
                  </p>
                )}
              </div>
              <div className="mb-5 relative">
                <label className="inputLabel">
                  Neighborhood
                  <input
                    type="text"
                    {...register("neighborhood", {
                      required: "Neighborhood is required",
                    })}
                    className={`defaultInput ${
                      errors.neighborhood ? "inputWithError" : ""
                    }`}
                  />{" "}
                </label>
                {errors.neighborhood && (
                  <p role="alert" className="formErrorMessage">
                    {errors.neighborhood.message}
                  </p>
                )}
              </div>

              <div className="mb-5 relative">
                <label className="inputLabel">
                  Address
                  <input
                    type="text"
                    {...register("address", {
                      required: "Detail of address is required",
                    })}
                    className={`defaultInput   ${
                      errors.address ? "inputWithError" : ""
                    }`}
                  />
                </label>
                {errors.address && (
                  <p role="alert" className="formErrorMessage">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="mb-5 relative">
                <label className="inputLabel">
                  Address Title
                  <input
                    type="text"
                    {...register("title", {
                      required: "Address title is required",
                    })}
                    placeholder="Address title"
                    className={`defaultInput ${
                      errors.title ? "inputWithError" : ""
                    }  `}
                  />
                </label>
                {errors.title && (
                  <p role="alert" className="formErrorMessage">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <button
                className={`hover:bg-sky-400 w-full rounded-md bg-sky-500 py-3 px-8 text-center text-base font-semibold text-white outline-none `}
              >
                Add Address
              </button>
            </form>
          </div>
        )}

        {addNewCard && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-neutral-800 bg-opacity-25 z-10 flex items-center justify-center ">
            <form
              ref={cardFormRef}
              className="mx-auto w-full max-w-xl bg-white p-10  border shadow-lg rounded-xl"
              onSubmit={handleSubmitCard(onSubmitCard)}
            >
              <div className="mb-5 relative">
                <label className="inputLabel">
                  Card Number
                  <input
                    type="text"
                    {...registerCard("card_no", {
                      required: "Card no is required",
                      minLength: {
                        value: 16,
                        message: "Enter a valid card number",
                      },
                    })}
                    placeholder="**** **** **** ****"
                    className={`defaultInput ${
                      errorsCard.card_no ? "inputWithError" : ""
                    }  `}
                  />
                </label>
                {errorsCard.card_no && (
                  <p role="alert" className="formErrorMessage">
                    {errorsCard.card_no.message}
                  </p>
                )}
              </div>
              <div className="mb-5 relative">
                <label className="inputLabel">
                  Name of Cardholder
                  <input
                    type="text"
                    {...registerCard("name", {
                      required: "Name of cardholder is required",
                    })}
                    placeholder="Name Surname"
                    className={`defaultInput ${
                      errorsCard.name ? "inputWithError" : ""
                    }  `}
                  />
                </label>
                {errorsCard.name && (
                  <p role="alert" className="formErrorMessage">
                    {errorsCard.name.message}
                  </p>
                )}
              </div>
              <div className="mb-5 relative">
                <label className="inputLabel">
                  Exp Date
                  <input
                    type="text"
                    {...registerCard("exp_date", {
                      required: "Expire Date is required",
                      validate: (val: any) => {
                        const date = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
                        if (date.test(val)) {
                        } else {
                          return "Enter a valid exp date";
                        }
                      },
                    })}
                    placeholder="MM/YY"
                    className={`defaultInput ${
                      errorsCard.exp_date ? "inputWithError" : ""
                    }  `}
                  />
                </label>
                {errorsCard.exp_date && (
                  <p role="alert" className="formErrorMessage">
                    {errorsCard.exp_date.message}
                  </p>
                )}
              </div>

              <div className="mb-5 relative">
                <label className="inputLabel">
                  CCV
                  <input
                    type="text"
                    {...registerCard("ccv", {
                      required: "CCV is required",
                      validate: (val: any) => {
                        const ccv = /^([0-9]{3})$/;
                        if (ccv.test(val)) {
                        } else {
                          return "Enter a valid ccv";
                        }
                      },
                    })}
                    className={`defaultInput ${
                      errorsCard.ccv ? "inputWithError" : ""
                    }`}
                  />
                </label>
                {errorsCard.ccv && (
                  <p role="alert" className="formErrorMessage">
                    {errorsCard.ccv.message}
                  </p>
                )}
              </div>

              <button
                className={`hover:bg-sky-400 w-full rounded-md bg-sky-500 py-3 px-8 text-center text-base font-semibold text-white outline-none `}
              >
                Add Card
              </button>
            </form>
          </div>
        )}
      </section>
    </>
  );
};

export default OrderPage;
