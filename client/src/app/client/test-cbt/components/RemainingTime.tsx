import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const RemainingTime = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white border rounded-lg p-3 flex justify-between items-center h-fit">
      <div>
        <p className="text-primary font-medium">Sisa Waktu</p>
        <p>00:10:00</p>
      </div>
      <div>
        <Button
          className="bg-red-500 rounded-xl "
          onClick={() => navigate("/exam/finish")}
        >
          Akhiri Ujian
        </Button>
      </div>
    </div>
  );
};

export default RemainingTime;
