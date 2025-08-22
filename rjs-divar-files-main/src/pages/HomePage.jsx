import Sidebar from "../components/templates/Sidebar";
import Main from "../components/templates/Main";
import { useGetAllPosts } from "../services/user";
import Loader from "../components/modules/Loader";
import { useGetCategory } from "../services/admin";

const HomePage = () => {
  const { data:postData, isLoading:postLoading } = useGetAllPosts();
    const { data:categoryData , isLoading:categoryLoading } = useGetCategory();

console.log("first",postData , categoryData)
  return (
    <>
      {postLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row">
          <Sidebar categoryData={categoryData} />
          <Main  postData={postData} />
        </div>
      )}
    </>
  );
};

export default HomePage;
