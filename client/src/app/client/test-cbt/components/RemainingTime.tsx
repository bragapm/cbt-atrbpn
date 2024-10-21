import FinishDialogConfirm from "@/components/FinishDialogConfirm";
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const RemainingTime = () => {
  const navigate = useNavigate();
  return (
    <>
      <FinishDialogConfirm
        isOpen={isShowSuccessDialog}
        onOpenChange={setIsShowSuccessDialog}
        description="Anda hampir selesai! Pastikan Anda telah menjawab semua soal dan meninjau jawaban Anda sebelum mengakhiri ujian."
        onSubmit={handleEndExam}
      />
      <div className="w-full bg-white border rounded-lg p-3 flex justify-between items-center h-fit">
        <div>
          <p className="text-primary font-medium">Sisa Waktu</p>
          <p>00:10:00</p>
        </div>
        <div>
          <Button
            className="bg-red-500 rounded-xl "
            onClick={() => setIsShowSuccessDialog(true)}
          >
            Akhiri Ujian
          </Button>
        </div>
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
