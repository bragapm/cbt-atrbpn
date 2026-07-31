import FinishDialogConfirm from "@/components/FinishDialogConfirm";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo, useRef, FC } from "react";
import useFinish from "../hooks/useFinish";

interface ITime {
  start_time: string;
  end_time: string;
  now_time?: string;
  client_received_at?: number;
}
interface IRemaining {
  dataObj: ITime;
}

// Server mengirim "2026-07-31 15:40:42+07:00" yang memakai spasi, bukan "T".
// Bentuk itu di luar spesifikasi ECMAScript dan hanya jalan karena Chrome
// longgar, jadi dinormalkan dulu supaya tidak jadi NaN di browser yang ketat.
const parseServerDate = (value?: string) => {
  if (!value) return NaN;
  return Date.parse(value.replace(" ", "T"));
};

const formatDuration = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
};

const RemainingTime: FC<IRemaining> = ({ dataObj }) => {
  const [isShowSuccessDialog, setIsShowSuccessDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const sesiId = localStorage.getItem("session_id");
  const hasFinishedRef = useRef(false);

  const { finishExam } = useFinish();

  const endTimeMs = useMemo(
    () => parseServerDate(dataObj?.end_time),
    [dataObj?.end_time]
  );

  // Selisih jam server dengan jam device, dihitung dari `now_time` yang ikut
  // dikirim endpoint /start. Kalau server belum mengirimnya, offset 0 sehingga
  // perilakunya kembali seperti semula (murni jam device).
  const serverOffsetMs = useMemo(() => {
    const serverNowMs = parseServerDate(dataObj?.now_time);
    const receivedAtMs = Number(dataObj?.client_received_at);

    if (Number.isNaN(serverNowMs) || !receivedAtMs) return 0;
    return serverNowMs - receivedAtMs;
  }, [dataObj?.now_time, dataObj?.client_received_at]);

  const handleEndExam = () => {
    finishExam({ user_session_id: Number(sesiId) });
  };

  useEffect(() => {
    if (Number.isNaN(endTimeMs)) return;

    // Dua sumber waktu dipakai berbarengan: jam device yang sudah dikoreksi
    // offset server, dan performance.now() yang monotonic. Diambil yang paling
    // maju supaya memundurkan jam device tidak menambah sisa waktu, sementara
    // device yang sempat sleep tetap terkejar lewat jam device.
    const anchorServerMs = Date.now() + serverOffsetMs;
    const anchorPerf = performance.now();

    const getServerNow = () =>
      Math.max(
        anchorServerMs + (performance.now() - anchorPerf),
        Date.now() + serverOffsetMs
      );

    let isExpired = false;

    const tick = () => {
      const difference = endTimeMs - getServerNow();

      if (difference > 0) {
        setTimeLeft(formatDuration(difference));
        return;
      }

      isExpired = true;
      setTimeLeft("Waktu habis");

      if (!hasFinishedRef.current) {
        hasFinishedRef.current = true;
        handleEndExam();
      }
    };

    tick();

    const intervalId = setInterval(() => {
      if (isExpired) {
        clearInterval(intervalId);
        return;
      }
      tick();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endTimeMs, serverOffsetMs]);

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
