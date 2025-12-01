import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../config/api";
import { QUERY_KEYS } from "../constants/queryKeys";


//==================== TYPES ======================//
export type Category = {
  _id: string;
  name: string;
  slug: string;
  icon: string;
};

type NewCategory = {
  status: number;
  message: string;
  data: Category;
};

type DeleteResponse = {
  message: string;
};

//================ ADD CATEGORY ===================//
const useAddCategory = () => {
  const queryClient = useQueryClient();
  const mutationFn = async (data: {
    name: string;
    slug: string;
    icon: string;
  }): Promise<NewCategory> => {
    const response = await api.post<NewCategory>("category", data);
    return response.data;
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_CATEGORY_LIST });
  };
  return useMutation({ mutationFn, onSuccess });
};

//=============== GET CATEGORY ==================//

const useGetCategory = () => {
  const queryKey = QUERY_KEYS.GET_CATEGORY_LIST;
  const queryFn = async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("category");
    return response.data; // { data: Category[] }
  };
  return useQuery<Category[], Error>({ queryKey, queryFn });
};

//====================== DELETE CATEGORY =================//
const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const mutationFn = async (id: string): Promise<DeleteResponse> => {
    const response = await api.delete<DeleteResponse>(`category/${id}`);
    return response.data;
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_CATEGORY_LIST });
  };
  return useMutation({ mutationFn, onSuccess });
};

export { useAddCategory, useGetCategory, useDeleteCategory };
