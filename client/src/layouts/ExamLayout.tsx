import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

const ExamLayout = () => {
  return (
    <MainLayout variant="admin">
      <div className="w-full h-[85vh] rounded-lg">
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default ExamLayout;
