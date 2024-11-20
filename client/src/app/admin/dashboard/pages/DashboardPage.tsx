import { Button } from "@/components/ui/button";
import JadwalSesiSection from "../components/JadwalSesiSection";
import StatistikHasil from "../components/StatistikHasil";
import StatistikJadwal from "../components/StatistikJadwal";
import React from "react";
import useGetTotal from "../hooks/useGetTotal";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { getAccessToken } from "@/midlewares/token";
const Dashboardpage: React.FC = () => {
  const { data } = useGetTotal();
  const accessToken = getAccessToken();

  const { data: currentUser, isLoading } = useGetCurrentUser({
    enabled: !!accessToken,
  });

  const cardlist = [
    {
      icon: "/images/ic-user-gray.svg",
      name: "Total Peserta Terdaftar",
      value: data?.data?.totalRegisteredUsers[0]?.total_registered_users,
    },
    {
      icon: "/images/ic-computer.svg",
      name: "Ujian Sedang Berlangsung",
      value: data?.data?.finishedTests[0]?.finished_tests,
    },
    {
      icon: "/images/ic-check.svg",
      name: "Ujian Selesai",
      value: data?.data?.ongoingTests[0]?.ongoing_tests,
    },
  ];
  return (
    <div className="p-4 w-full flex flex-col gap-6">
      <div className="bg-[#2A6083] w-full rounded-2xl py-4 flex flex-col gap-8 text-white">
        <div className=" flex justify-between items-center  px-6">
          <div>
            <p className="text-[32px]">
              Hallo,{" "}
              {currentUser?.data?.first_name +
                " " +
                currentUser?.data?.last_name}
            </p>
            <p className="text-base">Selamat Datang di Dashboard CBT PPAT</p>
          </div>
          {/* <div>
            <Button className="bg-[#8CBAC7] text-white py-5">
              Export Modul
              <img src={"/images/ic-cloud-download.svg"} className="pl-2"></img>
            </Button>
          </div> */}
        </div>
        <img src={"/images/ic-dash-card.png"} className=" pl-6 w-full"></img>
      </div>
      <div className=" gap-4 grid grid-cols-3">
        {cardlist.map((el, idx) => (
          <div
            className="border px-4 py-3 rounded-lg flex gap-4 items-center bg-white"
            key={idx}
          >
            <div className="rounded-full shadow-md w-12 h-12 border border-gray-100 flex items-center text-center">
              <img src={el.icon} className="w-5 h-5 m-auto"></img>
            </div>
            <div className="">
              <p className="text-xs">{el.name}</p>
              {el.value ? (
                <p className="font-bold text-xl">{el.value}</p>
              ) : (
                <div className="h-4 w-full mt-2 bg-gray-200 rounded-md animate-pulse" />
              )}
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
