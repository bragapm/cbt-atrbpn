import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

const AuthLayout = () => {
  return (
    <MainLayout>
      <div className="bg-gray-200 w-full h-[85vh] rounded-lg p-8">
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default AuthLayout;
