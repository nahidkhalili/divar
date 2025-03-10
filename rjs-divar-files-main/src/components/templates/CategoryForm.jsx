import { useState } from "react";

const CategoryForm = () => {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(form);
  };
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  return (
    <form onChange={changeHandler} onSubmit={submitHandler}>
      <h3 className="mb-[30px] border-b-[3px] border-solid border-[var(--red-color)] w-fit pb-[5px]">
        دسته بندی جدید
      </h3>
      {/* <p className="bg-[var(--red-color)] mb-[20px] text-white p-[5px] text-center rounded-md"></p> */}
      <label className="block text-[0.9rem] mb-[10px]" htmlFor="name">
        اسم دسته بندی
      </label>
      <input
        className="block w-[300px] p-[5px] border border-solid border-gray-500 rounded-[5px] mb-[30px]"
        type="text"
        name="name"
        id="name"
      />
      <label className="block text-[0.9rem] mb-[10px]" htmlFor="slug">
        اسلاگ
      </label>
      <input
        className="block w-[300px] p-[5px] border border-solid border-gray-500 rounded-[5px] mb-[30px]"
        type="text"
        name="slug"
        id="slug"
      />
      <label className="block text-[0.9rem] mb-[10px]" htmlFor="icon">
        آیکون{" "}
      </label>
      <input
        className="block w-[300px] p-[5px] border border-solid border-gray-500 rounded-[5px] mb-[30px]"
        type="text"
        name="icon"
        id="icon"
      />
      <button className="bg-[var(--red-color)] text-white py-[10px] px-[25px] rounded-md text-[0.9rem] cursor-pointer" type="submit">ایجاد</button>
    </form>
  );
};

export default CategoryForm;
