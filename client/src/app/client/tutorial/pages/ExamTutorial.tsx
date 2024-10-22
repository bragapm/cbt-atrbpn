import ListQuestTutorial from "../components/ListQuestTutorial";
import MultiChoiceTutorial from "../components/MultiChoiceTutorial";
import QuestDetailTutorial from "../components/QuestDetailTutorial";
import TimeTutorial from "../components/TimeTutorial";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import Joyride, {
  CallBackProps,
  STATUS,
  Step,
  TooltipRenderProps,
} from "react-joyride";

import a11yChecker from "a11y-checker";

export default function ExamTutorial() {
  const navigate = useNavigate();

  const [tourState, setTourState] = useState<any>({
    run: true,
    steps: [
      {
        title: "Mulai Tutorial",
        placement: "center",
        target: "body",
      },
      {
        content: "Gunakan tombol Navigasi ini untuk memilih page soal",
        floaterProps: {
          disableAnimation: true,
        },
        // spotlightPadding: 50,
        placement: "left",
        target: ".demo_quest",
        title: "Page soal",
      },
      {
        content:
          "Pilih jawaban yang paling tepat dengan mengklik opsi yang tersedia.",
        placement: "left",

        target: ".demo_choice",
        title: "Section Jawaban",
      },
      {
        content:
          "Anda dapat melihat waktu ujian yang tersisa di pojok atas layar",
        placement: "left",
        target: ".demo_time",
        title: "Waktu Tersisa",
      },
      {
        content: "Gunakan tombol Navigasi Soal untuk berpindah antar soal.",
        placement: "left",
        target: ".demo_listquest",
        title: "Navigasi Soal",
      },
      {
        content: "Informasi warna akan membantu anda memahami navigasi soal",
        placement: "left",
        target: ".demo_ket",
        title: "Keterangan",
      },
      {
        content: "Tombol ini untuk mengakhiri ujian",
        placement: "left",
        target: ".finish_time",
        title: "Akhiri Ujian",
      },
      {
        title: "Selesai tutorial",
        placement: "center",
        target: "body",
      },
    ],
  });

  useEffect(() => {
    a11yChecker();
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setTourState((prevState) => ({ ...prevState, run: false }));
      navigate("/exam/pin");
    }
  };

  function Tooltip({
    backProps,
    index,
    primaryProps,
    step,
    tooltipProps,
  }: TooltipRenderProps) {
    const [count, setCount] = useState(10);
    const [disable, setdisable] = useState(true);

    useEffect(() => {
      let intervalId;
      if (index === 7) {
        intervalId = setInterval(() => {
          setCount((prevCount) => {
            if (prevCount > 0) {
              return prevCount - 1;
            } else {
              clearInterval(intervalId);
              setdisable(false);
              return 0;
            }
          });
        }, 1000);
      }

      return () => clearInterval(intervalId);
    }, [count, index]);

    const formattedTime = new Date(count * 1000).toISOString().slice(11, 19);

    return (
      <div
        className="bg-white max-w-[395px] overflow-hidden rounded-xl border-2 border-w border-primary p-3 space-y-2"
        {...tooltipProps}
      >
        {index === 7 ? (
          <div className="grid gap-6">
            <div className="flex justify-between gap-2 items-center px-10">
              <img src="/images/logo.svg" />{" "}
              <p className=" text-lg font-semibold">WAKTU LATIHAN SELESAI </p>
              <p></p>
            </div>
            <p className="text-center">
              Silahkan klik tombol Mulai Ujian setelah tombol berwana biru untuk
              memulai ujian
            </p>
            <div className="text-red-500 text-4xl font-semibold p-3 border rounded-lg mx-auto w-fit">
              <p className="text-center">{formattedTime}</p>
            </div>
            <button
              disabled={disable}
              className={`border border-primary text-white rounded-xl px-11 p-2 text-sm mx-auto ${
                disable ? "bg-gray-400" : "bg-primary"
              }`}
              {...primaryProps}
            >
              <p>Mulai Ujian</p>
            </button>
          </div>
        ) : (
          <>
            {step.title && (
              <p className="text-xl text-primary font-semibold">{step.title}</p>
            )}
            {step.content && <div className="text-sm">{step.content}</div>}
            <div className="p-2 bg-white">
              <div
                className={`${
                  index !== 0 && "flex gap-2"
                }  justify-between w-full`}
              >
                {index > 0 && (
                  <button
                    className="border border-primary text-primary rounded-xl px-3 p-2 text-sm w-full"
                    {...backProps}
                  >
                    <p>Sebelumnya</p>
                  </button>
                )}
                <button
                  className="border border-primary bg-primary text-white rounded-xl px-3 p-2 text-sm w-full"
                  {...primaryProps}
                >
                  <p> {index === 0 ? "Mulai" : "Selanjutnya"}</p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        run={tourState.run}
        scrollToFirstStep
        disableOverlayClose
        steps={tourState.steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        tooltipComponent={Tooltip}
      />
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-3 grid gap-2">
          <QuestDetailTutorial />
          <MultiChoiceTutorial />
        </div>
        <div className="flex flex-col gap-2">
          <TimeTutorial />
          <ListQuestTutorial />
        </div>
      </div>
    </div>
  );
}
