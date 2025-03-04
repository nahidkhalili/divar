import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import DashboardPage from "../pages/DashboardPage";
import PageNotFound from "../pages/404";
import AuthPage from "../pages/AuthPage";
import { useGetProfile } from "../services/queries";

const Router = () => {
  const { data, isLoading } = useGetProfile();

  console.log({ data, isLoading });

  if (isLoading) return <h1>data is loading...</h1>;
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
