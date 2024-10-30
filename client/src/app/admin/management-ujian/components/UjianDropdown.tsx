import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

type IUjianPopupProps = {
  ujianData: { name: string; status: string }[];
};

const UjianDropdown: React.FC<IUjianPopupProps> = ({ ujianData }) => {
  const navigate = useNavigate();

  const hasSoal = ujianData.some((ujian) => ujian.status === "Soal");

  return (
    <DropdownMenuContent className="bg-white p-2">
      {hasSoal ? (
        <>
          <DropdownMenuItem onClick={() => navigate("#")}>
            Lihat Detail Ujian
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("#")}>
            Buat Laporan Ujian
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("#")}>
            Export Hasil Ujian
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuItem onClick={() => navigate("/bank-soal/create")}>
            Buat Soal
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-start gap-1 rounded-3xl">
              <QuestionMarkCircledIcon className="mt-1"></QuestionMarkCircledIcon>
              <div className="text-[12px]">
                <p>Ujian tidak dapat dilaksanakan</p>
                <p>silahkan buat soal terlebih dahulu.</p>
              </div>
            </div>
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  );
};

export default UjianDropdown;
