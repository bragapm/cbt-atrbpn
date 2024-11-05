import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { useState } from "react";

type ISearchBox = {
  onSearch: (value: string) => void;
};

const SearchBox: React.FC<ISearchBox> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="w-full h-full border border-gray-400 py-1 px-2 rounded-xl flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-500 ">Cari Peserta</p>
        <Input
          value={input}
          onChange={handleInputChange}
          className="w-full bg-transparent focus:outline-none border-none  focus:border-none focus-visible:ring-0 h-[30px] p-0 shadow-none"
        />
      </div>
      <Search />
    </div>
  );
};

export default SearchBox;
