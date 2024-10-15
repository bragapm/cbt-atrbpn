import { useState } from "react";
import CardHeader from "./CardHeader";
import JadwalCard from "./JadwalCard";

const JadwalSesiSection = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <CardHeader
          title={"Jadwal Sesi"}
          subtitle={"Data ditampilkan sesuai dengan filter"}
          listOption={[]}
        />
        <div className="flex justify-between gap-4 py-4">
          <JadwalCard />
          <JadwalCard />
        </div>
      </div>
      <div>
        <CardHeader
          title={"Statistik Bank Soal"}
          subtitle={"Data ditampilkan sesuai dengan filter"}
          listOption={[]}
        />
        <div className="flex flex-col justify-between gap-4 p-4 rounded-lg mt-4 border bg-white">
          <p className="font-bold text-xl">Data Soal</p>
          <JadwalCard />
        </div>
      </div>
    </div>
  );
};

export default JadwalSesiSection;
