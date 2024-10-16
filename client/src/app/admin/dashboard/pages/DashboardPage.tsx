import { Button } from "@/components/ui/button";
import JadwalSesiSection from "../components/JadwalSesiSection";
import StatistikHasil from "../components/StatistikHasil";
import StatistikJadwal from "../components/StatistikJadwal";
import React from "react";

const Dashboardpage: React.FC = () => {
  const cardlist = [
    {
      icon: "/images/ic-user-gray.svg",
      name: "Total Peserta Terdaftar",
      value: 1000,
    },
    {
      icon: "/images/ic-computer.svg",
      name: "Ujian Sedang Berlangsung",
      value: 30,
    },
    { icon: "/images/ic-check.svg", name: "Ujian Selesai", value: 20 },
  ];
  return (
    <div className="p-4 w-full flex flex-col gap-6 ">
      <div className="bg-[#2A6083] w-full rounded-2xl py-4 flex flex-col gap-8 text-white">
        <div className=" flex justify-between items-center  px-6">
          <div>
            <p className="text-[32px]">Hallo, Mr. Ilam Muhammad</p>
            <p className="text-base">
              Selamat Datang di Dashboard Super Admin manis{" "}
            </p>
          </div>
          <div>
            <Button className="bg-[#8CBAC7] text-white py-5">
              Export Modul
              <img src={"/images/ic-cloud-download.svg"} className="pl-2"></img>
            </Button>
          </div>
        </div>
        <img src={"/images/ic-dash-card.png"} className=" pl-6 w-full"></img>
      </div>
      <div className=" gap-4 grid grid-cols-3">
        {cardlist.map((el) => (
          <div
            className="border px-4 py-3 rounded-lg flex gap-4 items-center bg-white"
            key={el.value}
          >
            <div className="rounded-full shadow-md w-12 h-12 border border-gray-100 flex items-center text-center">
              <img src={el.icon} className="w-5 h-5 m-auto"></img>
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
