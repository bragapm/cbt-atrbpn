import TableActions from "@/components/table-actions";
import { Button } from "@/components/ui/button";
import { Cloud, Plus } from "lucide-react";
import DistribusiSoalTable from "../components/DistribusiSoalTable";
import useGetManagementDistribusiSoal from "../hooks/useGetManagementDistribusiSoal";
import { useState } from "react";

const limit: number = 20;

const DistribusiSoalPage = () => {
  const [page, setPage] = useState(1);

  const { data } = useGetManagementDistribusiSoal({
    page,
    limit,
  });

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <TableActions
        title="Management Pendistribusian Soal"
        description="Data ditampilkan sesuai dengan filter"
        actions={
          <div className="flex gap-2">
            <Button variant="actions" size="actions" startContent={<Cloud />}>
              Export Pendistribusian Soal
            </Button>

            <Button variant="actions" size="actions" startContent={<Plus />}>
              Tambah Pendistribusian Soal
            </Button>
          </div>
        }
      />
      <DistribusiSoalTable
        data={data?.data?.data}
        pagination={{
          pageSize: limit,
          totalItems: data?.data?.meta.total_count,
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
      />
    </div>
  );
};

export default DistribusiSoalPage;
