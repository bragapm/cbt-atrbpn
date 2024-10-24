import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const BankSoalPreviewSoal: React.FC = () => {
  return (
    <Card className="w-full flex flex-col gap-2 ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex gap-2 items-center">
          <div className="w-fit h-fit px-4 py-2 text-xs bg-primary/10 text-primary rounded-xl ">
            Sulit
          </div>
          <p className="text-sm font-medium text-primary"> Soal No. 1</p>
        </CardTitle>
        <div className="flex gap-1 ">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Card className="p-4">
          <div className="space-y-4 text-xs">
            <p>
              Tuan Dr. dr. Andris Menantih, Sp.B-Ongk., telah menikah dengan
              Siti Amalia, S.Pd. dan mempunyai dua orang anak kandung yaitu Asri
              Martalina S.H.,M.Kn. dan Dadau Endarto, S.Si yang masing-masing
              sudah dewasa. Selama perkawinan, mereka tidak membuat surat
              perjanjian pisah harta. Siti Amalia, Spd. selaku istri dari Dr.dr.
              Andris Menantih, Sp.B-Ongk. telah meninggal dunia pada tahun 2015
              di Kelurahan Prafi Mulya, Distrik (Kecamatan) Prafi, Kabupaten
              Manokwari dan meninggalkan harta warisan antara lain:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Hak Milik (HM) No.500/Prafi Mulya tercatat atas nama SITI
                AMALIA, S.Pd., yang terletak di Kelurahan Prafi Mulya, Distrik
                (Kecamatan) Prafi, Kabupaten Manokwari, seluas 1000 m2, jenis
                penggunaan tempat tinggal dan pekarangan.
              </li>
              <li>
                Hak Milik (Hak Milik) No.100/ Wosi, tercatat atas nama SITI
                AMALIA, S.Pd., yang terletak di Kelurahan Wosi, Distrik
                (Kecamatan) Manokwari Barat, Kabupaten Manokwari, seluas 2500
                m2, jenis penggunaan untuk tanah pertanian.
              </li>
            </ol>
            <p>
              Para ahli waris sudah membuat Surat Pernyataan Ahli Waris pada
              tanggal 17 November 2017 yang disaksikan dan dibenarkan oleh
              Kelurahan Prafi Mulya dikuatkan oleh Kepala Distrik/Camat Prafi.
              Selanjutnya para ahli waris bermaksud akan mendaftarkan
            </p>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
};

export default BankSoalPreviewSoal;
