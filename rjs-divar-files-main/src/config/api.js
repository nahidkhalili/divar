import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import { getNewToken } from "../services/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;
      console.log("request", request);
      return request;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await getNewToken();
      console.log("res", res);
      if (!res?.res) return;
      setCookie(res.res.data);
      return api(originalRequest);
    }
  }
);

export default api;
