import { Input } from "@/components/ui/input";
import React from "react";

type IUjianPesertaInputForm = {
  title: string;
};

const UjianPesertaInputForm: React.FC<IUjianPesertaInputForm> = ({ title }) => {
  return (
    <div className="w-full border border-gray-400 py-1 px-2 rounded-xl flex flex-col">
      <p className="text-xs text-gray-500 ">{title}</p>
      <Input className="w-full bg-transparent focus:outline-none border-none  focus:border-none focus-visible:ring-0 h-[30px] p-0 shadow-none" />
    </div>
  );
};

export default UjianPesertaInputForm;
