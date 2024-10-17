import { Button } from "@/components/ui/button";
import React from "react";

const RemainingTime = () => {
  return (
    <div className="w-full bg-white border rounded-lg p-3 flex justify-between items-center h-fit">
      <div>
        <p className="text-primary font-medium">Sisa Waktu</p>
        <p>00:10:00</p>
      </div>
      <div>
        <Button className="bg-red-500 rounded-xl ">Akhiri Ujian</Button>
      </div>
    </div>
  );
};

export default RemainingTime;
