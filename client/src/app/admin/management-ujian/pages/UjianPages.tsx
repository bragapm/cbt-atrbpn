import TableActions from "@/components/table-actions";
import UjianTable from "../components/UjianTable";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetManagementUjian from "../hooks/useGetManagementUjian";
import { useState } from "react";

const limit: number = 10;

const UjianPages = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetManagementUjian({
    page: page,
    limit: limit,
  });

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <TableActions
        title="Sesi Ujian"
        description="Data ditampilkan sesuai dengan filter"
        actions={
          <div className="flex gap-2">
            <Button
              variant="actions"
              size="actions"
              startContent={<Upload size="14" />}
              onClick={() => navigate("/ujian/create")}
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
