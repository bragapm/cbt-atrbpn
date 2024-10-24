import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";

type IUjianSelectForm = {
  title: string;
};

const UjianSelectForm: React.FC<IUjianSelectForm> = ({ title }) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs text-gray-500">{title}</span>
          <SelectValue placeholder="Pilihan" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UjianSelectForm;
