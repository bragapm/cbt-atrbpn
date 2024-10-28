import TableActions from "@/components/table-actions";
import UjianTable from "../components/UjianTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetManagementUjian from "../hooks/useGetManagementUjian";

const UjianPages = () => {
  const navigate = useNavigate();
  const { data } = useGetManagementUjian();

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
              startContent={<Plus />}
              onClick={() => navigate("/ujian/create")}
            >
              Tambah Sesi Ujian
            </Button>
          </div>
        }
      />
      <UjianTable data={data?.data?.data} />
    </div>
  );
};

export default UjianPages;
