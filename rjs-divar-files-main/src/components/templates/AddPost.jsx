import { useState } from "react";
import { useGetCategory } from "../../services/admin";
import Loader from "../modules/Loader";

const AddPost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    price: null,
    city: "",
    category: "",
    images: null,
  });

  // ================= REACT QUERY ===============//
  const { data, isLoading, error } = useGetCategory();
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

    if (name !== "images") {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("sent");

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

      <label className="block text-[0.9rem] mb-[10px]" htmlFor="price">
        قیمت
      </label>
      <input
        className="block w-[300px] p-[5px] border border-gray-500 rounded-md mb-[30px]"
        type="text"
        name="price"
        id="price"
        value={form.price}
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
        onChange={changeHandler}
      />
      <button
        className="bg-[var(--red-color)] text-white px-[25px] py-[10px] rounded-md text-[0.9rem] cursor-pointer"
        type="submit"
      >
        ایجاد
      </button>
    </form>
  );
};

export default AddPost;