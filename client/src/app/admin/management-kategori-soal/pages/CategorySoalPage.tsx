import ConfirmationDialog from "@/components/confirmation-dialog";
import TableActions from "@/components/table-actions";
import { Button } from "@/components/ui/button";
import { Download, Plus, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategorySoalTable from "../components/CategorySoalTable";
import useGetCategorySoal from "../hooks/useGetCategorySoal";
import TableSearch from "@/components/table-search";
import { useDebounceSearch } from "@/hooks/useDebounce";

const limit: number = 10;

const CategorySoalPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isOpenExportDialog, setIsOpenExportDialog] = useState(false);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounceSearch({ value: search });

  const { data, isLoading, refetch } = useGetCategorySoal({
    page: page,
    limit: limit,
    search: debouncedSearch,
  });

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <ConfirmationDialog
        isOpen={isOpenExportDialog}
        onOpenChange={setIsOpenExportDialog}
        description="Apakah anda yakin ingin mengekspor data?"
        icon={<Download size="30" className="text-primary" />}
        onSubmit={() => {
          window.location.href =
            import.meta.env.VITE_DIRECTUS_PUBLIC_URL + "/export-session";
        }}
      />
      <TableActions
        title="Management Kategori Soal"
        description="Data ditampilkan sesuai dengan filter"
        actions={
          <div className="flex gap-2">
            <Button
              variant="actions"
              size="actions"
              startContent={<Upload />}
              onClick={() => setIsOpenExportDialog(true)}
            >
              Export Kategori Soal
            </Button>
            <Button
              variant="actions"
              size="actions"
              startContent={<Plus />}
              onClick={() => navigate("/kategori-soal/create")}
            >
              Tambah Kategori Soal
            </Button>
          </div>
        }
      />
      <div className="flex w-full justify-end">
        <TableSearch value={search} onChange={setSearch} />
      </div>
      <CategorySoalTable
        data={data?.data.data}
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

export default CategorySoalPage;
