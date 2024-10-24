import TableActions from "@/components/table-actions";
import { Button } from "@/components/ui/button";
import { Cloud, Plus } from "lucide-react";
import DistribusiSoalTable from "../components/DistribusiSoalTable";
import useGetManagementDistribusiSoal from "../hooks/useGetManagementDistribusiSoal";

const DistribusiSoalPage = () => {
  const { data } = useGetManagementDistribusiSoal();

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
      <DistribusiSoalTable data={data?.data?.data} />
    </div>
  );
};

export default DistribusiSoalPage;
