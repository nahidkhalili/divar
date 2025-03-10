import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import DashboardPage from "../pages/DashboardPage";
import PageNotFound from "../pages/404";
import AuthPage from "../pages/AuthPage";
import { useGetProfile } from "../services/queries";
import Loader from "../components/modules/Loader";

const Router = () => {
  const { data, isLoading, error } = useGetProfile();
  console.log("hi", { data, isLoading, error });
  if (isLoading) return <Loader />;
  // if (error) return <h1>خطا در بارگذاری داده‌ها: {error.message}</h1>;
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
