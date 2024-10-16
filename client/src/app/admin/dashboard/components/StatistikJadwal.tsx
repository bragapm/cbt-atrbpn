import { useState, useEffect } from "react";
import CardHeader from "./CardHeader";
import ChartCard from "./ChartCard";

const StatistikJadwal = () => {
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
    let label: string[] = ["Sedang Berlangsung", "Belum Dimulai"];
    let newData: any[] = [50, 30];
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
  }, []);
  const cardlist = [
    {
      icon: "/images/ic-calendar.svg",
      name: "Sesi Ujian Hari ini",
      value: 1000,
    },
    {
      icon: "/images/ic-computer.svg",
      name: "Sesi Ujian Minggu Ini",
      value: 30,
    },
    {
      icon: "/images/ic-globe.svg",
      name: "Sesi Ujian Bulan Ini",
      value: 20,
    },
  ];
  return (
    <div className=" space-y-4 ">
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
                label: "Selisih",
                value: "50%",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatistikJadwal;
