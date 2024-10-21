import LoginPage from "@/app/admin/authentication/pages/LoginPage";
import DashboardPage from "@/app/admin/dashboard/pages/DashboardPage";
import LoginParticipant from "@/app/client/authentication/pages/LoginParticipant";
import ExamCbtPage from "@/app/client/test-cbt/pages/ExamCbtPage";
import BankSoalImportPage from "@/app/admin/management-question-bank/pages/BankSoalImportPage";
import BankSoalPages from "@/app/admin/management-question-bank/pages/BankSoalPages";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ExamLayout from "@/layouts/ExamLayout";
import { createBrowserRouter } from "react-router-dom";
import FinishExam from "@/app/client/test-cbt/pages/FinishExam";
import PinPage from "@/app/client/test-cbt/pages/PinPage";
import ExamTutorial from "@/app/client/tutorial/pages/ExamTutorial";

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
      {
        path: "bank-soal/import",
        element: <BankSoalImportPage />,
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
  {
    path: "/exam",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginParticipant />,
      },
      {
        path: "finish",
        element: <FinishExam />,
      },
      {
        path: "pin",
        element: <PinPage />,
      },
    ],
  },
  {
    path: "/exam",
    element: <ExamLayout />,
    children: [
      {
        index: true,
        element: <ExamCbtPage />,
      },
      {
        path: "tutorial",
        element: <ExamTutorial />,
      },
    ],
  },
]);

export default router;
