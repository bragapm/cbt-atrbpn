import SelectForm from "@/components/select-form";
import { Input } from "@/components/ui/input";
import React from "react";

type IBankSoalOptionForm = {
  title: string;
};

const BankSoalOptionForm: React.FC<IBankSoalOptionForm> = ({ title }) => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <p className="text-sm font-medium">{title}</p>
      <div className="flex gap-2 items-center">
        <div className="w-full border border-gray-400 py-1 px-2 rounded-xl flex flex-col">
          <p className="text-xs text-gray-500 ">Pertanyaan</p>
          <Input className="w-full bg-transparent focus:outline-none border-none  focus:border-none focus-visible:ring-0 h-[30px] p-0 shadow-none" />
        </div>
        <SelectForm title="Benar/Salah" />
      </div>
    </div>
  );
};

export default BankSoalOptionForm;
