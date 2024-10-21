import RichTextEditor from "@/components/rich-text-editor";
import SelectForm from "@/components/select-form";
import UploadFile from "@/components/upload-file";
import React from "react";
//import BankSoalOptionForm from "./BankSoalOptionForm";
import UjianInputForm from "./UjianInputForm";
import UjianSelectForm from "./UjianSelectForm";

const UjianForm: React.FC = () => {
  return (
    <div className="w-full flex gap-3 flex-col pb-2">
      <div className="w-full flex gap-3">
        <UjianInputForm title="Nama Ujian" />
        <UjianSelectForm title="Tanggal Ujian" />
        <UjianSelectForm title="Sesi Ujian" />
        {/* <SelectForm title="Tanggal Ujian" />
        <SelectForm title="Sesi Ujian" /> */}
      </div>

      <div className="w-full flex flex-col gap-2">
        <UjianInputForm title="Peserta Ujian" />
      </div>
    </div>
  );
};

export default UjianForm;
