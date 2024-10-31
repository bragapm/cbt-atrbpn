import { Button } from "@/components/ui/button";
import { Info, RefreshCcw } from "lucide-react";
import { FC, useState } from "react";

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
    <div className="w-full bg-white border rounded-2xl p-3 grid gap-2 flex-1">
      <p className="text-primary font-medium">Pilih Jawaban Anda</p>
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
            </div>
          );
        })
      ) : (
        <div className="h-10"></div>
      )}

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
