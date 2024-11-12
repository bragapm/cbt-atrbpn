import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IjadwalCard {
  data: any;
}
const JadwalCard: FC<IjadwalCard> = ({ data }) => {
  const navigate = useNavigate();
  const [statusStyle, setStatusStyle] = useState(null);
  const StartEndTime = (title, time, date) => {
    return (
      <div>
        <p>{title}</p>
        <p className="text-lg font-bold">{time}</p>
        <p>{date}</p>
      </div>
    );
  };
  useEffect(() => {
    if (new Date().getTime() > new Date(data.end_time).getTime()) {
      setStatusStyle({
        status: "Selesai",
        style: "text-green-500 bg-green-100",
      });
    } else if (new Date().getTime() > new Date(data.start_time).getTime()) {
      setStatusStyle({
        status: "Sedang Berlangsung",
        style: "text-green-500 bg-green-100",
      });
    } else {
      setStatusStyle({
        status: "Belum dimulai",
        style: "text-primary bg-primary/50",
      });
    }
  }, [data]);

  return (
    <div className="bg-white border rounded-lg px-5 py-4 text-xs flex flex-col justify-between w-full">
      <div
        className={`h-fit rounded-full px-2 py-1 text-[10px] w-fit ${statusStyle?.style}`}
      >
        {statusStyle?.status}
      </div>
      <div className="flex items-center justify-between">
        {StartEndTime(
          "Mulai",
          new Date(data.start_time).getHours() +
            " : " +
            new Date(data.start_time).getMinutes(),
          new Date(data.start_time).toDateString()
        )}
        <div className="bg-white shadow-md rounded-full border border-gray-50 p-3">
          <img
            src={"/images/ic-arrow-right.svg"}
            className="m-auto w-2.5"
          ></img>
        </div>
        {StartEndTime(
          "Selesai",
          new Date(data.end_time).getHours() +
            " : " +
            new Date(data.end_time).getMinutes(),
          new Date(data.end_time).toDateString()
        )}
      </div>
      <hr className="my-2" />
      <div>
        <p>Nama Ujian</p>
        <p className="text-xl font-bold">{data.name}</p>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between">
        <div>
          <p>Batch</p>
          <p className="text-sm font-bold">Batch {data.sesi_ujian}</p>
        </div>
        <div>
          <p>Durasi</p>
          <p className="text-sm font-bold">60 Menit</p>
        </div>
      </div>
      <div className="pt-4">
        <Button
          className="bg-[#8CBAC7] text-white w-full"
          onClick={() => {
            navigate("/ujian");
          }}
        >
          Lihat Detail
        </Button>
      </div>
    </div>
  );
};

export default JadwalCard;
