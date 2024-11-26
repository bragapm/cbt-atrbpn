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
    <div className="w-full bg-white/80 border rounded-[16px] p-3 flex flex-col gap-3 h-fit">
      <div className="flex justify-between h-fit items-center">
        <div className="flex gap-2 items-center">
          <div
            className={`${
              category === "Sulit"
                ? "bg-[#F36A1D]/10 text-[#F36A1D]"
                : category === "Sangat Mudah"
                ? "bg-green-50 text-green-500"
                : category === "Mudah"
                ? "bg-[#1F93FF]/10 text-[#1F93FF]"
                : ""
            } rounded-lg px-3 py-1`}
          >
            <p className={`font-medium text-sm`}>{category}</p>
          </div>
          <p className="text-primary font-medium">Soal No. {noSoal}</p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            disabled={loading}
            className="border rounded-xl border-primary p-1 px-2 text-sm text-primary hover:bg-primary/20"
            onClick={handlePrevQuestion}
          >
            Sebelumnya
          </button>
          <button
            disabled={loading}
            onClick={handleNextQuestion}
            className="border rounded-xl border-primary p-1 px-2 text-sm text-primary hover:bg-primary/20  "
          >
            Selanjutnya
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
          className="p-2 rounded-lg border bg-white max-h-40 overflow-auto flex-1 pb-6"
          dangerouslySetInnerHTML={{ __html: question }}
        ></div>
      ) : (
        <div className="h-10 text-center">Soal gagal dimuat</div>
      )}
    </div>
  );
};

export default QuestionDetail;
