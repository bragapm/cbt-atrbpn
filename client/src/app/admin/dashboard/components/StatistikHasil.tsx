import { useState, useEffect } from "react";
import CardHeader from "./CardHeader";
import ChartCard from "./ChartCard";
import BarChart from "./BarChart";

const StatistikHasil = () => {
  const [dataChartDataAverage, setChartDataAverage] = useState<any>(null);
  const legenda: any[] = [
    {
      label: "Rata-Rata Nilai Ujian Peserta",
      color: "bg-[#699EB2]",
    },
  ];
  useEffect(() => {
    let label: string[] = ["Sulit", "Sangat Mudah"];
    let newData: any[] = [50, 30, 20];
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
          <div className="col-span-2 border rounded-lg">
            {dataChartDataAverage && (
              <ChartCard
                datas={dataChartDataAverage}
                legend={legenda}
                height={220}
                centerContent={{
                  label: "Presentase",
                  value: "68%",
                }}
              />
            )}
          </div>
          <div className=" col-span-1 p-4 border rounded-lg text-xs flex flex-col gap-2 bg-white ">
            <p>Nilai Rata-Rata Persesi</p>
            {[1, 2, 3, 4, 5].map((el, idx) => (
              <div key={el}>
                <p className="font-bold">{76 + idx}</p>
                <p className="text-[10px]">sesi {idx + 1} Ujian Sertifikasi</p>
              </div>
            ))}
          </div>
          <div className="col-span-3 border rounded-lg p-4">
            <BarChart
              labels={["9/10/24", "10/10/24", "11/10/24"]}
              data={[70, 40, 80]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikHasil;
