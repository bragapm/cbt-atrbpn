import { useState, useEffect } from "react";
import CardHeader from "./CardHeader";
import ChartCard from "./ChartCard";
import BarChart from "./BarChart";
import useGetHasilUjian from "../hooks/useGetHasilUjian";
import MemoLoader from "@/components/ui/Loader";
import Skeletons from "./Skeletons";

const legenda: any[] = [
  {
    label: "Rata-Rata Nilai Ujian Peserta",
    color: "bg-[#699EB2]",
  },
];

const StatistikHasil = () => {
  const [filter, setFilter] = useState(new Date().toISOString().slice(0, 10));

  const [dataChartDataAverage, setChartDataAverage] = useState<any>(null);
  const [barData, setBarData] = useState<any>(null);

  const { data: bysesi } = useGetHasilUjian(filter);
  const { data: dataPie } = useGetHasilUjian("all");
  const { data: dataBar } = useGetHasilUjian("");

  useEffect(() => {
    if (dataPie?.data) {
      const data = {
        labels: ["rata - rata", ""],
        datasets: [
          {
            label: "",
            data: [
              dataPie?.data?.averageScore[0]?.average_score,
              100 - dataPie?.data?.averageScore[0]?.average_score,
            ],
            backgroundColor: ["#699EB2", "#2A6083"],
            borderWidth: 0,
            color: "#fff",
          },
        ],
      };
      setChartDataAverage(data);
    }
  }, [dataPie]);

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
    <div className="space-y-4">
      <CardHeader
        title={"Statistik Hasil Ujian"}
        subtitle={"Data ditampilkan sesuai dengan filter"}
        listOption={[]}
        selectData={filter}
        setData={setFilter}
        listName="Pilih Tanggal"
        isDate
        hide
      />
      <div className="p-4 bg-white rounded-lg">
        <div className="grid grid-cols-6 gap-4 w-full justify-between p-4">
          <div className="col-span-2 border rounded-lg flex">
            {dataChartDataAverage ? (
              <ChartCard
                datas={dataChartDataAverage}
                legend={legenda}
                height={220}
                centerContent={{
                  label: " ",
                  value: " ",
                }}
              />
            ) : (
              <div className="m-auto">
                <MemoLoader width={30} height={30} color={"#2A6083"} />
              </div>
            )}
          </div>
          <div className="col-span-1 p-4 border rounded-lg text-xs flex flex-col gap-2 bg-white ">
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
