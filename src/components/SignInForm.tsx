import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../store/store";
import { useState } from "react";
import { sendLoginInfo } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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
    console.log("login info from form", data);
    dispatch(sendLoginInfo(data))
      .unwrap()
      .then(() => {
        toast.success("Succesfully loggedin");
        location.state ? navigate(location.state.pathname) : navigate("/");
      })
      .catch((error) => {
        toast.error("Login failed");
        console.log(error);
      });
  };

  return (
    <section
      id="signin-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center  p-12 "
    >
      <h3 className="text-sky-500  text-4xl font-bold font-['Montserrat']  tracking-tigh">
        Login
      </h3>
      <form className="mx-auto w-full max-w-xl bg-white pt-16 pb-10">
        <div className="mb-5 relative">
          <label className="mb-3 block text-base font-medium text-[#07074D]">
            Email Address
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: (val: any) => {
                  const emailRegex =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                  if (!emailRegex.test(val)) {
                    return "Please enter a valid email address.";
                  }
                },
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
              {...register("password")}
              placeholder="Enter Password"
              className={`w-full rounded-md border  bg-white py-3 px-6 mt-2 text-base font-medium text-[#6B7280] outline-none focus:border-sky-500 border-[#e0e0e0] focus:shadow-md `}
            />{" "}
            <Icon
              icon={hidePassword ? "octicon:eye-closed-16" : "octicon:eye-16"}
              className="w-6 h-6 absolute top-1/2 right-3 text-neutral-500"
              onClick={() => setHidePassword(!hidePassword)}
            />
          </label>{" "}
        </div>

        <button
          className={`hover:bg-sky-400 w-full rounded-md bg-sky-500 py-3 px-8 text-center text-base font-semibold text-white outline-none`}
        >
          LOGIN
        </button>
      </form>{" "}
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="text-center">
          <span className="text-sky-500">Sign up</span>
        </Link>
      </p>
    </section>
  );
};

export default SignInForm;
