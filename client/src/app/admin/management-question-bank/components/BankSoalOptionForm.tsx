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
        <Input
          className="border border-gray-300 h-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
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
