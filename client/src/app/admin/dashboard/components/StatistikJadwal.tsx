import useGetPieJadwalUjian from "../hooks/useGetPieJadwalUjian";
import useGetJadwalUjian from "../hooks/useGetJadwalUjian";
import { useState, useEffect } from "react";
import CardHeader from "./CardHeader";
import ChartCard from "./ChartCard";

const StatistikJadwal = () => {
  const { data: pieData } = useGetPieJadwalUjian();
  const { data } = useGetJadwalUjian();
  const [dataChartDataAverage, setChartDataAverage] = useState<any>(null);

  const legenda: any[] = [
    {
      label: "Sedang Berlangsung",
      color: "bg-[#2A6083]",
    },
    {
      label: "Belum Dimulai",
      color: "bg-[#699EB2]",
    },
  ];

  useEffect(() => {
    if (pieData) {
      const obj = pieData?.data;
      let newData: any[] = [obj?.completedTests, obj?.nonCompletedTests];
      let label: string[] = ["Sedang Berlangsung", "Belum Dimulai"];
      let bgColors: string[] = ["#2A6083", "#699EB2"];
      const data = {
        labels: label,
        datasets: [
          {
            label: "",
            data: newData,
            backgroundColor: bgColors,
            borderWidth: 0,
            color: "#fff",
          },
        ],
      };
      setChartDataAverage(data);
    }
  }, [pieData]);

  const cardlist = [
    {
      icon: "/images/ic-calendar.svg",
      name: "Sesi Ujian Hari ini",
      value: data?.data?.todayTests,
    },
    {
      icon: "/images/ic-computer.svg",
      name: "Sesi Ujian Minggu Ini",
      value: data?.data?.thisWeekTests,
    },
    // {
    //   icon: "/images/ic-globe.svg",
    //   name: "Sesi Ujian Bulan Ini",
    //   value: 20,
    // },
  ];

  return (
    <div className="space-y-4">
      <CardHeader
        title={"Statistik Jadwal Ujian"}
        subtitle={"Data ditampilkan sesuai dengan filter"}
        listOption={[]}
        hide
      />
      <div className="grid grid-cols-2 gap-4">
        <div className=" gap-4 grid">
          {cardlist.map((el) => (
            <div
              className="border px-4 py-3 rounded-lg flex gap-4 items-center bg-white"
              key={el.value}
            >
              <div className="rounded-full shadow-md w-12 h-12 border border-gray-100 flex items-center text-center">
                <img src={el.icon} className="w-5 h-5 m-auto"></img>
              </div>
              <div className="">
                <p className="font-bold text-xl">{el.value}</p>
                <p className="text-xs">{el.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1 bg-white rounded-lg border p-2">
          {dataChartDataAverage && (
            <ChartCard
              datas={dataChartDataAverage}
              legend={legenda}
              height={220}
              centerContent={{
                label: " ",
                value: " ",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatistikJadwal;
