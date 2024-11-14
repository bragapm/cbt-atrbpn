import FinishDialogConfirm from "@/components/FinishDialogConfirm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

interface IRemaining {
  endTime: string;
}

const RemainingTime: FC<IRemaining> = ({ endTime }) => {
  const navigate = useNavigate();
  const [isShowSuccessDialog, setIsShowSuccessDialog] = useState(false);
  const handleEndExam = () => {
    navigate("/exam/finish");
  };

  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;

      if (difference > 0) {
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        clearInterval(intervalId);
        setTimeLeft("Waktu habis");
        handleEndExam();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endTime]);

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
          <p>{timeLeft}</p>
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
    </>
  );
};

export default RemainingTime;
