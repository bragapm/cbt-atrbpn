/* eslint-disable react-hooks/rules-of-hooks */
import TableActions from "@/components/table-actions";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import PesertaCBTTable from "../components/PesertaTable";
import { useNavigate } from "react-router-dom";
import useGetUserSessionTestQueries from "../hooks/useGetUserSessionTestQueries";
import { useState } from "react";
import { useExportUserSessionTest } from "../hooks/useExportUserSessionTest";
import TableSearch from "@/components/table-search";
import { useDebounceSearch } from "@/hooks/useDebounce";

const PAGE_LIMIT = 10;

export const ManagementPesertaList = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounceSearch({ value: search });
  const [sortName, setSortName] = useState<boolean | null>(false);

  const navigate = useNavigate();

  const { data: pesertaCbt } = useGetUserSessionTestQueries({
    limit: PAGE_LIMIT,
    page,
    search: debouncedSearch,
    sort: sortName,
  });

  const handleDownloadPeserta = () => {
    useExportUserSessionTest();
  };

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
              onClick={handleDownloadPeserta}
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
      <div className="flex w-full justify-end">
        <TableSearch value={search} onChange={setSearch} />
      </div>
      <PesertaCBTTable
        userSessionTest={pesertaCbt?.data?.data}
        currentPage={page}
        pageLimit={PAGE_LIMIT}
        totalData={pesertaCbt?.data?.meta?.total_count}
        onChangePage={(val) => setPage(val)}
        onSort={setSortName}
      />
    </div>
  );
};
