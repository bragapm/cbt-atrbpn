import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { getAccessToken } from "@/midlewares/token";
import {
  FileCheck,
  FileText,
  Home,
  Monitor,
  Info,
  PenTool,
  Users,
  Folder,
} from "lucide-react";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  activepath?: string;
  isHide?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarProps {
  title: string;
  subtitle: string;
  sections: SidebarSection[];
  activePath: string;
}

function SidebarComponent({ title, subtitle, sections }: SidebarProps) {
  const { pathname } = useLocation();

  const firstSegment = pathname.split("/")[1];

  return (
    <div className="w-[365px] rounded-xl shadow bg-white h-[83vh] flex flex-col border-r fixed z-50">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold text-primary">{title}</h1>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {sections.map((section, index) => (
          <div key={index} className="p-4">
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              {section.title}
            </h2>
            <ul>
              {section.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className={`${item?.isHide && "hidden"} mb-1`}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center px-2 py-4 text-sm rounded-md ${
                      item?.activepath === firstSegment
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

// Example usage as a separate component
export function Sidebar() {
  const accessToken = getAccessToken();

  const { data: currentUser, isLoading } = useGetCurrentUser({
    enabled: !!accessToken,
  });

  useEffect(() => {
    localStorage.setItem("role", currentUser?.data?.role?.name);
  }, [currentUser]);

  const sidebarData: SidebarProps = {
    title: "Dashboard",
    subtitle: "Admin",
    activePath: "/",
    sections: [
      {
        title: "Soal",
        items: [
          {
            icon: <Home size={18} />,
            label: "Dashboard",
            href: "/",
            activepath: "",
          },
          {
            icon: <FileText size={18} />,
            label: "Management Bank Soal",
            href: "/bank-soal",
            activepath: "bank-soal",
          },
          {
            icon: <PenTool size={18} />,
            label: "Management Ujian",
            href: "/ujian",
            activepath: "ujian",
            isHide: currentUser?.data?.role?.name !== "Administrator",
          },
          {
            icon: <Monitor size={18} />,
            label: "Pendistribusian Soal",
            href: "/pendistribusian-soal",
            activepath: "pendistribusian-soal",
            isHide: currentUser?.data?.role?.name !== "Administrator",
          },
          {
            icon: <Folder size={18} />,
            label: "Kategori Soal",
            href: "/kategori-soal",
            activepath: "kategori-soal",
            isHide: currentUser?.data?.role?.name !== "Administrator",
          },
        ],
      },
      {
        title: "Kepesertaan",
        items: [
          {
            icon: <Users size={18} />,
            label: "Management Peserta CBT",
            href: "/peserta-cbt",
            activepath: "peserta-cbt",
          },
          {
            icon: <FileCheck size={18} />,
            label: "Management Hasil Ujian",
            href: "/hasil-ujian/hasil-akhir-ujian",
            activepath: "hasil-ujian",
          },
          {
            icon: <Users size={18} />,
            label: "Management Admin",
            href: "/admin",
            isHide: currentUser?.data?.role?.name !== "Administrator",
            activepath: "admin",
          },
          {
            icon: <Info size={18} />,
            label: "Management Tata Tertib",
            href: "/tatib",
            isHide: currentUser?.data?.role?.name !== "Administrator",
            activepath: "tatib",
          },
        ],
      },
    ],
  };

  return <SidebarComponent {...sidebarData} />;
}
