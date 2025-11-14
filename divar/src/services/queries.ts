import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

export type Profile = {
  _id: string;
  mobile: string;
  role: "USER" | "ADMIN";
  createdAt: string;
};

const useGetProfile = () => {
  const queryKey = ["profile"];

  const queryFn = async (): Promise<Profile | false> => {
    try {
      const res = await api.get<Profile>("user/whoami");
      return res.data || false;
    } catch (err) {
      return false;
    }
  };

  return useQuery<Profile | false, Error>({ queryKey, queryFn });
};

export { useGetProfile };
