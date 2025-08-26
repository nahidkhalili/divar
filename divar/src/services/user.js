import api from "../config/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiForm from "../config/apiForm";

//======================== MUTATIONS =======================//
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

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutationFn = (formData) => {
    const response = apiForm.post("post/create", formData);
    return response;
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["get-my-posts"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

// ============= USEQUERY ============== //
const useGetPosts = () => {
  const queryKey = ["get-my-posts"];
  const queryFn = () => api.get("post/my");

  return useQuery({ queryKey, queryFn });
};

const useGetAllPosts = () => {
  const queryKey = ["post-lists"];
  const queryFn = () => api.get("");
  return useQuery({ queryKey, queryFn });
};

export { useSendOtp, useCheckOtp, useGetPosts, useCreatePost, useGetAllPosts };
