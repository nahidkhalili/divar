import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import DashboardPage from "../pages/DashboardPage";
import PageNotFound from "../pages/404";
import AuthPage from "../pages/AuthPage";
import { useGetProfile } from "../services/queries";

const Router = () => {
  const { data, isLoading, error } = useGetProfile();
  console.log({ data, isLoading, error });
  if (isLoading) return <h1>data is loading...</h1>;
  // if (error) return <h1>خطا در بارگذاری داده‌ها: {error.message}</h1>;
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
