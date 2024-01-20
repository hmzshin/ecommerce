import axios, { AxiosInstance } from "axios";

type Token = string | null;

export const axiosInstanceCreator = (): AxiosInstance => {
  const token: Token = localStorage.getItem("token");
  console.log(token);

  return token
    ? axios.create({
        baseURL: `https://workintech-fe-ecommerce.onrender.com/`,
        headers: {
          Authorization: token,
        },
      })
    : axios.create({
        baseURL: `https://workintech-fe-ecommerce.onrender.com/`,
        headers: {},
      });
};

export let axiosInstance: AxiosInstance;

export const renewAxiosInstance = (): void => {
  axiosInstance = axiosInstanceCreator();
};

renewAxiosInstance();
