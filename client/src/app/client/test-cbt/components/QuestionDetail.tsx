import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { FC } from "react";

interface IQuestion {
  question: any;
  handleNextQuestion: () => void;
  handlePrevQuestion: () => void;
}
const QuestionDetail: FC<IQuestion> = ({
  question,
  handleNextQuestion,
  handlePrevQuestion,
}) => {
  return (
    <div className="w-full bg-white/80 border rounded-[16px] p-3 grid gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            className={`text-primary bg-primary/20 rounded-md px-2 py-1 text-[10px]`}
          >
            <p className={`font-medium`}>Sulit</p>
          </div>
          <p className="text-primary font-medium">Soal No.1</p>
          <p className="text-sm">| Soal Kategori Tugas Pokok PPAT</p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            className="border rounded-md border-primary p-1 hover:bg-primary/20"
            onClick={handlePrevQuestion}
          >
            <ChevronLeft color="#2A6083" size={20} />
          </button>
          <button
            onClick={handleNextQuestion}
            className="border rounded-md border-primary p-1 hover:bg-primary/20"
          >
            <ChevronRight color="#2A6083" size={20} />
          </button>
        </div>
      </div>
      <div className="p-2 rounded-lg border bg-white">
        <p>
          Tuan  Dr. dr. Andris Menantih, Sp.B-0ngk., telah menikah dengan Siti
          Amalia, S.Pd. dan mempunyai dua orang anak kandung yaitu Asri
          Martalina S.H.,M.Kn. dan Dadau Endarto, S.Si yang masing-masing sudah
          dewasa. Selama perkawinan, mereka tidak membuat surat perjanjian pisah
          harta. Siti Amalia, Spd. selaku istri dari Dr.dr. Andris Menantih,
          Sp.B-Ongk. telah meninggal dunia pada tahun 2015 di Kelurahan Prafi
          Mulya, Distrik (Kecamatan) Prafi, Kabupaten  Manokwari dan
          meninggalkan harta warisan antara lain:   Hak Milik (HM) No.500/Prafi
          Mulya tercatat atas nama SITI AMALIA, S.Pd.. yang terletak di
          Kelurahan Prafi Mulya, Distrik (Kecamatan) Prafi, Kabupaten Manokwari,
          seluas 1000 m2, jenis penggunaan tempat tinggal dan pekarangan. Hak
          Milik (Hak Milik)  No.100/ Wosi, tercatat atas nama SITI AMALIA,
          S.Pd., yang terletak di Kelurahan Wosi, Distrik (Kecamatan) Manokwari
          Barat, Kabupaten Manokwari, seluas 2500 m2, jenis penggunaan untuk
          tanah pertanian.
        </p>
      </div>
    </div>
  );
};

export default QuestionDetail;
