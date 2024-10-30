import QuestionDetail from "../components/QuestionDetail";
import MultipleChoice from "../components/MultipleChoice";
import RemainingTime from "../components/RemainingTime";
import ListQuestionNumbers from "../components/ListQuestionNumbers";
import { useGetSoal } from "../hooks/useGetSoal";
import { useEffect, useState } from "react";

const ExamCbtPage = () => {
  const { data, error, getSoal } = useGetSoal();
  const [listSoal, setListSoal] = useState([]);
  const [answer, setAnswer] = useState("");

  const [selectSoal, setSelectSoal] = useState(1);

  const handleNextQuestion = () => {};
  const handlePrevQuestion = () => {};

  const handleClearAnswer = () => {
    setAnswer("");
  };

  const handleSelectAnswer = (answer) => {
    setAnswer(answer);
  };

  const handleclickSoal = (number) => {
    setSelectSoal(number);
  };
  useEffect(() => {
    getSoal(1);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-3 grid gap-2">
        <QuestionDetail
          question={{}}
          handleNextQuestion={handleNextQuestion}
          handlePrevQuestion={handlePrevQuestion}
        />
        <MultipleChoice
          answer={answer}
          listJawaban={[]}
          handleClearAnswer={handleClearAnswer}
          handleSelectAnswer={handleSelectAnswer}
        />
      </div>
      <div className="flex flex-col gap-2">
        <RemainingTime />
        <ListQuestionNumbers
          selectSoal={selectSoal}
          setSelectSoal={handleclickSoal}
          listSoal={listSoal}
          listAnswer={[]}
        />
      </div>
    </div>
  );
};

export default ExamCbtPage;
