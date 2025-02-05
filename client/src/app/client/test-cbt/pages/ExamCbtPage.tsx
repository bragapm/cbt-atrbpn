import ListQuestionNumbers from "../components/ListQuestionNumbers";
import QuestionDetail from "../components/QuestionDetail";
import MultipleChoice from "../components/MultipleChoice";
import RemainingTime from "../components/RemainingTime";
import useSubmitAnswer from "../hooks/useSubmitAnswer";
import { useGetSoal } from "../hooks/useGetSoal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExamCbtPage = () => {
  const { data, isLoading, error, getSoal } = useGetSoal();
  const { loadingAnswer, error: errorAnswer, submitAnswer } = useSubmitAnswer();
  const dataCbt = JSON.parse(localStorage.getItem("dataTest"));
  const listSoal = dataCbt?.problems;
  const navigate = useNavigate();

  const [selectSoal, setSelectSoal] = useState(listSoal ? listSoal[0] : "");
  const [noSoal, setNoSoal] = useState(1);
  const [oneget, setOneget] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    if (!oneget) {
      if (dataCbt == null) {
        navigate("/exam/pin");
      }
      getSoal(selectSoal);
      setOneget(true);
    }
  }, [oneget]);

  function addhour(isoString, hoursToAdd) {
    const date = new Date(isoString);
    date.setHours(date.getHours() + hoursToAdd);
    return date.toISOString();
  }

  const remaintime = dataCbt ? addhour(dataCbt?.start_attempt_at, 2) : "";

  const handleNextQuestion = () => {
    const currentIndex = listSoal.findIndex((item) => item === selectSoal);
    if (currentIndex < listSoal.length - 1) {
      setSelectSoal(listSoal[currentIndex + 1]);
      getSoal(listSoal[currentIndex + 1]);
      setNoSoal(noSoal + 1);
    }
  };

  const handlePrevQuestion = () => {
    const currentIndex = listSoal.findIndex((item) => item === selectSoal);
    if (currentIndex > 0) {
      setSelectSoal(listSoal[currentIndex - 1]);
      getSoal(listSoal[currentIndex - 1]);
      setNoSoal(noSoal - 1);
    }
  };

  const handleClearAnswer = () => {
    setAnswer("");
    submitAnswer({ problem_id: selectSoal, answer_id: "0" }, () =>
      getSoal(selectSoal, false)
    );
  };

  const handleSelectAnswer = (answer) => {
    setAnswer(answer);
    submitAnswer({ problem_id: selectSoal, answer_id: answer }, () =>
      getSoal(selectSoal, false)
    );
  };

  const handleclickSoal = (number, noSoal) => {
    setSelectSoal(number);
    getSoal(number);
    setNoSoal(noSoal);
  };

  return (
    <div className="grid grid-cols-4 gap-2 h-[85vh]">
      <div className="col-span-3 flex flex-col gap-2 h-full">
        <QuestionDetail
          loading={isLoading}
          question={data?.question}
          noSoal={noSoal}
          category={data?.category_name}
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
        <RemainingTime dataObj={dataCbt} />
        <ListQuestionNumbers
          selectSoal={selectSoal}
          setSelectSoal={handleclickSoal}
          listSoal={listSoal}
          listAnswer={data?.submittedAnswers}
          isloading={isLoading}
        />
      </div>
    </div>
  );
};

export default ExamCbtPage;
