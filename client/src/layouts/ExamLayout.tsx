import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

const ExamLayout = () => {
  return (
    <MainLayout variant="admin">
      <div className="w-full h-[85vh] rounded-lg mt-28">
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default ExamLayout;