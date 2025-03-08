import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

const useGetProfile = () => {
  const queryKey = ["profile"];
  const queryFn = () => api.get("user/whoami").then((res) => res || false);
  return useQuery({ queryKey, queryFn });
};

export { useGetProfile };
