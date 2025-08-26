/* eslint-disable react/prop-types */

import { sp } from "../../utils/number";

const Main = ({ postData }) => {
  return (
    <div className="flex flex-wrap justify-between mt-[20px] w-[calc(100%-200px)]">
      {postData?.data?.posts.map((post) => (
        <div
          className="w-[330px] flex justify-between border border-[#eaeaea] rounded-2xl m-[10px] p-[15px]"
          key={post._id}
        >
          <div className="flex flex-col justify-between">
            <p>{post.options?.title}</p>

            <div className="text-gray-500">
              <p>{sp(post.amount)} تومان</p>
              <span>{post.options?.city}</span>
            </div>
          </div>
          <img
            className="w-[150px] h-[130px] rounded-lg"
            src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Main;
