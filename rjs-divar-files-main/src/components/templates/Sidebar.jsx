import {getCategory} from "../../services/admin";
import {useQuery} from '@tanstack/react-query';

const Sidebar = () => {
    const {data} = useQuery(["get-categories"] , getCategory)
  return (
    <div className="mt-[30px] w-[200px]">
        <h4>دسته ها</h4>
        <ul>
            {
                data?.data.map(category => (
                    <li className="flex my-[20px]" key={category._id}>
                        <img src={ `${category.icon}.svg`} />
                        <p className="font-light mr-[10px] text-gray-400">{category.name}</p>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Sidebar