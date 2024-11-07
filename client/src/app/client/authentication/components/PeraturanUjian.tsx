import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useGetUserTatib } from "../hooks/useGetUserTatib";

interface IPeraturanUjian {
  check: any;
  setChecked: (val: boolean) => void;
  navigate: () => void;
}

const PeraturanUjian: FC<IPeraturanUjian> = ({
  check,
  setChecked,
  navigate,
}) => {
  const { data, error, getTatib } = useGetUserTatib();

  return (
    <div className="w-full h-full flex gap-4 flex-col ">
      <div className="flex gap-2 items-center justify-between ">
        <img src="/images/logo.svg" alt="logo" />
        <p className="text-xl text-light font-semibold">Peraturan Ujian</p>
        <p></p>
      </div>
      <div className="border rounded-lg p-4 bg-gray-200 h-full">
        Body Text placeholder dolor sit amet consectetur. Diam feugiat arcu ut
        massa diam duis diam mauris. Orci posuere tincidunt netus augue. Augue
        at facilisi cursus laoreet semper vel elementum. Lacinia massa porta
        nibh nunc magna quam id gravida. Sem egestas curabitur aenean malesuada.
        Lorem facilisi elementum.
      </div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          value={check}
          onClick={() => setChecked(!check)}
        ></input>
        <p className=" text-sm w-full space-x-3">
          Saya setuju dengan Perjanjian dan Ketentuan.
        </p>
      </div>
      <Button
        variant="default"
        className="h-14 w-fit mx-auto"
        disabled={!check}
        onClick={() => {
          navigate();
        }}
      >
        Saya Setuju
        <img src={"/images/ic-check-white.svg"} className="pl-2"></img>
      </Button>
    </div>
  );
};

export default PeraturanUjian;
