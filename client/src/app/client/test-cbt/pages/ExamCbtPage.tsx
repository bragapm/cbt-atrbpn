import QuestionDetail from "../components/QuestionDetail";
import MultipleChoice from "../components/MultipleChoice";
import RemainingTime from "../components/RemainingTime";
import ListQuestionNumbers from "../components/ListQuestionNumbers";

const ExamCbtPage = () => {
  const handleNextQuestion = () => {};
  const handlePrevQuestion = () => {};

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-3 grid gap-2">
        <QuestionDetail
          question={{}}
          handleNextQuestion={handleNextQuestion}
          handlePrevQuestion={handlePrevQuestion}
        />
        <MultipleChoice />
      </div>
      <div className="flex flex-col gap-2">
        <RemainingTime />
        <ListQuestionNumbers />
      </div>
    </div>
  );
};

export default ExamCbtPage;
