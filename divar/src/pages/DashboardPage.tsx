import AddPost from "../components/templates/AddPost";
import PostsList from "../components/templates/PostsList";

const DashboardPage = (): JSX.Element => {
  return (
    <div>
      <AddPost />
      <PostsList />
    </div>
  );
};

export default DashboardPage;
