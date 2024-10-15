import { FC } from "react";

interface ICardHead {
  title: string;
  subtitle: string;
  listOption: any[];
}

const CardHeader: FC<ICardHead> = ({ title, subtitle, listOption }) => {
  return (
    <div className="flex justify-between">
      <div className="text-[#484A4A]">
        <p className="font-semibold">{title}</p>
        <p className="text-xs">{subtitle}</p>
      </div>
      <div className="bg-white border rounded-xl px-20 py-2"> pilih opsi</div>
    </div>
  );
};

export default CardHeader;
