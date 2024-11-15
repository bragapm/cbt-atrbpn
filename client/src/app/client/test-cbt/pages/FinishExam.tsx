import { useEffect, useState, FC } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useFinish from "../hooks/useFinish";
import { useNavigate } from "react-router-dom";
import MemoLoader from "@/components/ui/Loader";

const FinishExam: FC = () => {
  const sesiId = localStorage.getItem("session_id");
  const [feedback, setFeedback] = useState("");
  const [count, setCount] = useState(10);
  const formattedTime = new Date(count * 1000).toISOString().slice(11, 19);
  const { data, loadingFinish, error, finishExam } = useFinish();
  const navigate = useNavigate();
  const handleSendFeedBack = () => {
    const obj = {
      user_session_id: Number(sesiId),
      feedback: feedback,
    };
    finishExam(obj);
  };

  useEffect(() => {
    let intervalId;
    if (data) {
      intervalId = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1;
          } else {
            clearInterval(intervalId);
            handleClearAllData();
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [data, count]);
  console.log(data);

  const handleClearAllData = () => {
    localStorage.clear();
    navigate("/hasil-ujian/videotron");
  };

  return (
    <div className={`w-full h-full flex justify-end items-center`}>
      <Card className="w-[642px] p-4 bg-secondary h-full">
        {data === null ? (
          <div className="w-full h-full flex gap-5 flex-col bg-secondary justify-center text-[#484A4A]">
            <div className="w-full flex justify-center">
              <div className="flex rounded-lg bg-white p-5 items-center ">
                <img
                  src="/images/ic-feedback.svg"
                  alt="ic-chat"
                  className="w-[60px] h-[60px]"
                />
              </div>
            </div>
            <p className="text-center text-2xl font-semibold">
              Selamat telah menyelesaikan Ujian
            </p>
            <p className="text-sm text-center">
              Kami ingin mendengar pengalaman Anda! Umpan balik Anda sangat
              berharga bagi kami untuk meningkatkan kualitas layanan dan
              pengalaman ujian di masa depan.
            </p>
            <div className="w-full">
              <textarea
                rows={6}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className=" w-full border rounded-lg p- bg-transparent p-2"
                placeholder="Tuliskan feedback anda"
              ></textarea>
              <div className="flex gap-2 items-center">
                <Info size={16} />{" "}
                <p className=" text-sm w-full space-x-3">
                  Kirim Feedback untuk melihat hasil Ujian.
                </p>
              </div>
            </div>
            <Button
              variant="default"
              className="h-14 w-fit mx-auto px-10 rounded-xl"
              onClick={handleSendFeedBack}
            >
              {loadingFinish ? (
                <MemoLoader width={35} height={35} color={"white"} />
              ) : (
                "Kirim Feedback"
              )}
            </Button>
          </div>
        ) : (
          <div className="w-full h-full flex gap-6 flex-col px-20 justify-center">
            <div className="w-full flex gap-2.5 flex-col border-b p-2">
              <div className="w-full flex justify-center">
                <div className="flex gap-2 items-center ">
                  <img src="/images/logo.svg" alt="logo" />
                  <p className="text-2xl text-light font-semibold">ATR/BPN</p>
                </div>
              </div>
              <p className="text-center text-xl font-semibold">
                Ujian Berhasil disimpan
              </p>
            </div>
            <div className="border-b text-center grid gap-2.5">
              <p className="text-xs">Nama Peserta</p>
              <p className="text-xl font-semibold">{data?.fullname}</p>
              <p>No ID {data?.code}</p>
              <p>Telah menyelesaikan ujian CBT Ujian Pejabat dengan nilai</p>
              <p className="text-[#2A6083] text-[64px] font-medium">
                {data?.totalScore}
              </p>
            </div>
            <div className=" p-2 text-center">
              <p className="text-xs">
                Halaman ini akan Automatis ke halaman awal setelah waktu habis
              </p>
              <p className="text-xl">{formattedTime}</p>
            </div>
            <Button
              variant="default"
              className="h-14 mx-20 rounded-xl"
              onClick={() => {
                handleClearAllData();
              }}
            >
              Keluar
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FinishExam;
