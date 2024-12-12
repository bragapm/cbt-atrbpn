import UjianTablePeserta from "@/app/admin/management-ujian/components/UjianTablePeserta";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IUjian } from "@/types/collection/ujian.type";
import React from "react";
import { useNavigate } from "react-router-dom";

type IUjianPopupProps = {
  ujianData: IUjian;
  sessionId: string | number;
};

const UjianDropdown: React.FC<IUjianPopupProps> = ({
  ujianData,
  sessionId,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenuContent className="bg-white p-2">
        <>
        {/* ini detail untuk esit sesi */}
          <UjianTablePeserta isDetail sessionId={sessionId} />
          <DropdownMenuItem
            onClick={() => navigate(`/ujian/edit/${ujianData.session_id}`)}
          >
            Edit Sesi Ujian
          </DropdownMenuItem>
        </>
      </DropdownMenuContent>
    </>
  );
};

export default UjianDropdown;
