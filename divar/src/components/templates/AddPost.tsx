import { useState } from "react";
import { useGetCategory } from "../../services/admin";
import Loader from "../modules/Loader";

import toast from "react-hot-toast";
import { useCreatePost } from "../../services/user";
import { Category } from "../../services/admin";
import type { AxiosError } from "axios";

//=============== TYPES ================//
type FormState = {
  title: string;
  content: string;
  amount: string;
  city: string;
  category: string;
  images: File | null;
};

// type Category = {
//   _id: string;
//   name: string;
// };

const AddPost = (): JSX.Element => {
  const [form, setForm] = useState<FormState>({
    title: "",
    content: "",
    amount: "",
    city: "",
    category: "",
    images: null,
  });

  const resetForm = () =>
    setForm({
      title: "",
      content: "",
      amount: "",
      city: "",
      category: "",
      images: null,
    });

  // ================= REACT QUERY ===============//
  const { data, isLoading, error } = useGetCategory();
  const { mutate } = useCreatePost();
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // ===================== FUNCTIONS ===============//

  const changeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = event.target as HTMLInputElement;

    if (name === "images" && files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "amount") {
        formData.append(key, String(value));
      } else if (value) {
        formData.append(key, value as any);
      }
    });

    console.log(formData);
    mutate(formData, {
      onSuccess: (res) => {
        toast.success(res.data.message);
        resetForm();
      },
      onError: (err) => {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error.response?.data?.message || "خطایی رخ داد");
      },
    });
  };

  // ====================== JSX =========================//
  return (
    <form onSubmit={submitHandler}>
      <h3 className="mb-[30px] border-b-[3px] border-b-[var(--red-color)] w-fit pb-[5px]">
        افزودن آگهی
      </h3>
      <label className="block text-[0.9rem] mb-[10px]" htmlFor="title">
        عنوان
      </label>
      <input
        className="block w-[300px] p-[5px] border border-gray-500 rounded-md mb-[30px]"
        type="text"
        name="title"
        id="title"
        value={form.title}
        onChange={changeHandler}
      />

      <label className="block text-[0.9rem] mb-[10px]" htmlFor="content">
        توضیحات
      </label>
      <textarea
        className="block h-[100px] w-[300px] p-[5px] border border-gray-500 rounded-md mb-[30px]"
        name="content"
        id="content"
        value={form.content}
        onChange={changeHandler}
      />

      <label className="block text-[0.9rem] mb-[10px]" htmlFor="amount">
        قیمت
      </label>
      <input
        className="block w-[300px] p-[5px] border border-gray-500 rounded-md mb-[30px]"
        type="number"
        name="amount"
        id="amount"
        value={form.amount}
        onChange={changeHandler}
      />

      <label className="block text-[0.9rem] mb-[10px]" htmlFor="city">
        شهر
      </label>
      <input
        className="block w-[300px] p-[5px] border border-gray-500 rounded-md mb-[30px]"
        type="text"
        name="city"
        id="city"
        value={form.city}
        onChange={changeHandler}
      />

      <label className="block text-[0.9rem] mb-[10px]" htmlFor="category">
        دسته بندی
      </label>
      <select
        className="block w-[300px] p-[5px] border border-gray-500 rounded-md mb-[30px]"
        name="category"
        id="category"
        value={form.category}
        onChange={changeHandler}
      >
        <option value="">لطفا یک دسته‌بندی انتخاب کنید</option>
        {data.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      <label className="block text-[0.9rem] mb-[10px]" htmlFor="images">
        عکس
      </label>
      <input
        className="block w-[300px] p-[5px] border border-gray-500 rounded-md mb-[30px]"
        type="file"
        name="images"
        id="images"
        accept="image/*"
        onChange={changeHandler}
      />
      <button
        className="bg-[var(--red-color)] text-white px-[25px] py-[10px] rounded-md text-[0.9rem] cursor-pointer mb-14"
        type="submit"
      >
        ایجاد
      </button>
    </form>
  );
};

export default AddPost;
