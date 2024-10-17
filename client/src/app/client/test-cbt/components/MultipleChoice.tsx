import { Button } from "@/components/ui/button";
import { Info, RefreshCcw } from "lucide-react";
import React from "react";

const MultipleChoice = () => {
  return (
    <div className="w-full bg-white border rounded-2xl p-3 grid gap-2">
      <p className="text-primary font-medium">Pilih Jawaban Anda</p>
      {["A", "B", "C", "D", "E"].map((el) => (
        <div className="flex gap-2 border p-2 rounded-xl" key={el}>
          <div className="bg-primary w-6 h-6 text-white rounded-lg flex text-xs">
            <p className="m-auto">{el}</p>
          </div>
          <div className="flex-1">
            <p>
              Surat Keterangan Waris dari para ahli waris Nyonya Siti Amalia,
              Spd. yang disaksikan oleh Kelurahan Prafi Mulya, dikuatkan oleh
              Distrik/Camat Prafi dan Bukti identitas para ahliwaris. yang
              disaksikan oleh Kelurahan Prafi Mulya, dikuatkan oleh
            </p>
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

export default MultipleChoice;
