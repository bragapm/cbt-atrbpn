import TableActions from "@/components/table-actions";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import DistribusiSoalTable from "../components/DistribusiSoalTable";
import useGetManagementDistribusiSoal from "../hooks/useGetManagementDistribusiSoal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const limit: number = 20;

const DistribusiSoalPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetManagementDistribusiSoal({
    page: page,
    limit: limit,
  });

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <TableActions
        title="Management Pendistribusian Soal"
        description="Data ditampilkan sesuai dengan filter"
        actions={
          <div className="flex gap-2">
            <Button variant="actions" size="actions" startContent={<Upload />}>
              Export Pendistribusian Soal
            </Button>

            <Button
              onClick={() => navigate("/pendistribusian-soal/create")}
              variant="actions"
              size="actions"
              startContent={<Plus />}
            >
              Tambah Pendistribusian Soal
            </Button>
          </div>
        }
      />
      <DistribusiSoalTable
        data={data?.data?.data}
        isLoading={isLoading}
        pagination={{
          pageSize: limit,
          totalItems: data?.data?.meta.total_count,
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
        refetch={refetch}
      />
    </div>
  );
};

export default DistribusiSoalPage;
