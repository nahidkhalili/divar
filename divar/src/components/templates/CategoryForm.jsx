import { useState } from "react";
import { useAddCategory } from "../../services/admin";

const CategoryForm = () => {
  const { mutate, isPending, error, data } = useAddCategory();
  console.log("add category", { isPending, error, data });
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.icon || !form.slug) return;
    mutate(form, {
      onError: (error) => {
        console.log("eeeerrr", error);
      },
      onSuccess: (data) => {
        console.log("Success:", data);
        setForm({ name: "", slug: "", icon: "" });
      },
    });
  };
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  return (
    <form onChange={changeHandler} onSubmit={submitHandler}>
      <h3 className="mb-[30px] border-b-[3px] border-solid border-[var(--red-color)] w-fit pb-[5px]">
        دسته بندی جدید
      </h3>
      {data?.status === "201" && (
        <p className="bg-[var(--red-color)] mb-[20px] text-white p-[5px] text-center rounded-md">
          دسته بندی افزوده شد
        </p>
      )}
      {!!error && (
        <p className="bg-[var(--red-color)] mb-[20px] text-white p-[5px] text-center rounded-md">
          خطا
        </p>
      )}
      <label className="block text-[0.9rem] mb-[10px]" htmlFor="name">
        اسم دسته بندی
      </label>
      <input
        className="block w-[300px] p-[5px] border border-solid border-gray-500 rounded-[5px] mb-[30px]"
        type="text"
        name="name"
        id="name"
        value={form.name}
      />
      <label className="block text-[0.9rem] mb-[10px]" htmlFor="slug">
        اسلاگ
      </label>
      <input
        className="block w-[300px] p-[5px] border border-solid border-gray-500 rounded-[5px] mb-[30px]"
        type="text"
        name="slug"
        id="slug"
        value={form.slug}
      />
      <label className="block text-[0.9rem] mb-[10px]" htmlFor="icon">
        آیکون{" "}
      </label>
      <input
        className="block w-[300px] p-[5px] border border-solid border-gray-500 rounded-[5px] mb-[30px]"
        type="text"
        name="icon"
        id="icon"
        value={form.icon}
      />
      <button
        disabled={isPending}
        className="bg-[var(--red-color)] text-white py-[10px] px-[25px] rounded-md text-[0.9rem] cursor-pointer disabled:opacity-50"
        type="submit"
      >
        ایجاد
      </button>
    </form>
  );
};

export default CategoryForm;
