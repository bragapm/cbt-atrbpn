import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";
import { Sidebar } from "@/components/sidebar";

const AdminLayout: React.FC = () => {
  return (
    <MainLayout variant="admin">
      <div className="w-full flex gap-2">
        <Sidebar />
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default AdminLayout;
