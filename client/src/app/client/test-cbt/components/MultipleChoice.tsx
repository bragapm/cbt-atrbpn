import { Button } from "@/components/ui/button";
import { Info, RefreshCcw, Check } from "lucide-react";

import { FC } from "react";

interface IMultiChoice {
  loading: boolean;
  answer: any;
  listJawaban: any[];
  listSubmitAnswer: any[];
  handleClearAnswer: () => void;
  handleSelectAnswer: (val: any) => void;
}

const MultipleChoice: FC<IMultiChoice> = ({
  loading,
  answer,
  listJawaban,
  listSubmitAnswer,
  handleClearAnswer,
  handleSelectAnswer,
}) => {
  const listalpabet = ["A", "B", "C", "D", "E"];

  return (
    <div className="w-full bg-white border rounded-2xl p-3 flex flex-col gap-2 flex-1 h-full overflow-auto">
      <p className="text-primary font-medium">Pilih Jawaban Anda</p>
      <div className="grid gap-2 flex-1">
        {loading ? (
          <>
            <div className="h-8 w-full bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-8 w-full bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-8 w-full bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-8 w-full bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-8 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          </>
        ) : listJawaban ? (
          listJawaban.map((el, idx) => {
            const isSelected = listSubmitAnswer?.some(
              (answer) => answer.answer === el.id
            );
            return (
              <div
                key={el.id}
                className={`flex gap-2 border p-2 rounded-xl hover:bg-primary/20 cursor-pointer ${
                  isSelected ? "bg-[#F5FBFB] border-[#2A6083]" : ""
                }`}
                onClick={() => handleSelectAnswer(el.id)}
              >
                <div
                  className={`${
                    isSelected ? "bg-[#2A6083]" : "bg-primary"
                  } w-6 h-6 text-white rounded-lg flex text-xs`}
                >
                  <p className="m-auto">{listalpabet[idx]}</p>
                </div>
                <div className="flex-1">
                  <p>{el.text}</p>
                </div>
                {isSelected && (
                  <div className=" mb-auto rounded-sm bg-[#2A6083] p-0.5">
                    <Check className="text-white w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="h-10 text-center">Soal gagal dimuat</div>
        )}
      </div>

      <div className="flex gap-4 items-center mt-4">
        <Button className="rounded-xl gap-2" onClick={handleClearAnswer}>
          Clear Jawaban
          <RefreshCcw size={16} />
        </Button>
        <div className="flex gap-2 items-center">
          <Info size={16} />
          <p className="text-sm">Clear jawaban untuk menghapus jawaban</p>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
