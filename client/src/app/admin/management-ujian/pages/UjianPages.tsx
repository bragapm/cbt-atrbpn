import TableActions from "@/components/table-actions";
import UjianTable from "../components/UjianTable";
import { Button } from "@/components/ui/button";
import { Download, Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetManagementUjian from "../hooks/useGetManagementUjian";
import { useState } from "react";
import ConfirmationDialog from "@/components/confirmation-dialog";
import useGetExportUjian from "@/app/admin/management-ujian/hooks/useGetExportUjian";

const limit: number = 10;

const UjianPages = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isOpenExportDialog, setIsOpenExportDialog] = useState(false);
  const { mutate: fetchExportUjian, isLoading: isFetchingExportUjian } =
    useGetExportUjian();

  const { data, isLoading } = useGetManagementUjian({
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
        isLoading={isFetchingExportUjian}
        onSubmit={() => fetchExportUjian()}
      />
      <TableActions
        title="Sesi Ujian"
        description="Data ditampilkan sesuai dengan filter"
        actions={
          <div className="flex gap-2">
            <Button
              variant="actions"
              size="actions"
              startContent={<Upload size="14" />}
              onClick={() => setIsOpenExportDialog(true)}
            >
              Export Sesi Ujian
            </Button>
            <Button
              variant="actions"
              size="actions"
              startContent={<Plus />}
              onClick={() => navigate("/ujian/create")}
            >
              Tambah Sesi Ujian
            </Button>
          </div>
        }
      />
      <UjianTable
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

export default UjianPages;
