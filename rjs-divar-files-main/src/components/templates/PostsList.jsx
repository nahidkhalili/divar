import { useGetPosts } from "../../services/user";
import Loader from "../modules/Loader";

const PostsList = () => {
  const { data, isLoading, error } = useGetPosts();
console.log(data)
  if (error) {
    console.log(error);
  }
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>لیست آگهی ها</h1>
          {data?.data.posts.map((post) => (
            <div key={post._id}>
              <img
                src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
                alt="image"
              />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div>
                <p>{post.createdAt}</p>
                <span>{post.amount} تومان</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostsList;
