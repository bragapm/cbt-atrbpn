import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const options = [
  {
    id: "a",
    text: "Surat Keterangan Waris dari para ahli waris Nyonya Siti Amalia, Spd. yang disaksikan oleh Kelurahan Prafi Mulya, dikuatkan oleh Distrik/Camat Prafi dan Bukti identitas para ahliwaris.",
  },
  {
    id: "b",
    text: "Surat Keterangan Kematian atas nama Nyonya Siti Amalia, Spd. dari pejabat yang berwenang dan Surat Keterangan Waris dari para ahli waris Almarhumah Siti Amalia dan Bukti identitas selaku ahli waris.",
  },
  {
    id: "c",
    text: "2 (dua) buah sertipikat asli HM No.500/Prafi Mulya dan HM No.100/Wosi dan SPPT PBB dari dua bidang tanah tersebut tahun 2019.",
  },
  {
    id: "d",
    text: "Jawaban (A) dan (C) benar.",
  },
];

export default function BankSoalChoices() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-primary text-sm">
          Pilih Jawaban Anda
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex  rounded-lg border px-4 py-2 gap-2"
            >
              <div className="w-12 h-fit flex-grow-0 flex-shrink-0">
                <div className="flex w-6 h-6 text-sm items-center justify-center rounded-full font-semibold bg-primary text-white">
                  {option.id.toUpperCase()}
                </div>
              </div>
              <p className="text-xs">{option.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
