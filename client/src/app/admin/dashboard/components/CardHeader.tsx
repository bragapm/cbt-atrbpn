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
  listName?: string;
  hide?: boolean;
}

const CardHeader: FC<ICardHead> = ({
  title,
  subtitle,
  listOption,
  listName = "pilih data",
  hide,
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
    </div>
  );
};

export default CardHeader;
