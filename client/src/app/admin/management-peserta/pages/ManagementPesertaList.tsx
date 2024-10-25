import TableActions from "@/components/table-actions";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import PesertaCBTTable from "../components/PesertaTable";
import { useNavigate } from "react-router-dom";

export const ManagementPesertaList = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <TableActions
        title="Data Peserta CBT"
        description="Data ditampilkan sesuai dengan filter"
        actions={
          <div className="flex gap-2">
            <Button
              variant="actions"
              size="actions"
              startContent={<Upload size="14" />}
            >
              Export Data Peserta
            </Button>

            <Button
              variant="actions"
              size="actions"
              startContent={<Upload size="14" />}
              onClick={() => navigate("/peserta-cbt/import")}
            >
              Import Data Peserta
            </Button>

            <Button
              onClick={() => navigate("/peserta-cbt/create")}
              variant="actions"
              size="actions"
              startContent={<Plus />}
            >
              Tambah Peserta
            </Button>
          </div>
        }
      />
      <PesertaCBTTable />
    </div>
  );
};
