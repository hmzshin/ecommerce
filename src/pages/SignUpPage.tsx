import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { useAxios } from "../hooks/useAxios";
import { AxiosError } from "axios";
import { useAppSelector } from "../store/store";
import { useState } from "react";

const SignUpPage = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [role, setRole] = useState<string>("customer");
  const roles = useAppSelector((state) => state.global.roles);

  const [postRequest, postLoading]: [
    (payload?: any, toastify?: boolean) => Promise<void>,
    boolean,
    AxiosError<any> | undefined
  ] = useAxios({
    reqType: "post",
    endpoint: "signup",
    navPath: "/",
  });

  function activateStoreDetails(e: React.ChangeEvent<HTMLSelectElement>) {
    const activeElement = document.getElementById("storeDetails");
    const role = e.target.value;
    setRole(role);
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
  } = useForm<FormData>({ defaultValues: { role: "customer" } });

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
      id="sign-up-form"
      className="flex flex-col items-center justify-center gap-20 p-12 "
    >
      <h3 className="text-sky-500  text-2xl font-bold font-['Montserrat']  tracking-tight">
        Create a Bandage Account
      </h3>{" "}
      <form
        className="mx-auto w-full max-w-xl bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5 relative">
          <label className="inputLabel">
            Full Name
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
              className={`defaultInput ${errors.name ? "inputWithError" : ""}`}
            />
          </label>
          {errors.name && (
            <p role="alert" className="formErrorMessage text-sm sm:text-base">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-5 relative">
          <label className="inputLabel">
            Email Address
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: (val: any) => {
                  const emailRegex =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                  if (!emailRegex.test(val)) {
                    return "Enter a valid email address.";
                  }
                },
              })}
              placeholder="Enter your email"
              className={`defaultInput ${errors.email ? "inputWithError" : ""}`}
            />
          </label>
          {errors.email && (
            <p role="alert" className="formErrorMessage">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-5 relative">
          <label className="inputLabel">
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
                    return "At least one capital letter needed";
                  }
                  if (!lowerCaseLetters.test(val)) {
                    return "At least one lowercase letter needed";
                  }
                },
              })}
              placeholder="Enter Password"
              className={`defaultInput ${
                errors.password ? "inputWithError" : ""
              }`}
            />{" "}
            <Icon
              icon={hidePassword ? "octicon:eye-closed-16" : "octicon:eye-16"}
              className="w-6 h-6 absolute top-1/2 right-3 text-neutral-500"
              onClick={() => setHidePassword(!hidePassword)}
            />
          </label>{" "}
          {errors.password && (
            <p role="alert" className="formErrorMessage">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="mb-5 relative">
          <label className="inputLabel">
            Confirm Password
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Password do not match";
                  }
                },
              })}
              placeholder="Confirm Password"
              className={`defaultInput ${
                errors.confirmPassword ? "inputWithError" : ""
              }`}
            />
          </label>
          {errors.confirmPassword && (
            <p role="alert" className="formErrorMessage">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="mb-5 relative">
          <label className="inputLabel">
            Phone Number <span className="text-sm">(Optional)</span>
            <input
              type="tel"
              {...register("phone", {
                pattern: {
                  value: /^(\+90|90|)?\d{10}$/,
                  message: "Enter a valid number",
                },
              })}
              placeholder="Enter your phone number"
              className={`defaultInput ${errors.phone ? "inputWithError" : ""}`}
            />
          </label>
          {errors.phone && (
            <p role="alert" className="formErrorMessage">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div id="birthday" className="mb-5">
          <label className="inputLabel">
            Date of Birth <span className="text-sm">(Optional)</span>
            <input
              type="date"
              {...register("birthDate")}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none focus:border-sky-500 "
            />{" "}
          </label>
        </div>
        <div className="mb-5">
          <label className="inputLabel">
            Role
            <select
              {...register("role")}
              value={role}
              onChange={(e) => activateStoreDetails(e)}
              className={`defaultInput `}
            >
              {roles.map((role) => (
                <option key={role.id} value={role.code}>
                  {role.name}
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
            <label className="inputLabel">
              Name
              <input
                type="text"
                {...register("storeName", {
                  validate: (val: any) => {
                    if (watch("role") === "store") {
                      if (val.length == 0) {
                        return "Store name is required";
                      }
                      if (val.length <= 3) {
                        return "Enter a valid name";
                      }
                    }
                  },
                })}
                placeholder="Enter your store's name"
                className={`defaultInput ${
                  errors.storeName ? "inputWithError" : ""
                }`}
              />
            </label>
            {errors.storeName && (
              <p role="alert" className="formErrorMessage">
                {errors.storeName.message}
              </p>
            )}
          </div>

          <div className="mb-5 relative">
            <label className="inputLabel">
              Phone Number
              <input
                type="tel"
                {...register("storePhone", {
                  required: "Phone number is required",
                  validate: (val: any) => {
                    if (watch("role") === "store") {
                      const tr = /^(\+90|90|)?\d{10}$/;
                      if (!tr.test(val)) {
                        return "Enter a valid phone number";
                      }
                    }
                  },
                })}
                placeholder="e.g. +90XXXXXXXXXX"
                className={`defaultInput ${
                  errors.storePhone ? "inputWithError" : ""
                }`}
              />
            </label>
            {errors.storePhone && (
              <p role="alert" className="formErrorMessage">
                {errors.storePhone.message}
              </p>
            )}
          </div>
          <div className="mb-5 relative">
            <label className="inputLabel">
              Tax ID
              <input
                type="text"
                {...register("storeTax", {
                  required: "Tax number is required",
                  validate: (val: any) => {
                    if (watch("role") === "store") {
                      if (!/T\d{4}V\d{6}/.test(val)) {
                        return "Enter a valid tax number.";
                      }
                    }
                  },
                })}
                placeholder="TXXXXVXXXXXX"
                className={`defaultInput ${
                  errors.storeTax ? "inputWithError" : ""
                }`}
              />
            </label>
            {errors.storeTax && (
              <p role="alert" className="formErrorMessage">
                {errors.storeTax.message}
              </p>
            )}
          </div>
          <div className="mb-5 relative">
            <label className="inputLabel">
              Bank Account
              <input
                type="text"
                {...register("storeBankAccount", {
                  required: "IBAN Number is required",
                  validate: (val: any) => {
                    if (watch("role") === "store") {
                      if (!/TR\d{24}/.test(val)) {
                        return "Enter a valid IBAN Number";
                      }
                    }
                  },
                })}
                placeholder="IBAN Number"
                className={`defaultInput ${
                  errors.storeBankAccount ? "inputWithError" : ""
                }`}
              />
            </label>
            {errors.storeBankAccount && (
              <p role="alert" className="formErrorMessage">
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
            Terms of Service.
          </a>
        </p>
      </form>
    </section>
  );
};

export default SignUpPage;
