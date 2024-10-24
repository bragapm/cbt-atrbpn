import { ChevronDown } from "lucide-react";
import React from "react";

export const Dropdown = () => {
  return (
    <div className="w-full cursor-pointer">
      <label className="text-xs">Sesi Ujian</label>
      <div className=" justify-between border border-input py-1 text-sm shadow-sm transition-colors px-3 h-9 rounded-md flex items-center text-muted-foreground">
        <p>Pilih Sesi Ujian</p>
        <ChevronDown />
      </div>
    </div>
    // <div className="w-full">
    //   <label className="text-xs">Sesi Ujian</label>
    //   <select className="w-full border border-input py-1 text-sm shadow-sm transition-colors px-3 h-9 rounded-md flex items-center text-muted-foreground">
    //     <option>1</option>
    //   </select>
    // </div>
  );
};
