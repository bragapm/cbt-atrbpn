import ListQuestTutorial from "../components/ListQuestTutorial";
import MultiChoiceTutorial from "../components/MultiChoiceTutorial";
import QuestDetailTutorial from "../components/QuestDetailTutorial";
import TimeTutorial from "../components/TimeTutorial";

import React, { useEffect, useState } from "react";
import Joyride, {
  CallBackProps,
  STATUS,
  Step,
  TooltipRenderProps,
} from "react-joyride";

import a11yChecker from "a11y-checker";

interface Props {
  breakpoint: string;
}

interface State {
  run: boolean;
  steps: Step[];
}

export default function ExamTutorial() {
  const handleNextQuestion = () => {};
  const handlePrevQuestion = () => {};
  const [tourState, setTourState] = useState<any>({
    run: true,
    steps: [
      {
        title: "Mulai Tutorial",
        // locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
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
        // styles: {
        //   options: {
        //     width: 300,
        //   },
        // },
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
    ],
  });

  useEffect(() => {
    a11yChecker();
  }, []);

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setTourState((prevState) => ({ ...prevState, run: true }));
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setTourState((prevState) => ({ ...prevState, run: false }));
    }
  };

  function Tooltip({
    backProps,
    continuous,
    index,
    isLastStep,
    primaryProps,
    skipProps,
    step,
    tooltipProps,
  }: TooltipRenderProps) {
    return (
      <div
        className="bg-white max-w-[295px] overflow-hidden rounded-xl border-2 border-w border-primary p-3 space-y-2"
        {...tooltipProps}
      >
        {step.title && (
          <p className="text-xl text-primary font-semibold">{step.title}</p>
        )}
        {step.content && <div className="text-sm">{step.content}</div>}
        <div className="p-2 bg-white">
          <div className="flex justify-between">
            {/* {!isLastStep && (
              <button {...skipProps}>
                <p>skip</p>
              </button>
            )} */}
            <div className="flex gap-2 justify-between w-full">
              {index > 0 && (
                <button
                  className="border border-primary text-primary rounded-xl px-3 p-2 text-sm"
                  {...backProps}
                >
                  <p>Sebelumnya</p>
                </button>
              )}
              <button
                className="border border-primary bg-primary text-white rounded-xl px-3 p-2 text-sm"
                {...primaryProps}
              >
                <p>Selanjutnya</p>
              </button>
            </div>
          </div>
        </div>
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
        // showProgress
        // showSkipButton
        steps={tourState.steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        tooltipComponent={Tooltip}
      />
      <section className="demo__hero">
        <div>
          <button
            onClick={handleClickStart}
            className="p-3 border hover:bg-gray-200 rounded-lg"
          >
            Start
          </button>
        </div>
      </section>
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
