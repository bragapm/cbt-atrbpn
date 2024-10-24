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
import { ManagementPesertaList } from "@/app/admin/management-peserta/pages/ManagementPesertaList";
import { CreatePesertaPage } from "@/app/admin/management-peserta/pages/CreatePesertaPage";
import { EditPesertaPage } from "@/app/admin/management-peserta/pages/EditPesertaPage";
import { ImportPesertaPage } from "@/app/admin/management-peserta/pages/ImportPesertaPage";

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
      {
        path: "peserta-cbt",
        element: <ManagementPesertaList />,
      },
      {
        path: "peserta-cbt/create",
        element: <CreatePesertaPage />,
      },
      {
        path: "peserta-cbt/edit/:pesertaId",
        element: <EditPesertaPage />,
      },
      {
        path: "peserta-cbt/import",
        element: <ImportPesertaPage />,
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
    ],
  },
]);

export default router;
