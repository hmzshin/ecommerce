import axios from "axios";

export const axiosInstanceCreator = () => {
  const token = localStorage.getItem("token");

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

export let AxiosInstance: any;

export const renewAxiosInstance = () => {
  AxiosInstance = axiosInstanceCreator();
};

renewAxiosInstance();
