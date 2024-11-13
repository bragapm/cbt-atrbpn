import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

const AuthLayout = () => {
  return (
    <MainLayout variant="auth">
      <div
        className="bg-gray-200 w-full h-[85vh] rounded-lg p-8"
        style={{
          backgroundImage: `url(/images/bg-login.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default AuthLayout;
