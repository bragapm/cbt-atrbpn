import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { FC } from "react";

interface IQuestion {
  loading: boolean;
  question: any;
  handleNextQuestion: () => void;
  handlePrevQuestion: () => void;
}
const QuestionDetail: FC<IQuestion> = ({
  loading,
  question,
  handleNextQuestion,
  handlePrevQuestion,
}) => {
  return (
    <div className="w-full bg-white/80 border rounded-[16px] p-3 grid gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            className={`text-primary bg-primary/20 rounded-md px-2 py-1 text-[10px]`}
          >
            <p className={`font-medium`}>Sulit</p>
          </div>
          <p className="text-primary font-medium">Soal No.1</p>
          <p className="text-sm">| Soal Kategori Tugas Pokok PPAT</p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            className="border rounded-md border-primary p-1 hover:bg-primary/20"
            onClick={handlePrevQuestion}
          >
            <ChevronLeft color="#2A6083" size={20} />
          </button>
          <button
            onClick={handleNextQuestion}
            className="border rounded-md border-primary p-1 hover:bg-primary/20"
          >
            <ChevronRight color="#2A6083" size={20} />
          </button>
        </div>
      </div>
      {loading ? (
        <>
          <div className="h-6 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-6 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-6 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-6 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </>
      ) : question ? (
        <div
          className="p-2 rounded-lg border bg-white max-h-64 overflow-auto"
          dangerouslySetInnerHTML={{ __html: question }}
        ></div>
      ) : (
        <div className="h-10"></div>
      )}
    </div>
  );
};

export default QuestionDetail;
