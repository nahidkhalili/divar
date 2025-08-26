import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../config/api";

const useAddCategory = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => {
    const response = api.post("category", data);
    return response;
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["category-list"] });
  };
  return useMutation({ mutationFn, onSuccess });
};

const useGetCategory = () => {
  const queryKey = ["category-list"];
  const queryFn = () => {
    const response = api.get("category").then((response) => response.data);
    return response;
  };
  return useQuery({ queryKey, queryFn });
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const mutationFn = (id) => {
    const response = api.delete(`category/${id}`);
    return response;
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["category-list"] });
  };
  return useMutation({ mutationFn, onSuccess });
};

export { useAddCategory, useGetCategory, useDeleteCategory };
