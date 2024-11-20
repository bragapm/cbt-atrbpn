import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetUserTatib } from "../hooks/useGetUserTatib";
import PDFViewers from "@/app/admin/management-tatib/components/PDFViewers";

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

  useEffect(() => {
    getTatib();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (element) {
        const scroll = element.scrollTop + element.clientHeight;
        const divHeight = element.scrollHeight - 400;
        if (scroll >= divHeight) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
        }
      }
    };

    if (elementRef.current) {
      elementRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex gap-4 flex-col ">
      <div className="flex gap-2 items-center justify-between ">
        <img src="/images/logo.svg" alt="logo" />
        <p className="text-xl text-light font-semibold">Tata Tertib Ujian</p>
        <p></p>
      </div>
      <div
        className="border rounded-lg p-4 bg-gray-200 h-full overflow-y-scroll"
        ref={elementRef}
      >
        <PDFViewers file={data} />
      </div>
      <div className="flex gap-2">
        <input
          className="rounded-full"
          type="checkbox"
          value={check}
          onClick={() => setChecked(!check)}
        ></input>
        <p className=" text-sm w-full space-x-3">
          Saya setuju dengan ketentuan dan persyaratan yang ditentukan
        </p>
      </div>
      <Button
        variant="default"
        className="h-14 w-fit mx-auto"
        disabled={check && isLoading ? false : true}
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
