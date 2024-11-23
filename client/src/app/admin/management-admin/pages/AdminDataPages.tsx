import ConfirmationDialog from "@/components/confirmation-dialog";
import TableActions from "@/components/table-actions";
import { Button } from "@/components/ui/button";
import { Download, Plus, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableSearch from "@/components/table-search";
import { useDebounceSearch } from "@/hooks/useDebounce";
import AdminListTable from "../components/AdminListTable";
import useGetDataListAdmin from "../hooks/useGetDataListAdmin";

const limit: number = 50;

const AdminDataPages = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounceSearch({ value: search });

  const { data, isLoading, refetch } = useGetDataListAdmin({
    page: page,
    limit: limit,
    search: debouncedSearch,
  });

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <TableActions
        title="Management Admin"
        description="Data ditampilkan sesuai dengan filter"
        actions={
          <div className="flex gap-2">
            <Button
              variant="actions"
              size="actions"
              startContent={<Plus />}
              onClick={() => navigate("/admin/create")}
            >
              Tambah Akun Admin
            </Button>
          </div>
        }
      />
      <div className="flex w-full justify-end">
        <TableSearch value={search} onChange={setSearch} />
      </div>
      <AdminListTable
        data={data?.data.data}
        isLoading={isLoading}
        pagination={{
          pageSize: limit,
          totalItems: data?.data?.pagination?.total,
          onPageChange: (page) => setPage(page),
          currentPage: page,
        }}
        refetch={refetch}
      />
    </div>
  );
};

export default AdminDataPages;
