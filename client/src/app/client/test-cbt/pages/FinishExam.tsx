import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const FinishExam: React.FC = () => {
  const [isDoneFeedBack, setSendFeedBack] = useState(false);

  const handleSendFeedBack = () => {
    setSendFeedBack(true);
  };

  return (
    <div className={`w-full h-full flex justify-end items-center`}>
      <Card className="w-[642px] p-4 bg-secondary h-full">
        {!isDoneFeedBack ? (
          <FeedBackCard setSend={handleSendFeedBack} />
        ) : (
          <div className="w-full h-full flex gap-6 flex-col px-20 justify-center">
            <HeaderFinish />
            <div className="border-b text-center grid gap-2.5">
              <p className="text-xs">Nama Peserta</p>
              <p className="text-xl font-semibold">Gunawan Wibisaaja</p>
              <p>No ID 124567</p>
              <p>Telah menyelesaikan ujian CBT Ujian Pejabat dengan nilai</p>
              <p className="text-[#2A6083] text-[64px] font-medium">85,444</p>
            </div>
            <div className=" p-2 text-center">
              <p className="text-xs">
                Halaman ini akan Automatis ke halaman awal setelah waktu habis
              </p>
              <p className="text-xl">00:10:00</p>
            </div>
            <Button
              variant="default"
              className="h-14 mx-20 rounded-xl"
              onClick={() => setSendFeedBack(true)}
            >
              Keluar
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

const HeaderFinish = () => {
  return (
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
  );
};

const FeedBackCard = ({ setSend }) => {
  return (
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
        Selamat telah menyelesaikan Ujian{" "}
      </p>
      <p className="text-sm text-center">
        Kami ingin mendengar pengalaman Anda! Umpan balik Anda sangat berharga
        bagi kami untuk meningkatkan kualitas layanan dan pengalaman ujian di
        masa depan.
      </p>
      <div className="w-full">
        <textarea
          rows={6}
          className=" w-full border rounded-lg p-2"
          placeholder="Tuliskan feedback anda"
        ></textarea>
        <div className="flex gap-2 items-center">
          <Info size={16} />{" "}
          <p className=" text-sm w-full space-x-3">wadah wadah</p>
        </div>
      </div>
      <Button
        variant="default"
        className="h-14 w-fit mx-auto px-10 rounded-xl"
        onClick={setSend}
      >
        Kirim Feedback
      </Button>
    </div>
  );
};

export default FinishExam;
