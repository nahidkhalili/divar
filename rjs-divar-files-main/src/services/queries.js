import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

const useGetProfile = () => {
  const queryKey = ["profile"];
  const queryFn = () => api.get("user/whoami");
  return useQuery({queryKey, queryFn});
};

export { useGetProfile };
