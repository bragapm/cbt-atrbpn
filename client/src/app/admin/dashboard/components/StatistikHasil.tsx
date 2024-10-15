import CardHeader from "./CardHeader";
import ChartCard from "./ChartCard";

const StatistikHasil = () => {
  return (
    <div className=" space-y-4 ">
      <CardHeader
        title={"Statistik Hasil Ujian"}
        subtitle={"Data ditampilkan sesuai dengan filter"}
        listOption={[]}
      />
      <div className="p-4 bg-white rounded-lg">
        <div className="grid grid-cols-4 gap-4 w-full justify-between">
          <div className="col-span-1">
            <ChartCard labels={["ada", "dua"]} data={[3, 4]} />
          </div>
          <div className=" col-span-1 p-4 border rounded-lg text-xs flex flex-col gap-2 bg-white ">
            <p>Materi Soal</p>
            {[1, 2, 3, 4, 5].map((el) => (
              <div key={el}>
                <p className="font-bold">32</p>
                <p className="text-[10px]">Bahasa Indo</p>
              </div>
            ))}
          </div>
          <div className="col-span-2">
            <ChartCard labels={["ada", "dua"]} data={[3, 4]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikHasil;
