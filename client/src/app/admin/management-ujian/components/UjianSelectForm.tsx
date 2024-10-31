import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type IUjianSelectForm = {
  title: string;
  isLoading?: boolean;
  data: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (value: string) => void;
};

const UjianSelectForm: React.FC<IUjianSelectForm> = ({
  title,
  isLoading,
  data,
  value,
  onChange,
}) => {
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-full rounded-xl" />
      ) : (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs text-gray-500">{title}</span>
              <SelectValue placeholder="Pilihan" />
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

export default UjianSelectForm;
