import BreadcrumbAdmin from "@/components/breadcrumb-admin";
import BankSoalPreviewSoal from "../components/BankSoalPreviewSoal";
import BankSoalChoices from "../components/BankSoalChoices";
import useGetBankSoalPreview from "../hooks/useGetBankSoalPreview";
import { useParams } from "react-router-dom";

const BankSoalPreview = () => {
  const { id } = useParams();

  // Tambahkan validasi untuk memastikan id tersedia
  const { data, isLoading, error } = useGetBankSoalPreview(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Terjadi kesalahan saat memuat data.</p>;

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAdmin
        items={[
          { label: "Daftar Soal", href: "/bank-soal" },
          { label: "Preview Soal" },
        ]}
      />

      <div className="flex flex-col gap-2">
        <BankSoalPreviewSoal data={data?.questionBank.data} />
        <BankSoalChoices data={data?.questionChoices.data} />
      </div>
    </div>
  );
};

export default BankSoalPreview;
