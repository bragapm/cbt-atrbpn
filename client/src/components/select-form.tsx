import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { Skeleton } from "./ui/skeleton";

type ISelectForm = {
  title: string;
  isLoading?: boolean;
  data: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (value: string) => void;
};

const SelectForm: React.FC<ISelectForm> = ({
  title,
  isLoading,
  data,
  value,
  onChange,
}) => {
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-[180px] h-full rounded-2xl" />
      ) : (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-[180px]">
            <div className="flex flex-col items-start gap-1 w-full">
              <span className="text-xs  text-gray-500">{title}</span>
              <div className="w-[90px] truncate overflow-hidden">
                <SelectValue placeholder="Pilihan" />
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            {data?.map((item) => {
              return <SelectItem value={item.value}>{item.label}</SelectItem>;
            })}
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default SelectForm;
