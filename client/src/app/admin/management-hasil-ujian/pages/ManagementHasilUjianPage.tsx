import TableActions from "@/components/table-actions";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DataHasilAkhirUjianPesertaTable } from "../components/DataHasilAkhirUjianPesertaTable";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useState } from "react";
import { DataHasilAkhirJawabanPesertaTable } from "../components/DataHasilAkhirJawabanPesertaTable";

enum HasilUjianTab {
  UJIAN_PESERTA = "Data Hasil Akhir Ujian Peserta",
  JAWABAN_PESERTA = "Data Hasil Akhir Jawaban Peserta",
}

export const ManagementHasilUjianPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] =
    useState<keyof typeof HasilUjianTab>("UJIAN_PESERTA");

  return (
    <div className="w-full h-full flex flex-col gap-3 pt-1">
      <Breadcrumbs paths={[{ label: "Management Hasil Ujian" }]} />
      <div className="flex gap-3">
        {Object.keys(HasilUjianTab).map((key, idx) => (
          <p
            onClick={() => setActiveTab(key as keyof typeof HasilUjianTab)}
            key={idx}
            className={`cursor-pointer text-sm  p-4 rounded-lg ${
              activeTab === key ? "bg-white" : "bg-transparent"
            }`}
          >
            {HasilUjianTab[key as keyof typeof HasilUjianTab]}
          </p>
        ))}
      </div>
      {activeTab === "UJIAN_PESERTA" && <DataHasilAkhirUjianPesertaTable />}
      {activeTab === "JAWABAN_PESERTA" && <DataHasilAkhirJawabanPesertaTable />}
    </div>
  );
};
