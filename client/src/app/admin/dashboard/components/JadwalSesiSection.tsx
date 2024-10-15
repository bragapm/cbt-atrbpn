import { useState } from "react";
import CardHeader from "./CardHeader";
import JadwalCard from "./JadwalCard";
import ChartCard from "./ChartCard";

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
          <div className="grid grid-cols-3 gap-4 w-full justify-between">
            <div className="col-span-2">
              <ChartCard labels={["ada", "dua"]} data={[3, 4]} />
            </div>
            <div className="p-4 border rounded-lg text-xs flex flex-col gap-2 ">
              <p>Materi Soal</p>
              {[1, 2, 3, 4, 5].map((el) => (
                <div key={el}>
                  <p className="font-bold">32</p>
                  <p className="text-[10px]">Bahasa Indo</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JadwalSesiSection;
