import api from "../config/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiForm from "../config/apiForm";
import type { AxiosError } from "axios";
import { QUERY_KEYS } from "../constants/queryKeys";

//======================== MUTATIONS =======================//
type SendOtpPayload = { mobile: string };

type SendOtpResponse = {
  message: string;
  otp: string;
  expiresIn: number;
};
const useSendOtp = () => {
  const mutationFn = async (
    payload: SendOtpPayload
  ): Promise<SendOtpResponse> => {
    const res = await api.post<SendOtpResponse>("auth/send-otp", payload);
    return res.data;
  };
  return useMutation<SendOtpResponse, unknown, SendOtpPayload>({
    mutationFn,
  });
};

//=========================
type CheckOtpPayload = {
  mobile: string;
  code: string;
};

type CheckOtpResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
};

const useCheckOtp = () => {
  const queryClient = useQueryClient();
  const mutationFn = async (
    payload: CheckOtpPayload
  ): Promise<CheckOtpResponse> => {
    const response = await api.post<CheckOtpResponse>(
      "auth/check-otp",
      payload
    );
    return response.data;
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROFILE });
  };
  return useMutation<CheckOtpResponse, unknown, CheckOtpPayload>({
    mutationFn,
    onSuccess,
  });
};

//=============================

type CreatePostResponse = {
  message: string;
};
type ApiErrorResponse = {
  message?: string;
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutationFn = async (
    formData: FormData
  ): Promise<CreatePostResponse> => {
    const response = await apiForm.post<CreatePostResponse>(
      "post/create",
      formData
    );
    return response.data;
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_MY_POSTS });
  };

  return useMutation<
    CreatePostResponse,
    AxiosError<ApiErrorResponse>,
    FormData
  >({
    mutationFn,
    onSuccess,
  });
};

// ============= USEQUERY ============== //
export interface Post {
  _id: string;
  title?: string;
  userId: string;
  amount: number;
  content?: string;
  category: string;
  province?: string;
  city?: string;
  district?: string;
  address?: string;
  coordinate?: number[];
  images?: string[];
  options?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

type GetPostsResponse = {
  posts: Post[];
  count: number;
};

const useGetPosts = () => {
  const queryKey = QUERY_KEYS.GET_MY_POSTS;
  const queryFn = async (): Promise<GetPostsResponse> => {
    const res = await api.get<GetPostsResponse>("post/my");
    return res.data;
  };

  return useQuery<GetPostsResponse, unknown>({ queryKey, queryFn });
};
//============================
type GetAllPostsResponse = {
  posts: Post[];
};

const useGetAllPosts = () => {
  const queryKey = QUERY_KEYS.GET_ALL_POSTS;

  const queryFn = async (): Promise<GetAllPostsResponse> => {
    const res = await api.get<GetAllPostsResponse>("");
    return res.data;
  };

  return useQuery<GetAllPostsResponse, unknown>({ queryKey, queryFn });
};

export { useSendOtp, useCheckOtp, useGetPosts, useCreatePost, useGetAllPosts };
