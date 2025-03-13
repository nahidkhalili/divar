import { useGetCategory } from "../../services/admin";
import Loader from "../modules/Loader";

const CategoryList = () => {
  const { data, error, isLoading } = useGetCategory();
  console.log("categoryList", data);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-[50px] mb-[70px] ">
      <h1 className="mb-[30px] border-b-[3px] border-solid border-[var(--red-color)] w-fit pb-[5px]">
        دسته بندی ها
      </h1>
      <ul>
        {data?.map((category) => (
          <li key={category._id}>
            <div className="flex my-[20px] p-[15px] border-2 border-solid border-[#eaeaea] rounded-md">
              <img src={`${category.icon}.svg`} alt="" />
              <h5 className="mr-[10px] text-[0.9rem] w-[120px]">
                {category.name}
              </h5>
              <p className="w-full text-left text-[var(--red-color)]">
                {category.slug}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
