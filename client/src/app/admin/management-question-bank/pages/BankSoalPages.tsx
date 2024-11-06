import ConfirmationDialog from "@/components/confirmation-dialog";
import TableActions from "@/components/table-actions";
import { Button } from "@/components/ui/button";
import { Cloud, Download, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BankSoalTable from "../components/BankSoalTable";
import useGetManagementBankSoal from "../hooks/useGetManagementBankSoal";

const limit: number = 20;

const BankSoalPages = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isOpenExportDialog, setIsOpenExportDialog] = useState(false);

  const { data, isLoading } = useGetManagementBankSoal({
    page: page,
    limit: limit,
  });

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <ConfirmationDialog
        isOpen={isOpenExportDialog}
        onOpenChange={setIsOpenExportDialog}
        description="Apakah anda yakin ingin mengekspor data?"
        icon={<Download size="30" className="text-primary" />}
        onSubmit={() => {
          window.location.href =
            import.meta.env.VITE_DIRECTUS_PUBLIC_URL + "/export-pertanyaan";
        }}
      />
      <TableActions
        title="Daftar Soal"
        description="Data ditampilkan sesuai dengan filter"
        actions={
          <div className="flex gap-2">
            <Button
              variant="actions"
              size="actions"
              startContent={<Cloud />}
              onClick={() => navigate("/bank-soal/import")}
            >
              Import Soal
            </Button>

            <Button
              variant="actions"
              size="actions"
              startContent={<Cloud />}
              onClick={() => setIsOpenExportDialog(true)}
            >
              Export Soal
            </Button>

            <Button
              variant="actions"
              size="actions"
              startContent={<Plus />}
              onClick={() => navigate("/bank-soal/create")}
            >
              Tambah Soal
            </Button>
          </div>
        }
      />
      <BankSoalTable
        data={data?.data}
        isLoading={isLoading}
        pagination={{
          pageSize: limit,
          totalItems: data?.meta.total_count,
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
      />
    </div>
  );
};

export default BankSoalPages;
