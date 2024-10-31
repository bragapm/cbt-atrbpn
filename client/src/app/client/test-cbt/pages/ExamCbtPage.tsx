import ListQuestionNumbers from "../components/ListQuestionNumbers";
import QuestionDetail from "../components/QuestionDetail";
import MultipleChoice from "../components/MultipleChoice";
import RemainingTime from "../components/RemainingTime";
import { useGetSoal } from "../hooks/useGetSoal";
import { useEffect, useState } from "react";
import useSubmitAnswer from "../hooks/useSubmitAnswer";

const ExamCbtPage = () => {
  const { data, isLoading, error, getSoal } = useGetSoal();
  const { loadingAnswer, error: errorAnswer, submitAnswer } = useSubmitAnswer();
  const dataCbt = JSON.parse(localStorage.getItem("dataTest"));
  const listSoal = dataCbt?.problems;

  const [selectSoal, setSelectSoal] = useState(listSoal[0]);
  const [oneget, setOneget] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  console.log(data);

  const handleNextQuestion = () => {
    const currentIndex = listSoal.findIndex((item) => item === selectSoal);
    if (currentIndex < listSoal.length - 1) {
      setSelectSoal(listSoal[currentIndex + 1]);
      getSoal(listSoal[currentIndex + 1]);
    }
  };
  const handlePrevQuestion = () => {
    const currentIndex = listSoal.findIndex((item) => item === selectSoal);
    if (currentIndex > 0) {
      setSelectSoal(listSoal[currentIndex - 1]);
      getSoal(listSoal[currentIndex - 1]);
    }
  };

  const handleClearAnswer = () => {
    setAnswer("");
  };

  const handleSelectAnswer = (answer) => {
    setAnswer(answer);
    submitAnswer({ problem_id: selectSoal, answer_id: answer }, () =>
      getSoal(selectSoal, false)
    );
  };

  const handleclickSoal = (number) => {
    setSelectSoal(number);
    getSoal(number);
  };

  useEffect(() => {
    if (!oneget) {
      getSoal(selectSoal);
      setOneget(true);
    }
  }, [oneget]);

  return (
    <div className="grid grid-cols-4 gap-2 h-[85vh]">
      <div className="col-span-3 grid gap-2 h-full">
        <QuestionDetail
          loading={isLoading}
          question={data?.question}
          handleNextQuestion={handleNextQuestion}
          handlePrevQuestion={handlePrevQuestion}
        />
        <MultipleChoice
          loading={isLoading}
          answer={answer}
          listJawaban={data?.answerChoices}
          listSubmitAnswer={data?.submittedAnswers}
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
          listAnswer={data?.submittedAnswers}
        />
      </div>
    </div>
  );
};

export default ExamCbtPage;
