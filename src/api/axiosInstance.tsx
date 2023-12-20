import axios from "axios";

export const axiosInstanceCreator = () => {
  const token = localStorage.getItem("token");

  return token
    ? axios.create({
        baseURL: `http://localhost:3000/`,
        headers: {
          Authorization: token,
        },
      })
    : axios.create({
        baseURL: `http://localhost:3000/`,
        headers: {},
      });
};

export let AxiosInstance: any;

export const renewAxiosInstance = () => {
  AxiosInstance = axiosInstanceCreator();
};

renewAxiosInstance();
