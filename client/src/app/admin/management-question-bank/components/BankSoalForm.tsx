import RichTextEditor from "@/components/rich-text-editor";
import SelectForm from "@/components/select-form";
import UploadFile from "@/components/upload-file";
import React from "react";
import BankSoalOptionForm from "./BankSoalOptionForm";

const BankSoalForm: React.FC = () => {
  return (
    <div className="w-full flex gap-3 flex-col pb-6">
      <div className="w-full flex gap-2">
        <SelectForm title="Materi Soal" />
        <SelectForm title="Kategori Soal" />
        <SelectForm title="Soal Acak" />
        <SelectForm title="Jawaban Acak" />
        <UploadFile />
      </div>

      <div className="w-full h-[250px]">
        <RichTextEditor />
      </div>

      <div className="w-full flex flex-col gap-2 mt-12">
        <BankSoalOptionForm title="Pilihan A" />
        <BankSoalOptionForm title="Pilihan B" />
        <BankSoalOptionForm title="Pilihan C" />
        <BankSoalOptionForm title="Pilihan D" />
      </div>
    </div>
  );
};

export default BankSoalForm;
