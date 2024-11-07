import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { IUjian } from "@/types/collection/ujian.type";
import UjianTablePeserta from "@/app/admin/management-ujian/components/UjianTablePeserta";

type IUjianPopupProps = {
  ujianData: IUjian;
};

const UjianDropdown: React.FC<IUjianPopupProps> = ({ ujianData }) => {
  const navigate = useNavigate();
  const endTime = new Date(ujianData?.end_time);
  const now = new Date();

  return (
    <>
      <DropdownMenuContent className="bg-white p-2">
        {now > endTime ? (
          <>
            <UjianTablePeserta isDetail />
            <DropdownMenuItem
              onClick={() => navigate(`/ujian/edit/${ujianData.id}`)}
            >
              Edit Sesi Ujian
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
    </>
  );
};

export default UjianDropdown;
