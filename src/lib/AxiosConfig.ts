import axios from "axios";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { logout } from "./Apis";

const config = axios.defaults;

const instance = (contentType = "application/json") => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
      ...config.headers.common,
      // ["Content-Type"]: contentType,
    },
  });

  axiosInstance.interceptors.request.use(
    (config) =>
      auth()
        .then((res: any) => {
          if (res?.user?.accessToken) return config.headers.Authorization = "Bearer " + res?.user?.accessToken;
        })
        .then(() => config),
    (error) => {
      Promise.reject(error)
    }
  );

  // console.log("axiosInstance", axiosInstance)

  // Data Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // console.log("respondeDate", response)
      return response.data;
    },
    async (error) => {
      console.log("error.response.status", error.response.status)
      if (error.response.status === 401 || error.response.status === 422) {
        await logout();
        redirect("/auth/login")

      }
      throw new Error(JSON.stringify({
        ...error.response.data,
        status: error.response.status
      }));
    }
  );

  return axiosInstance;
};

export default instance;

