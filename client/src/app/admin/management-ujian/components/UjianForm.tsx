import React from "react";
import UjianInputForm from "./UjianInputForm";
import UjianSelectForm from "./UjianSelectForm";
import UjianPesertaInputForm from "./UjianPesertaInputForm";

const UjianForm: React.FC = () => {
  return (
    <div className="w-full flex gap-3 flex-col pb-2">
      <div className="w-full flex gap-3">
        <UjianInputForm title="Nama Ujian" />
        <UjianSelectForm title="Tanggal Ujian" />
        <UjianSelectForm title="Sesi Ujian" />
      </div>

      <div className="w-full flex flex-col gap-2">
        <UjianPesertaInputForm title="Peserta Ujian" />
      </div>
    </div>
  );
};

export default UjianForm;
