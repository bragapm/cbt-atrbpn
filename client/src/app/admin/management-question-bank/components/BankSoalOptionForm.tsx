import SelectForm from "@/components/select-form";
import { Input } from "@/components/ui/input";
import UploadFile from "@/components/upload-file";
import { Upload } from "lucide-react";
import React from "react";

type IBankSoalOptionForm = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  selectValue: string;
  onChangeSelectValue: (value: string) => void;
  fileValue: File | null | string;
  onChangeFileValue: (file: File | null | string) => void;
};

const booleanData = [
  {
    value: "true",
    label: "Benar",
  },
  {
    value: "false",
    label: "Salah",
  },
];

const BankSoalOptionForm: React.FC<IBankSoalOptionForm> = ({
  title,
  value,
  onChange,
  selectValue,
  onChangeSelectValue,
  fileValue,
  onChangeFileValue,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 h-full">
      <p className="text-sm font-medium">{title}</p>
      <div className="w-full flex gap-2">
        <div className="w-full border border-gray-400 py-1 px-2 rounded-xl flex flex-col">
          <p className="text-xs text-gray-500 w-full">Pertanyaan</p>
          <Input
            className="w-full bg-transparent focus:outline-none border-none  focus:border-none focus-visible:ring-0 h-[30px] p-0 shadow-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div>
          <UploadFile
            title="Unggah Gambar"
            value={fileValue}
            onChange={onChangeFileValue}
          />
        </div>
        <SelectForm
          data={booleanData}
          title="Benar/Salah"
          onChange={onChangeSelectValue}
          value={selectValue}
        />
      </div>
    </div>
  );
};

export default BankSoalOptionForm;
