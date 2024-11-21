import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { IDropdown } from "@/types/dropdown";

type ITableHeaderSorting = {
  title: string;
  dropdownData?: IDropdown[];
  selectedDropdownValue?: IDropdown;
  onSelectedDropdownValue?: (value: IDropdown) => void;
};

const TableHeaderSorting: React.FC<ITableHeaderSorting> = ({
  title,
  dropdownData = [],
  selectedDropdownValue,
  onSelectedDropdownValue,
}) => {
  return (
    <div className="flex w-full justify-between items-center">
      {dropdownData?.length === 0 ? (
        <p>{title}</p>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="text-xs" variant="ghost">
              {selectedDropdownValue?.label
                ? selectedDropdownValue?.label
                : title}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white p-2">
            {dropdownData?.map((item, idx) => (
              <DropdownMenuItem
                key={idx}
                onClick={() => onSelectedDropdownValue(item)}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Button
        variant="ghost"
        endContent={<ChevronsUpDown className="w-3 h-3" />}
      />
    </div>
  );
};

export default TableHeaderSorting;
