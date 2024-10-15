import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

const AdminLayout: React.FC = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AdminLayout;
