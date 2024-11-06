import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";

interface ICardHead {
  title: string;
  subtitle: string;
  listOption: any[];
  selectData: any;
  setData: (val: any) => void;
  listName?: string;
  hide?: boolean;
  isDate?: boolean;
}

const CardHeader: FC<ICardHead> = ({
  title,
  subtitle,
  listOption,
  selectData,
  setData,
  listName = "pilih data",
  hide,
  isDate,
}) => {
  return (
    <div className="flex justify-between">
      <div className="text-[#484A4A]">
        <p className="font-semibold">{title}</p>
        <p className="text-xs">{subtitle}</p>
      </div>
      {!hide && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="bg-white text-gray-500 w-48 text-left justify-between">
              {listName}
              <img
                src={"/images/ic-arrow-reg.svg"}
                className="w-3 h-3 ml-2"
              ></img>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>-</DropdownMenuItem>
            <DropdownMenuItem>-</DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {isDate && (
        <input
          className=" p-2 px-4 border rounded-2xl"
          type="date"
          id="date"
          value={selectData}
          onChange={(e) => setData(e.target.value)}
        />
      )}
    </div>
  );
};

export default CardHeader;
