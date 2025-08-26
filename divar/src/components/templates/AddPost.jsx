import { useState } from "react";
import { useGetCategory } from "../../services/admin";
import Loader from "../modules/Loader";

import toast from "react-hot-toast";
import { useCreatePost } from "../../services/user";

const AddPost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: null,
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

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("value:", value);

    if (name !== "images") {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i in form) {
      if (i === "amount") {
        formData.append(i, Number(form[i]));
      } else {
        formData.append(i, form[i]);
      }
    }
    console.log(formData);
    mutate(formData, {
      onSuccess: (res) => {
        toast.success(res.data.message);
        resetForm();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "خطایی رخ داد");
      },
    });
    //   const token = getCookie("accessToken");
    //   console.log("Token:", token);
    //   axios
    //     .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `bearer ${token}`,
    //       },
    //     })
    //     .then((res) => {
    //       toast.success(res.data.message);
    //       setForm({
    //         title: "",
    //         content: "",
    //         amount: null,
    //         city: "",
    //         category: "",
    //         images: null,
    //       });
    //     })
    //     .catch((err) => toast.error(err));
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
