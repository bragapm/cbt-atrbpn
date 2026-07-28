import { DataHasilAkhirUjianPesertaTable } from "../components/DataHasilAkhirUjianPesertaTable";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { downloadExport, exportEndpoints } from "@/lib/utils";
import { Download, Upload } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const hasilUjianTab = [
  {
    name: "Data Hasil Akhir Ujian Peserta",
    path: "/hasil-ujian/hasil-akhir-ujian",
  },
  {
    name: "Data Hasil Akhir Jawaban Peserta",
    path: "/hasil-ujian/list-pertanyaan",
  },
];

export const HasilAkhirUjianPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpenExportDialog, setIsOpenExportDialog] = useState(false);

  return (
    <div className="w-full h-full flex flex-col gap-3 pt-1">
      <ConfirmationDialog
        isOpen={isOpenExportDialog}
        onOpenChange={setIsOpenExportDialog}
        description="Apakah anda yakin ingin mengekspor data?"
        icon={<Download size="30" className="text-primary" />}
        onSubmit={() => downloadExport(exportEndpoints.hasilAkhirUjian)}
        closeOnSubmit
      />
      <Breadcrumbs
        paths={[
          { label: "Management Hasil Ujian" },
          { label: "Hasil AKhir Ujian" },
        ]}
      />
      <div className="flex justify-between">
        <div className="flex gap-3  mb-[-40px] ">
          {hasilUjianTab.map((item, idx) => (
            <p
              onClick={() => navigate(item.path)}
              key={idx}
              className={`cursor-pointer text-sm  p-4 rounded-2xl pb-10 ${
                pathname === item.path ? "bg-white" : "bg-transparent"
              }`}
            >
              {item.name}
            </p>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant="actions"
            size="actions"
            startContent={<Upload />}
            onClick={() => setIsOpenExportDialog(true)}
          >
            Export Hasil Akhir Ujian
          </Button>
          <Button
            variant="ghost"
            className=" text-primary "
            onClick={() => navigate("/hasil-ujian/hasil-akhir-ujian/detail")}
          >
            Lihat Detail Hasil Ujian
          </Button>
        </div>
      </div>
      <DataHasilAkhirUjianPesertaTable />
    </div>
  );
};
