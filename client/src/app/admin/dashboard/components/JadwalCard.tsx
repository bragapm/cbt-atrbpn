import { Button } from "@/components/ui/button";

const JadwalCard = () => {
  const StartEndTime = (title, time, date) => {
    return (
      <div>
        <p>{title}</p>
        <p className="text-xl font-bold">{time}</p>
        <p>{date}</p>
      </div>
    );
  };

  return (
    <div className="bg-white border rounded-lg p-4 text-xs grid">
      <div className="bg-green-100 rounded-full px-2 py-1 text-green-500 text-[10px] w-fit">
        Sedang Berlangsung
      </div>
      <div className="flex gap-2 items-center ">
        {StartEndTime("Mulai", "10:00", "20 November 2024")}
        <div className="bg-white shadow-md rounded-full border border-gray-50 p-3 flex">
          <img src={"/images/ic-arrow-right.svg"} className="m-auto"></img>
        </div>
        {StartEndTime("Selesai", "12:00", "20 November 2024")}
      </div>
      <hr className="my-2" />
      <div>
        <p>Nama Ujian</p>
        <p className="text-xl font-bold">Ujian Sertifikasi Notaris</p>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between">
        <div>
          <p>Batch</p>
          <p className="text-sm font-bold">Batch 03</p>
        </div>
        <div>
          <p>Durasi</p>
          <p className="text-sm font-bold">60 Menit</p>
        </div>
      </div>
      <div className=" pt-4">
        <Button className="bg-[#8CBAC7] text-white w-full">Lihat Detail</Button>
      </div>
    </div>
  );
};

export default JadwalCard;
