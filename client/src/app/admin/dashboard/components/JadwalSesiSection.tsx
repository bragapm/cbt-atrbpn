import { useEffect, useState } from "react";
import CardHeader from "./CardHeader";
import JadwalCard from "./JadwalCard";
import ChartCard from "./ChartCard";
import Pagination from "./Pagination";

const JadwalSesiSection = () => {
  const [dataChartSoal, setChartDataSoal] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 50;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Lakukan sesuatu ketika halaman berubah, misalnya fetch data baru
  };
  const legenda: any[] = [
    {
      label: "Sulit",
      color: "bg-[#2A6083]",
    },
    {
      label: "Sangat Mudah",
      color: "bg-[#699EB2]",
    },
    {
      label: "Mudah",
      color: "bg-[#8CBAC7]",
    },
  ];
  useEffect(() => {
    let label: string[] = ["Sulit", "Sangat Mudah", "Mudah"];
    let newData: any[] = [50, 30, 20];
    let bgColors: string[] = ["#2A6083", "#699EB2", "#8CBAC7"];

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
    setChartDataSoal(data);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <CardHeader
          title={"Jadwal Sesi"}
          subtitle={"Data ditampilkan sesuai dengan filter"}
          listOption={[]}
          listName="Pilih Sesi"
        />
        <div className="flex justify-between gap-4 py-4">
          <JadwalCard />
          <JadwalCard />
        </div>
        <div className="w-full items-center flex">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <div>
        <CardHeader
          title={"Statistik Bank Soal"}
          subtitle={"Data ditampilkan sesuai dengan filter"}
          listOption={[]}
          listName="Pilih Paket Soal"
        />
        <div className="flex flex-col justify-between gap-4 p-4 rounded-lg mt-4 border bg-white">
          <p className="font-semibold ">Data Soal</p>
          <div className="grid grid-cols-3 gap-4 w-full justify-between">
            <div className="col-span-2 h-full border rounded-lg">
              {dataChartSoal && (
                <ChartCard
                  datas={dataChartSoal}
                  legend={legenda}
                  centerContent={{
                    label: "Jumlah Soal",
                    value: 100,
                  }}
                />
              )}
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
          <p className="text-xs">
            Data ini menampilkan sesuai dengan filter paket yang dipilih
          </p>
        </div>
      </div>
    </div>
  );
};

export default JadwalSesiSection;
