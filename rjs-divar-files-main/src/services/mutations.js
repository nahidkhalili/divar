import api from "../config/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

//======================== AUTH =======================//
const useSendOtp = () => {
  const mutationFn = (number) => {
    const response = api.post("auth/send-otp", number);
    return response;
  };
  return useMutation({ mutationFn });
};

const useCheckOtp = () => {
  const queryClient = useQueryClient();
  const mutationFn = ({ mobile, code }) => {
    const response = api.post("auth/check-otp", { mobile, code });
    return response;
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };
  return useMutation({ mutationFn, onSuccess });
};

const useAddCategory = () => {
  const mutationFn = () => {}
}

export { useSendOtp, useCheckOtp };
