import FinishDialogConfirm from "@/components/FinishDialogConfirm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, FC } from "react";
import useFinish from "../hooks/useFinish";

interface ITime {
  start_time: string;
  end_time: string;
}
interface IRemaining {
  dataObj: ITime;
}

const RemainingTime: FC<IRemaining> = ({ dataObj }) => {
  const navigate = useNavigate();
  const [isShowSuccessDialog, setIsShowSuccessDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const sesiId = localStorage.getItem("session_id");

  const { data, loadingFinish, error, finishExam } = useFinish();

  const handleEndExam = () => {
    const obj = {
      user_session_id: Number(sesiId),
      // feedback: "-",
    };
    finishExam(obj);
  };

  // const handleEndExam = () => {
  //   navigate("/exam/finish");
  // };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(dataObj.end_time).getTime();
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
  }, [dataObj]);

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
