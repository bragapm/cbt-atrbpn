import { useState, useEffect } from "react";
import CardHeader from "./CardHeader";
import ChartCard from "./ChartCard";
import BarChart from "./BarChart";
import useGetHasilUjian from "../hooks/useGetHasilUjian";
import MemoLoader from "@/components/ui/Loader";
import Skeletons from "./Skeletons";

const StatistikHasil = () => {
  const { data: dataBar } = useGetHasilUjian("");
  const { data: bysesi } = useGetHasilUjian("2024-11-04");

  console.log(bysesi?.data);
  const [dataChartDataAverage, setChartDataAverage] = useState<any>(null);
  const legenda: any[] = [
    {
      label: "Rata-Rata Nilai Ujian Peserta",
      color: "bg-[#699EB2]",
    },
  ];
  useEffect(() => {
    let label: string[] = ["Sulit", "Sangat Mudah"];
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

  const [barData, setBarData] = useState(null);
  useEffect(() => {
    if (dataBar?.data) {
      let dat = dataBar?.data?.averageScoreByDate;
      setBarData({
        label: dat.map((el) => {
          return new Date(el.date).toDateString();
        }),
        value: dat.map((el) => {
          return el.average_score;
        }),
      });
    }
  }, [dataBar]);

  return (
    <div className=" space-y-4 ">
      <CardHeader
        title={"Statistik Hasil Ujian"}
        subtitle={"Data ditampilkan sesuai dengan filter"}
        listOption={[]}
        listName="Pilih Tanggal"
      />
      <div className="p-4 bg-white rounded-lg">
        <div className="grid grid-cols-6 gap-4 w-full justify-between p-4">
          <div className="col-span-2 border rounded-lg flex">
            {/* {dataChartDataAverage ? (
              <ChartCard
                datas={dataChartDataAverage}
                legend={legenda}
                height={220}
                centerContent={{
                  label: "Presentase",
                  value: " ",
                }}
              />
            ) : (
              <div className="m-auto">
                <MemoLoader width={30} height={30} color={"#2A6083"} />
              </div>
            )} */}
          </div>
          <div className=" col-span-1 p-4 border rounded-lg text-xs flex flex-col gap-2 bg-white ">
            <p>Nilai Rata-Rata Persesi</p>
            {bysesi?.data ? (
              bysesi?.data?.averageScoreBySession?.map((el, idx) => (
                <div key={idx}>
                  <p className="font-bold">{el.average_score}</p>
                  <p className="text-[10px]">sesi {el.session_name}</p>
                </div>
              ))
            ) : (
              <Skeletons count={5} />
            )}
          </div>
          <div className="col-span-3 border rounded-lg p-4 grid">
            {barData ? (
              <BarChart labels={barData.label} data={barData.value} />
            ) : (
              <div className="m-auto">
                <MemoLoader width={30} height={30} color={"#2A6083"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikHasil;
