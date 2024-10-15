import CardHeader from "./CardHeader";
import ChartCard from "./ChartCard";

const StatistikJadwal = () => {
  const cardlist = [
    { name: "Sesi Ujian Hari ini", value: 1000 },
    { name: "Sesi Ujian Minggu Ini", value: 30 },
    { name: "Sesi Ujian Bulan Ini", value: 20 },
  ];
  return (
    <div className=" space-y-4 ">
      <CardHeader
        title={"Statistik Jadwal Ujian"}
        subtitle={"Data ditampilkan sesuai dengan filter"}
        listOption={[]}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className=" gap-4 grid">
          {cardlist.map((el) => (
            <div
              className="border px-4 py-3 rounded-lg flex gap-4 items-center bg-white"
              key={el.value}
            >
              <div className="rounded-full shadow-md w-12 h-12 border border-gray-100 flex items-center text-center">
                <p className="m-auto">ic</p>
              </div>
              <div className="">
                <p className="font-bold text-xl">{el.value}</p>
                <p className="text-xs">{el.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1">
          <ChartCard labels={["ada", "dua"]} data={[3, 4]} />
        </div>
      </div>
    </div>
  );
};

export default StatistikJadwal;
