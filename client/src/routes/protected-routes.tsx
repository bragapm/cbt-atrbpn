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
import AdminLayout from "@/layouts/AdminLayout";
import { CreatePesertaPage } from "@/app/admin/management-peserta/pages/CreatePesertaPage";
import { EditPesertaPage } from "@/app/admin/management-peserta/pages/EditPesertaPage";
import { ImportPesertaPage } from "@/app/admin/management-peserta/pages/ImportPesertaPage";
import { ManagementHasilUjianPage } from "@/app/admin/management-hasil-ujian/pages/ManagementHasilUjianPage";
import { CreateCategorySoalPage } from "@/app/admin/management-kategori-soal/pages/CreateCategorySoalPage";
import { HasilAkhirUjianDetailPage } from "@/app/admin/management-hasil-ujian/pages/HasilAkhirUjianDetailPage";
import { HasilAkhirUjianPesertaPage } from "@/app/admin/management-hasil-ujian/pages/HasilAkhirUjianPesertaPage";
import { HasilAkhirJawabanPesertaPage } from "@/app/admin/management-hasil-ujian/pages/HasilAkhirJawabanPesertaPage";

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
        path: "bank-soal/preview/:id",
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
        path: "hasil-ujian/detail",
        element: <HasilAkhirUjianDetailPage />,
      },
      {
        path: "hasil-ujian/detail/:pesertaId",
        element: <HasilAkhirUjianPesertaPage />,
      },
      {
        path: "hasil-ujian/list-pertanyaan/:questionId",
        element: <HasilAkhirJawabanPesertaPage />,
      },
      {
        path: "tatib",
        element: <TatibPages />,
      },
      {
        path: "kategori-soal/create",
        element: <CreateCategorySoalPage />,
      },
    ],
  },
];
