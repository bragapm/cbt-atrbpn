import { Button } from "@/components/ui/button";
import myImage from "@/assets/ic-dash-card.png";
import JadwalSesiSection from "../components/JadwalSesiSection";
import StatistikHasil from "../components/StatistikHasil";
import StatistikJadwal from "../components/StatistikJadwal";
import React from "react";

const Dashboardpage: React.FC = () => {
  const cardlist = [
    { name: "Total Peserta Terdaftar", value: 1000 },
    { name: "Ujian Sedang Berlangsung", value: 30 },
    { name: "Ujian Selesai", value: 20 },
  ];
  return (
    <div className="p-4 w-full flex flex-col gap-6 bg-[#F4F3F1] h-full">
      <div className="bg-[#2A6083] w-full rounded-lg py-4 flex flex-col gap-8 text-white">
        <div className=" flex justify-between items-center  px-6">
          <div>
            <p className="text-[32px]">Hallo, Mr. Ilam Muhammad</p>
            <p className="text-base">
              Selamat Datang di Dashboard Super Admin manis{" "}
            </p>
          </div>
          <div>
            <Button className="bg-[#8CBAC7] text-white">Export Modul</Button>
          </div>
        </div>
        <img src={myImage} className=" pl-6 w-full"></img>
      </div>
      <div className=" gap-4 grid grid-cols-3">
        {cardlist.map((el) => (
          <div
            className="border px-4 py-3 rounded-lg flex gap-4 items-center bg-white"
            key={el.value}
          >
            <div className="rounded-full shadow-md w-12 h-12 border border-gray-100 flex items-center text-center">
              <p className="m-auto">ic</p>
            </div>
            <div className="">
              <p className="text-xs">{el.name}</p>
              <p className="font-bold text-xl">{el.value}</p>
            </div>
          </div>
        ))}
      </div>
      <JadwalSesiSection />
      <StatistikHasil />
      <StatistikJadwal />
    </div>
  );
};

export default Dashboardpage;
