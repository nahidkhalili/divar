/* eslint-disable react/prop-types */
import type { Category } from "../../services/admin";

type SidebarProps = {
  categoryData?: Category[];
};

const Sidebar = ({ categoryData }: SidebarProps): JSX.Element => {
  return (
    <div className="mt-[30px] w-[200px]">
      <h4>دسته ها</h4>
      <ul>
        {categoryData?.map((category) => (
          <li className="flex my-[20px]" key={category._id}>
            <img src={`${category.icon}.svg`} />
            <p className="font-medium mr-[10px] text-gray-500">
              {category.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
