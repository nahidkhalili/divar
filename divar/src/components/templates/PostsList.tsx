import { useGetPosts } from "../../services/user";
import { sp } from "../../utils/number";
import Loader from "../modules/Loader";

const PostsList = (): JSX.Element => {
  const { data, isLoading, error } = useGetPosts();
  console.log("posts:", data);
  if (error) {
    console.log(error);
  }
  if (isLoading) {
    console.log("isLoading...");
  }
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="mb-[30px] border-b-[3px] border-b-[var(--red-color)] w-fit pb-[5px]">
            لیست آگهی ها
          </h1>
          <div className="flex flex-col gap-3">
            {data?.posts.map((post) => (
              <div
                className="border border-gray-400 rounded-xl p-2 flex flex-row justify-between items-center"
                key={post._id}
              >
                <div className="flex flex-row items-center">
                  {post.images && post.images.length > 0 && (
                    <img
                      className="ml-6 w-[100px] h-[70px] rounded-[3px]"
                      src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
                      alt="image"
                    />
                  )}

                  <div>
                    <p>{post.options?.title}</p>
                    <span className="text-gray-400">
                      {post.options?.content}
                    </span>
                  </div>
                </div>

                <div className="text-left">
                  <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                  <span className="text-gray-400">{sp(post.amount)} تومان</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostsList;
