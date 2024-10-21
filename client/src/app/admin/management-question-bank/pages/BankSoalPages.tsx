import TableActions from "@/components/table-actions";
import BankSoalTable from "../components/BankSoalTable";
import { Button } from "@/components/ui/button";
import { Cloud, Plus } from "lucide-react";

const BankSoalPages = () => {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <TableActions
        title="Daftar Soal"
        description="Data ditampilkan sesuai dengan filter"
        actions={
          <div className="flex gap-2">
            <Button variant="actions" size="actions" startContent={<Cloud />}>
              Import Soal
            </Button>

            <Button variant="actions" size="actions" startContent={<Plus />}>
              Tambah Soal
            </Button>
          </div>
        }
      />
      <BankSoalTable />
    </div>
  );
};

export default BankSoalPages;
