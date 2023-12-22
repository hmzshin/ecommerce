import { useState } from "react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../api/axiosInstance";
type RequestType = "get" | "post" | "put" | "delete";

interface AxiosHookProps {
  reqType: RequestType;
  endpoint: string;
  config?: AxiosRequestConfig;
  successCallback?: () => void;
  errorCallback?: () => void;
  navPath?: string;
}

export const useAxios = ({
  reqType,
  endpoint,
  config,
  successCallback,
  errorCallback,
  navPath,
}: AxiosHookProps): [
  (payload?: any, toastify?: boolean) => Promise<void>,
  boolean,
  AxiosError<any> | undefined
] => {
  const [error, setError] = useState<AxiosError<any>>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const axiosRequest = async (
    payload?: any,
    toastify = false
  ): Promise<void> => {
    const toastLoading = toastify ? toast.loading("Please wait...") : "";
    setLoading(true);
    try {
      const res = await AxiosInstance[reqType](
        endpoint,
        payload ? payload : config
      );

      successCallback && successCallback();

      toast.update(toastLoading, {
        render: `Account successfully created. You need to click the link in the email to activate your account!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        className: "w-[500px]",
      });

      if (endpoint === "signup") {
        localStorage.setItem("token", res.data.token);
      }

      if (navPath) {
        navigate(navPath);
      }
      return res.data;
    } catch (err: any) {
      toast.update(toastLoading, {
        render: `Your account could not be created. Please try again.`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });

      setError(err);
      errorCallback && errorCallback();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [axiosRequest, loading, error];
};
