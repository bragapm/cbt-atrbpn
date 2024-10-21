import BreadcrumbAdmin from "@/components/breadcrumb-admin";
import BankSoalPreviewSoal from "../components/BankSoalPreviewSoal";
import BankSoalChoices from "../components/BankSoalChoices";

const BankSoalPreview = () => {
  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAdmin
        items={[
          { label: "Daftar Soal", href: "/bank-soal" },
          { label: "Preview Soal" },
        ]}
      />

      <div className="flex flex-col gap-2">
        <BankSoalPreviewSoal />
        <BankSoalChoices />
      </div>
    </div>
  );
};

export default BankSoalPreview;
