import TableActions from "@/components/table-actions";
//import BankSoalTable from "../components/BankSoalTable";
import { Button } from "@/components/ui/button";
import { Cloud, Plus } from "lucide-react";
import DistribusiSoalTable from "../components/DistribusiSoalTable";

const DistribusiSoalPage = () => {
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
      <DistribusiSoalTable />
    </div>
  );
};

export default DistribusiSoalPage;
