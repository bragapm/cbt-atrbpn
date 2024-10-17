import LoginPage from "@/app/admin/authentication/pages/LoginPage";
import DashboardPage from "@/app/admin/dashboard/pages/DashboardPage";
import BankSoalPages from "@/app/admin/management-question-bank/pages/BankSoalPages";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
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
      {
        path: "bank-soal",
        element: <BankSoalPages />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
