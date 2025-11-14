import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import { getNewToken } from "../services/token";

// an instance for formData
const apiForm = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

// apiForm request interceptor
apiForm.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;
      return request;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// apiForm responce interceptor
apiForm.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry == true;
      const res = await getNewToken();
      if (!res?.res) return;
      setCookie(res.res.data);
      return apiForm(originalRequest);
    }
  }
);

export default apiForm;
