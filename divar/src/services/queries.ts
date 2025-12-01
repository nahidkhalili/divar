import { useQuery } from "@tanstack/react-query";
import api from "../config/api";
import { QUERY_KEYS } from "../constants/queryKeys";

export type Profile = {
  _id: string;
  mobile: string;
  role: "USER" | "ADMIN";
  createdAt: string;
};

const useGetProfile = () => {
  const queryKey = QUERY_KEYS.PROFILE;

  const queryFn = async (): Promise<Profile | null> => {
    try {
      console.log("🚀 CALLING GET PROFILE...");

      const res = await api.get<Profile>("user/whoami");
      console.log("📥 PROFILE RESPONSE:", res.data);
      return res.data || null;
    } catch (err) {
      return null;
    }
  };

  return useQuery<Profile | null, Error>({ queryKey, queryFn });
};

export { useGetProfile };
