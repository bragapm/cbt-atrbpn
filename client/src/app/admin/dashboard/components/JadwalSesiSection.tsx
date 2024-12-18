import { useEffect, useState } from "react";
import CardHeader from "./CardHeader";
import JadwalCard from "./JadwalCard";
import ChartCard from "./ChartCard";
import Pagination from "./Pagination";
import useGetJadwalSesi from "../hooks/useGetJadwalSesi";
import useStatistikBankSoal from "../hooks/useStatistikBankSoal";
import MemoLoader from "@/components/ui/Loader";
import Skeletons from "./Skeletons";

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

const JadwalSesiSection = () => {
  const [dataChartSoal, setChartDataSoal] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(new Date().toISOString().slice(0, 10));
  const totalPages = 50;

  const { data } = useGetJadwalSesi({
    page: currentPage,
    limit: 2,
  });
  const { data: materisoal } = useStatistikBankSoal("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function hitungJumlahSoalPerKategori(data) {
    const jumlahSoalPerKategori = {};
    data.forEach((materi) => {
      if (!jumlahSoalPerKategori[materi.nama_kategori]) {
        jumlahSoalPerKategori[materi.nama_kategori] = 0;
      }
      jumlahSoalPerKategori[materi.nama_kategori] += Number(materi.jumlah_soal);
    });
    let kat = [];
    let jum = [];
    let total: any = 0;
    Object.entries(jumlahSoalPerKategori).map(([kategori, jumlah]) => {
      kat.push(kategori);
      jum.push(jumlah);
      total = total + jumlah;
    });

    return { kategori: kat, jumlah: jum, total: total };
  }

  useEffect(() => {
    if (materisoal?.data) {
      const hasil = hitungJumlahSoalPerKategori(materisoal?.data?.data);
      let label: string[] = hasil.kategori;
      let newData: any[] = hasil.jumlah;
      let bgColors: string[] = ["#2A6083", "#699EB2", "#8CBAC7"];
      setTotal(hasil.total);
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
    }
  }, [materisoal]);
  function groupDataByMateri(data) {
    const groupedData = {};
    data?.forEach((item) => {
      const { materi_id, materi, ...rest } = item;
      if (!groupedData[materi_id]) {
        groupedData[materi_id] = {
          materi_id,
          materi,
          data: [],
        };
      }

      groupedData[materi_id].data.push({ ...rest });
    });

    return Object.values(groupedData);
  }

  const groupedData: any[] = groupDataByMateri(materisoal?.data?.data);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col justify-between">
        <CardHeader
          title={"Jadwal Sesi"}
          subtitle={"Data ditampilkan sesuai dengan filter"}
          listOption={[]}
          selectData={filter}
          setData={setFilter}
          listName="Pilih Tanggal"
          isDate
          hide
        />
        <div className="flex justify-between gap-4 py-4  h-full">
          {data ? (
            data?.data?.data?.map((el, idx) => (
              <JadwalCard key={idx} data={el} />
            ))
          ) : (
            <div className="m-auto">
              <MemoLoader width={40} height={40} color={"#2A6083"} />
            </div>
          )}
        </div>
        <div className="w-full items-center mt-auto flex">
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
          selectData={""}
          setData={() => {}}
          listOption={[]}
          listName="Pilih Paket Soal"
          hide
        />
        <div className="flex flex-col justify-between gap-4 p-4 rounded-lg mt-4 border bg-white">
          <p className="font-semibold ">Materi Soal</p>
          <div className="grid">
            {/* <div className="col-span-3 h-full border rounded-lg flex">
              {dataChartSoal ? (
                <ChartCard
                  datas={dataChartSoal}
                  legend={legenda}
                  centerContent={{
                    label: "Jumlah Soal",
                    value: total,
                  }}
                />
              ) : (
                <div className="m-auto">
                  <MemoLoader width={30} height={30} color={"#2A6083"} />
                </div>
              )}
            </div> */}
            <div className="  text-xs grid grid-cols-2 gap-2">
              {groupedData ? (
                groupedData?.map((el, idx) => (
                  <div
                    key={idx}
                    className="border flex-col gap-3 flex rounded-lg p-2.5"
                  >
                    <p className="text-xs font-medium">{el.materi}</p>
                    <div className="flex gap-3">
                      {el.data?.map((kat, idx) => (
                        <div
                          key={idx}
                          className="p-1 px-2 border rounded-lg w-full"
                        >
                          <p className="text-[10px]">{kat.nama_kategori}</p>
                          <p className="text-[11px] font-bold">
                            {kat.jumlah_soal}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <Skeletons count={6} />
              )}
            </div>
          </div>
          {/* <p className="text-xs">
            Data ini menampilkan sesuai dengan filter yang dipilih
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default JadwalSesiSection;
