import ExamTutorial from "@/app/client/tutorial/pages/ExamTutorial";
import ExamCbtPage from "@/app/client/test-cbt/pages/ExamCbtPage";
import FinishExam from "@/app/client/test-cbt/pages/FinishExam";
import PinPage from "@/app/client/test-cbt/pages/PinPage";
import ExamLayout from "@/layouts/ExamLayout";

export const userProtectedRoutes = [
  {
    path: "/exam",
    element: <ExamLayout />,
    children: [
      {
        index: true,
        element: <ExamCbtPage />,
      },
      {
        path: "finish",
        element: <FinishExam />,
      },
      {
        path: "tutorial",
        element: <ExamTutorial />,
      },
      {
        path: "pin",
        element: <PinPage />,
      },
    ],
  },
];
