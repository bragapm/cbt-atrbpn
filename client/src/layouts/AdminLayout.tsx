import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";
import { Sidebar } from "@/components/sidebar";

const AdminLayout: React.FC = () => {
  return (
    <MainLayout variant="admin">
      <div className="w-full flex gap-2 mt-28">
        <Sidebar />
        <div className="pl-96 w-full">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminLayout;
