import DashboardPage from "@/app/admin/dashboard/pages/DashboardPage";
import BankSoalPages from "@/app/admin/management-question-bank/pages/BankSoalPages";
import BankSoalImportPage from "@/app/admin/management-question-bank/pages/BankSoalImportPage";
import BankSoalCreatePage from "@/app/admin/management-question-bank/pages/BankSoalCreatePages";
import BankSoalEditPage from "@/app/admin/management-question-bank/pages/BankSoalEditPage";
import BankSoalPreview from "@/app/admin/management-question-bank/pages/BankSoalPreview";
import UjianPages from "@/app/admin/management-ujian/pages/UjianPages";
import UjianCreatePages from "@/app/admin/management-ujian/pages/UjianCreatePages";
import ExamCbtPage from "@/app/client/test-cbt/pages/ExamCbtPage";
import FinishExam from "@/app/client/test-cbt/pages/FinishExam";
import AdminLayout from "@/layouts/AdminLayout";
import ExamLayout from "@/layouts/ExamLayout";

export const protectedRoutes = [
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
        path: "bank-soal/create",
        element: <BankSoalCreatePage />,
      },
      {
        path: "bank-soal/edit",
        element: <BankSoalEditPage />,
      },
      {
        path: "bank-soal/preview",
        element: <BankSoalPreview />,
      },
      {
        path: "ujian",
        element: <UjianPages />,
      },
      {
        path: "ujian/create",
        element: <UjianCreatePages />,
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
        path: "finish",
        element: <FinishExam />,
      },
    ],
  },
];
