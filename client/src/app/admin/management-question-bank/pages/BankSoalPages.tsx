import TableActions from "@/components/table-actions";
import BankSoalTable from "../components/BankSoalTable";
import { Button } from "@/components/ui/button";
import { Cloud, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetManagementBankSoal from "../hooks/useGetManagementBankSoal";
import { useState } from "react";

const limit: number = 20;

const BankSoalPages = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetManagementBankSoal({
    page: page,
    limit: limit,
  });

  return (
    <div className="w-full h-full flex flex-col gap-3">
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
              onClick={() => navigate("/bank-soal/export")}
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
