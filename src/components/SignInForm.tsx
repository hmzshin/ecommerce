import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../store/store";
import { useEffect, useState } from "react";

const SignInForm = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  type FormData = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("login info", data);
  };

  return (
    <section
      id="signin-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-16 p-12 "
    >
      <h3 className="text-sky-500  text-4xl font-bold font-['Montserrat']  tracking-tigh">
        Login
      </h3>
      <form className="mx-auto w-full max-w-xl bg-white">
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

        <button
          className={`hover:bg-sky-400 w-full rounded-md bg-sky-500 py-3 px-8 text-center text-base font-semibold text-white outline-none`}
        >
          LOGIN
        </button>
      </form>
    </section>
  );
};

export default SignInForm;
