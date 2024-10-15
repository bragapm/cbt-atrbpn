import LoginPage from "@/app/admin/authentication/pages/LoginPage";
import DashboardPage from "@/app/admin/dashboard/pages/DashboardPage";
import AdminLayout from "@/layouts/AdminLayout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
