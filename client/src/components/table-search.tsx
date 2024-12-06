import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";

type ITableSearch = {
  value: string;
  onChange: (value: string) => void;
};

const TableSearch: React.FC<ITableSearch> = ({ value, onChange }) => {
  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    if (textSearch?.length > 1 || textSearch?.length === 0) {
      onChange(textSearch);
    }
  }, [textSearch]);
  return (
    <div className="w-full h-full border border-gray-400 py-1 px-2 rounded-xl flex justify-between items-center bg-white">
      <div className="flex w-full">
        <Input
          value={textSearch}
          placeholder="Cari.."
          onChange={(e) => setTextSearch(e.target.value)}
          className="w-full bg-transparent focus:outline-none border-none  focus:border-none focus-visible:ring-0 h-[30px] p-0 shadow-none"
        />
      </div>
      <Search className="w-4 h-4" />
    </div>
  );
};

export default TableSearch;
