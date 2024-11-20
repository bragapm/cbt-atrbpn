import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";

interface IQuestion {
  loading: boolean;
  question: any;
  noSoal: number;
  category: string;
  handleNextQuestion: () => void;
  handlePrevQuestion: () => void;
}
const QuestionDetail: FC<IQuestion> = ({
  loading,
  question,
  noSoal,
  category,
  handleNextQuestion,
  handlePrevQuestion,
}) => {
  return (
    <div className="w-full bg-white/80 border rounded-[16px] p-3 flex flex-col gap-3">
      <div className="flex justify-between h-fit items-center">
        <div className="flex gap-2 items-center">
          <div
            className={`${
              category === "Sulit"
                ? "bg-[#F36A1D]/50 text-[#F36A1D]"
                : category === "Sangat Mudah"
                ? "bg-green-300 text-green-500"
                : category === "Sangat Mudah"
                ? "bg-[#1F93FF]/50 text-[#1F93FF]"
                : ""
            } rounded-md px-2 py-1`}
          >
            <p className={`font-medium`}>{category}</p>
          </div>
          <p className="text-primary font-medium">Soal No. {noSoal}</p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            disabled={loading}
            className="border rounded-md border-primary p-1 hover:bg-primary/20"
            onClick={handlePrevQuestion}
          >
            <ChevronLeft color="#2A6083" size={20} />
          </button>
          <button
            disabled={loading}
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
          className="p-2 rounded-lg border bg-white max-h-64 overflow-auto flex-1"
          dangerouslySetInnerHTML={{ __html: question }}
        ></div>
      ) : (
        <div className="h-10 text-center">Soal gagal dimuat</div>
      )}
    </div>
  );
};

export default QuestionDetail;
