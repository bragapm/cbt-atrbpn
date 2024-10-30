import { Input } from "@/components/ui/input";
import React from "react";

type IUjianInputForm = {
  title: string;
  value?: string;
  onChange?: (value: string) => void;
};

const UjianInputForm: React.FC<IUjianInputForm> = ({
  title,
  value,
  onChange,
}) => {
  return (
    <div className="w-full h-full border border-gray-400 py-1 px-2 rounded-xl">
      <p className="text-xs text-gray-500 ">{title}</p>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent focus:outline-none border-none  focus:border-none focus-visible:ring-0 h-[30px] p-0 shadow-none"
      />
    </div>
  );
};

export default UjianInputForm;
