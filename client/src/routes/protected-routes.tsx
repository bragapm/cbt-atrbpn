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
import CategorySoalPage from "@/app/admin/management-kategori-soal/pages/CategorySoalPage";
import AdminLayout from "@/layouts/AdminLayout";
import { CreatePesertaPage } from "@/app/admin/management-peserta/pages/CreatePesertaPage";
import { EditPesertaPage } from "@/app/admin/management-peserta/pages/EditPesertaPage";
import { ImportPesertaPage } from "@/app/admin/management-peserta/pages/ImportPesertaPage";
import { CreateCategorySoalPage } from "@/app/admin/management-kategori-soal/pages/CreateCategorySoalPage";
import { HasilAkhirUjianDetailPage } from "@/app/admin/management-hasil-ujian/pages/HasilAkhirUjianDetailPage";
import { HasilAkhirUjianPesertaPage } from "@/app/admin/management-hasil-ujian/pages/HasilAkhirUjianPesertaPage";
import { HasilAkhirJawabanPesertaPage } from "@/app/admin/management-hasil-ujian/pages/HasilAkhirJawabanPesertaPage";
import { EditCategorySoalPage } from "@/app/admin/management-kategori-soal/pages/EditCategorySoalPage";
import { CreateDistribusiSoalPage } from "@/app/admin/management-pendistribusian-soal/pages/CreateDistribusiSoalPage";
import { EditDistribusiSoalPage } from "@/app/admin/management-pendistribusian-soal/pages/UpdateDistribusiSoalPage";
import UjianEditPage from "@/app/admin/management-ujian/pages/UjianEditPage";
import { HasilAkhirUjianPage } from "@/app/admin/management-hasil-ujian/pages/HasilAkhirUjianPage";
import { HasilAkhirJawabanPage } from "@/app/admin/management-hasil-ujian/pages/HasilAkhirJawabanPage";
import AdminDataPages from "@/app/admin/management-admin/pages/AdminDataPages";
import { CreateAdminAccount } from "@/app/admin/management-admin/pages/CreateAdminAccount";

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
        path: "bank-soal/edit/:id",
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
        path: "ujian/edit/:id",
        element: <UjianEditPage />,
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
        path: "hasil-ujian/hasil-akhir-ujian",
        element: <HasilAkhirUjianPage />,
      },
      {
        path: "hasil-ujian/list-pertanyaan",
        element: <HasilAkhirJawabanPage />,
      },
      {
        path: "hasil-ujian/hasil-akhir-ujian/detail",
        element: <HasilAkhirUjianDetailPage />,
      },
      {
        path: "hasil-ujian/hasil-akhir-ujian/detail/:pesertaId",
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
        path: "kategori-soal",
        element: <CategorySoalPage />,
      },
      {
        path: "kategori-soal/create",
        element: <CreateCategorySoalPage />,
      },
      {
        path: "kategori-soal/edit/:id",
        element: <EditCategorySoalPage />,
      },
      {
        path: "pendistribusian-soal/create",
        element: <CreateDistribusiSoalPage />,
      },
      {
        path: "pendistribusian-soal/edit/:distribusiSoalId",
        element: <EditDistribusiSoalPage />,
      },
      {
        path: "admin",
        element: <AdminDataPages />,
      },
      {
        path: "admin/create",
        element: <CreateAdminAccount />,
      },
      {
        path: "admin/edit/:id",
        element: <CreateAdminAccount />,
      },
    ],
  },
];
