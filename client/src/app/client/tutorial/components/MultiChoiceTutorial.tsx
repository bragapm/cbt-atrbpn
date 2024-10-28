import { Button } from "@/components/ui/button";
import { Info, RefreshCcw } from "lucide-react";
import React from "react";

const MultiChoiceTutorial = () => {
  const listJawaban = [
    "Surat Keterangan Waris dari para ahli waris Nyonya Siti Amalia, Spd. yang disaksikan oleh Kelurahan Prafi Mulya, dikuatkan oleh Distrik/Camat Prafi dan Bukti identitas para ahliwaris. yang disaksikan oleh Kelurahan Prafi Mulya, dikuatkan oleh",
    "Surat Keterangan Kematian atas nama Nyonya Siti Amalia, Spd. dari pejabat yang berwenang dan Surat Keterangan Waris dari para ahli waris Almarhumah Siti Amalia dan Bukti identitas selaku ahli waris.",
    "2 (dua) buah sertipikat asli HM No.500/Prafi Mulya dan HM No.100/Wosi dan SPPT PBB dari dua bidang tanah tersebut tahun 2019.",
    "Jawaban (A) dan (C) benar.",
    "Jawaban (B) dan (C) benar.",
  ];
  return (
    <div className="demo_choice w-full bg-white border rounded-2xl p-3 grid gap-2">
      <p className="text-primary font-medium">Pilih Jawaban Anda</p>
      {["A", "B", "C", "D", "E"].map((el, idx) => (
        <div
          className={`flex gap-2 border p-2 rounded-xl ${
            idx === 4 ? "bg-[#F5FBFB] border-[#2A6083]" : ""
          }`}
          key={el}
        >
          <div
            className={`${
              idx === 4 ? "bg-[#2A6083]" : "bg-primary"
            } w-6 h-6 text-white rounded-lg flex text-x`}
          >
            <p className="m-auto">{el}</p>
          </div>
          <div className="flex-1">
            <p>{listJawaban[idx]}</p>
          </div>
        </div>
      ))}
      <div className="flex gap-4 items-center mt-4">
        <Button className="rounded-xl gap-2">
          Clear Jawaban
          <RefreshCcw size={16} />
        </Button>
        <div className="flex gap-2 items-center">
          <Info size={16} />
          <p className="text-sm">Clear jawaban untuk menghapus jawaban</p>
        </div>
      </div>
    </div>
  );
};

export default MultiChoiceTutorial;
