import Navbar from "@/components/navbars";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Navbar />
      <div className="flex gap-2">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
