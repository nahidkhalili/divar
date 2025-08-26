import Main from "../components/templates/Main";
import { useGetAllPosts } from "../services/user";

import { useGetCategory } from "../services/admin";
import Loader from "../components/modules/Loader";
import Sidebar from "../components/templates/Sidebar";

const HomePage = () => {
  const { data: postData, isLoading: postLoading } = useGetAllPosts();
  const { data: categoryData, isLoading: categoryLoading } = useGetCategory();

  console.log(
    "received data",
    "categoryData:",
    categoryData,
    "categoryLoading",
    categoryLoading,
    "postData:",
    postData?.data?.posts,
    "postLoading:",
    postLoading
  );
  return (
    <>
      {postLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row">
          <Sidebar categoryData={categoryData}
          
          />
          <Main postData={postData} />
        </div>
      )}
    
    </>
  );
};

export default HomePage;
