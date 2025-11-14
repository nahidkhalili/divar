import api from "../config/api";
import { getCookie } from "../utils/cookie";

type TokenResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
};


const getNewToken = async (): Promise<TokenResponse | null> => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await api.post<TokenResponse>("auth/check-refresh-token", { refreshToken });
    return res.data;
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
};
export { getNewToken };
