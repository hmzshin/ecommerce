import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { AxiosError, AxiosResponse } from "axios";
import { useAppSelector } from "../store/store";
import { useState } from "react";

const SignUpForm = () => {
  const location = useLocation();
  const [postData, postRequest, postLoading, postError]: [
    AxiosResponse<any> | undefined,
    (payload?: any, toastify?: boolean) => Promise<void>,
    boolean,
    AxiosError<any> | undefined
  ] = useAxios({
    reqType: "post",
    endpoint: "signup",
    navPath: location.state ? location.state.pathname : "/",
  });

  const rolesArray = useAppSelector((state) => state.global.roles);

  const [hidePassword, setHidePassword] = useState<boolean>(true);

  function activateStoreDetails(e: React.ChangeEvent<HTMLSelectElement>) {
    const activeElement = document.getElementById("storeDetails");
    const role = e.target.value;
    if (role == "store") {
      activeElement?.classList.remove("hidden");
    } else {
      activeElement?.classList.add("hidden");
    }
  }

  type FormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: number;
    birthDate: string;
    role: string;
    storeName: string;
    storePhone: string;
    storeTax: string;
    storeBankAccount: string;
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const submitData: any = {
      name: data.name.trim(),
      email: data.email,
      password: data.password,
      role_id: data.role,
    };
    if (data.role === "Store") {
      const storeDetails = {
        name: data.storeName.trim(),
        phone: data.storePhone,
        tax_no: data.storeTax,
        bank_account: data.storeBankAccount,
      };

      submitData.store = storeDetails;
    }

    postRequest(submitData, true);
  };

  return (
    <section
      id="signup-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-20 p-12 "
    >
      <h3 className="text-sky-500  text-2xl font-bold font-['Montserrat']  tracking-tigh">
        Create a Bandage Account
      </h3>{" "}
      <form className="mx-auto w-full max-w-xl bg-white">
        <div className="mb-5 relative">
          <label className="mb-3 block text-base font-medium text-[#07074D]">
            Full Name
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name should be at least three character",
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
            <p role="alert" className="text-red-400 absolute top-0 right-0">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-5 relative">
          <label className="mb-3 block text-base font-medium text-[#07074D]">
            Email Address
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Enter your email"
              className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none ${
                errors.email
                  ? "focus:border-red-400 border-red-400"
                  : "focus:border-sky-500 border-[#e0e0e0]"
              } focus:shadow-md `}
            />
          </label>
          {errors.email && (
            <p role="alert" className="text-red-400 absolute top-0 right-0">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-5 relative">
          <label className="mb-3 block text-base font-medium text-[#07074D]">
            Password
            <input
              type={hidePassword ? "password" : "text"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "At least 8 character required",
                },
                validate: (val: any) => {
                  const numbers = /[0-9]/g;
                  const upperCaseLetters = /[A-Z]/g;
                  const lowerCaseLetters = /[a-z]/g;
                  if (!numbers.test(val)) {
                    return "At least one number required";
                  }
                  if (!upperCaseLetters.test(val)) {
                    return "At least one uppercase letter required";
                  }
                  if (!lowerCaseLetters.test(val)) {
                    return "At least one lowercase letter required";
                  }
                },
              })}
              placeholder="Enter Password"
              className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none ${
                errors.password
                  ? "focus:border-red-400 border-red-400"
                  : "focus:border-sky-500 border-[#e0e0e0]"
              } focus:shadow-md `}
            />{" "}
            <Icon
              icon={hidePassword ? "octicon:eye-closed-16" : "octicon:eye-16"}
              className="w-6 h-6 absolute top-1/2 right-3 text-neutral-500"
              onClick={() => setHidePassword(!hidePassword)}
            />
          </label>{" "}
          {errors.password && (
            <p role="alert" className="text-red-400 absolute top-0 right-0">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="mb-5 relative">
          <label className="mb-3 block text-base font-medium text-[#07074D]">
            Confirm Password
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              placeholder="Confirm Password"
              className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none ${
                errors.confirmPassword
                  ? "focus:border-red-400 border-red-400"
                  : "focus:border-sky-500 border-[#e0e0e0]"
              } focus:shadow-md `}
            />
          </label>
          {errors.confirmPassword && (
            <p role="alert" className="text-red-400 absolute top-0 right-0">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="mb-5 relative">
          <label className="mb-3 block text-base font-medium text-[#07074D]">
            Phone Number <span className="text-sm">(Optional)</span>
            <input
              type="tel"
              {...register("phone", {
                pattern: {
                  value: /^(\+90|90|)?\d{10}$/,
                  message: "Please enter a valid number",
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
            <p role="alert" className="text-red-400 absolute top-0 right-0">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div id="birthdate" className="mb-5">
          <label className="mb-3 block text-base font-medium text-[#07074D]">
            Date of Birth <span className="text-sm">(Optional)</span>
            <input
              type="date"
              {...register("birthDate")}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none focus:border-sky-500 focus:shadow-md"
            />{" "}
          </label>
        </div>
        <div className="mb-5">
          <label className="mb-3 block text-base font-medium text-[#07074D]">
            Role
            <select
              defaultValue="Customer"
              {...register("role", {
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                  activateStoreDetails(e),
              })}
              className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none focus:border-sky-500 border-[#e0e0e0] focus:shadow-md `}
            >
              {rolesArray.map((role: any) => (
                <option key={role[1]} value={role[1]}>
                  {role[0]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div id="storeDetails" className="mb-5 pt-3 hidden">
          <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
            Store Details
          </label>
          <div className="mb-5 relative">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Store Name
              <input
                type="text"
                {...register("storeName", {
                  validate: (val: any) => {
                    if (watch("role") === "store") {
                      if (val.length == 0) {
                        return "Store name is required";
                      }
                      if (val.length <= 3) {
                        return "Store name should be at least three characters";
                      }
                    }
                  },
                })}
                placeholder="Please enter your store's name"
                className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none ${
                  errors.storeName
                    ? "focus:border-red-400 border-red-400"
                    : "focus:border-sky-500 border-[#e0e0e0]"
                } focus:shadow-md `}
              />
            </label>
            {errors.storeName && (
              <p role="alert" className="text-red-400 absolute top-0 right-0">
                {errors.storeName.message}
              </p>
            )}
          </div>

          <div className="mb-5 relative">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Store Phone Number
              <input
                type="tel"
                {...register("storePhone", {
                  validate: (val: any) => {
                    if (watch("role") === "store") {
                      const tr = /^(\+90|90|)?\d{10}$/;
                      if (!tr.test(val)) {
                        return "Please enter a valid phone number";
                      }
                    }
                  },
                })}
                placeholder="e.g. +90XXXXXXXXXX"
                className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none ${
                  errors.storePhone
                    ? "focus:border-red-400 border-red-400"
                    : "focus:border-sky-500 border-[#e0e0e0]"
                } focus:shadow-md `}
              />
            </label>
            {errors.storePhone && (
              <p role="alert" className="text-red-400 absolute top-0 right-0">
                {errors.storePhone.message}
              </p>
            )}
          </div>
          <div className="mb-5 relative">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Store Tax ID
              <input
                type="text"
                {...register("storeTax", {
                  validate: (val: any) => {
                    if (watch("role") === "store") {
                      if (!/T\d{4}V\d{6}/.test(val)) {
                        return "Please enter a valid tax number";
                      }
                    }
                  },
                })}
                placeholder="TXXXXVXXXXXX"
                className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none ${
                  errors.storeTax
                    ? "focus:border-red-400 border-red-400"
                    : "focus:border-sky-500 border-[#e0e0e0]"
                } focus:shadow-md `}
              />
            </label>
            {errors.storeTax && (
              <p role="alert" className="text-red-400 absolute top-0 right-0">
                {errors.storeTax.message}
              </p>
            )}
          </div>
          <div className="mb-5 relative">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Store Bank Account
              <input
                type="text"
                {...register("storeBankAccount", {
                  validate: (val: any) => {
                    if (watch("role") === "store") {
                      if (!/TR\d{24}/.test(val)) {
                        return "Please enter a valid IBAN Number";
                      }
                    }
                  },
                })}
                placeholder="IBAN Number"
                className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none ${
                  errors.storeBankAccount
                    ? "focus:border-red-400 border-red-400"
                    : "focus:border-sky-500 border-[#e0e0e0]"
                } focus:shadow-md `}
              />
            </label>
            {errors.storeBankAccount && (
              <p role="alert" className="text-red-400 absolute top-0 right-0">
                {errors.storeBankAccount.message}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={postLoading ? true : false}
          className={`hover:bg-sky-400 w-full rounded-md bg-sky-500 py-3 px-8 text-center text-base font-semibold text-white outline-none ${
            postLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          Join Bandage
        </button>
        <p className="mt-3 block text-base text-center font-medium text-[#07074D]">
          By clicking "Join Bandage" you agree to our{" "}
          <a href="#" className="text-rose-500 hover:text-rose-400">
            Terms of Service
          </a>
        </p>
      </form>
    </section>
  );
};

export default SignUpForm;
