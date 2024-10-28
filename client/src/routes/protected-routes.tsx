import DashboardPage from "@/app/admin/dashboard/pages/DashboardPage";
import DistribusiSoalPage from "@/app/admin/management-pendistribusian-soal/pages/DistribusiSoalPage";
import { ManagementPesertaList } from "@/app/admin/management-peserta/pages/ManagementPesertaList";
import BankSoalCreatePage from "@/app/admin/management-question-bank/pages/BankSoalCreatePages";
import BankSoalEditPage from "@/app/admin/management-question-bank/pages/BankSoalEditPage";
import BankSoalImportPage from "@/app/admin/management-question-bank/pages/BankSoalImportPage";
import BankSoalPages from "@/app/admin/management-question-bank/pages/BankSoalPages";
import BankSoalPreview from "@/app/admin/management-question-bank/pages/BankSoalPreview";
import TatibPages from "@/app/admin/management-tatib/pages/TatibPages";
import UjianCreatePages from "@/app/admin/management-ujian/pages/UjianCreatePages";
import UjianPages from "@/app/admin/management-ujian/pages/UjianPages";
import ExamCbtPage from "@/app/client/test-cbt/pages/ExamCbtPage";
import FinishExam from "@/app/client/test-cbt/pages/FinishExam";
import PinPage from "@/app/client/test-cbt/pages/PinPage";
import AdminLayout from "@/layouts/AdminLayout";
import ExamLayout from "@/layouts/ExamLayout";
import ExamTutorial from "@/app/client/tutorial/pages/ExamTutorial";
import { CreatePesertaPage } from "@/app/admin/management-peserta/pages/CreatePesertaPage";
import { EditPesertaPage } from "@/app/admin/management-peserta/pages/EditPesertaPage";
import { ImportPesertaPage } from "@/app/admin/management-peserta/pages/ImportPesertaPage";
import { ManagementHasilUjianPage } from "@/app/admin/management-hasil-ujian/pages/ManagementHasilUjianPage";

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
      {
        path: "pendistribusian-soal",
        element: <DistribusiSoalPage />,
      },
      {
        path: "hasil-ujian",
        element: <ManagementHasilUjianPage />,
      },
      {
        path: "tatib",
        element: <TatibPages />,
      },
      {
        path: "pendistribusian-soal/create",
        element: <ManagementHasilUjianPage />,
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
      {
        path: "tutorial",
        element: <ExamTutorial />,
      },
      {
        path: "pin",
        element: <PinPage />,
      },
    ],
  },
];
