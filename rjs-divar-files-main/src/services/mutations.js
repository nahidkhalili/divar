import api from "../config/api";

import { useMutation } from "@tanstack/react-query";

//======================== AUTH =======================//
const useSendOtp = () => {
  const mutationFn = (number) => {
    console.log("first", number);
    const response = api.post("auth/send-otp", number);
    return response;
  };
  return useMutation({ mutationFn });
};

const useCheckOtp = () => {
  const mutationFn = ({mobile, code}) => {
    console.log("second", mobile);

    const response = api.post("auth/check-otp", { mobile, code });
    return response;
  };
  return useMutation({ mutationFn });
};

export { useSendOtp, useCheckOtp };
