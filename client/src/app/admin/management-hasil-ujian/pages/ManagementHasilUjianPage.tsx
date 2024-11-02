import { DataHasilAkhirUjianPesertaTable } from "../components/DataHasilAkhirUjianPesertaTable";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useState } from "react";
import { DataHasilAkhirJawabanPesertaTable } from "../components/DataHasilAkhirJawabanPesertaTable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
      <div className="flex justify-between">
        <div className="flex gap-3  mb-[-40px] ">
          {Object.keys(HasilUjianTab).map((key, idx) => (
            <p
              onClick={() => setActiveTab(key as keyof typeof HasilUjianTab)}
              key={idx}
              className={`cursor-pointer text-sm  p-4 rounded-2xl pb-10 ${
                activeTab === key ? "bg-white" : "bg-transparent"
              }`}
            >
              {HasilUjianTab[key as keyof typeof HasilUjianTab]}
            </p>
          ))}
        </div>
        {activeTab === "UJIAN_PESERTA" && (
          <Button
            variant="ghost"
            className=" text-primary "
            onClick={() => navigate("/hasil-ujian/detail")}
          >
            Lihat Detail Hasil Ujian
          </Button>
        )}
      </div>
      {activeTab === "UJIAN_PESERTA" && <DataHasilAkhirUjianPesertaTable />}
      {activeTab === "JAWABAN_PESERTA" && <DataHasilAkhirJawabanPesertaTable />}
    </div>
  );
};
