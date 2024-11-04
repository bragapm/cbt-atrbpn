import { useEffect, useState } from "react";
import CardHeader from "./CardHeader";
import JadwalCard from "./JadwalCard";
import ChartCard from "./ChartCard";
import Pagination from "./Pagination";
import useGetJadwalSesi from "../hooks/useGetJadwalSesi";
import useStatistikBankSoal from "../hooks/useStatistikBankSoal";

const JadwalSesiSection = () => {
  const [dataChartSoal, setChartDataSoal] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 50;

  const { data } = useGetJadwalSesi({
    page: currentPage,
    limit: 2,
  });

  const { data: materisoal } = useStatistikBankSoal("");
  console.log(materisoal?.data);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          {data &&
            data?.data?.data?.map((el, idx) => (
              <JadwalCard key={idx} data={el} />
            ))}
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
          hide
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
              {materisoal?.data &&
                materisoal?.data?.soalPerKategori?.map((el, idx) => (
                  <div key={el.materi_id}>
                    <p className="font-bold">{el.jumlah_soal}</p>
                    <p className="text-[10px]">{el.materi}</p>
                  </div>
                ))}
            </div>
          </div>
          <p className="text-xs">
            Data ini menampilkan sesuai dengan filter yang dipilih
          </p>
        </div>
      </div>
    </div>
  );
};

export default JadwalSesiSection;
