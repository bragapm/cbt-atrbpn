import { FileCheck, FileText, Home, PenTool, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
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

function SidebarComponent({
  title,
  subtitle,
  sections,
  activePath,
}: SidebarProps) {
  return (
    <div className="w-[380px] rounded-xl shadow bg-white h-[83vh] flex flex-col border-r fixed z-50">
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
                <li key={itemIndex} className="mb-1">
                  <Link
                    to={item.href}
                    className={`flex items-center px-2 py-4 text-sm rounded-md ${
                      activePath === item.href
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
  const sidebarData = {
    title: "Dashboard",
    subtitle: "Admin",
    activePath: "/",
    sections: [
      {
        title: "Soal",
        items: [
          { icon: <Home size={18} />, label: "Dashboard", href: "/" },
          {
            icon: <FileText size={18} />,
            label: "Management Bank Soal",
            href: "/bank-soal",
          },
          {
            icon: <PenTool size={18} />,
            label: "Management Ujian",
            href: "/ujian",
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
          },
          {
            icon: <User size={18} />,
            label: "Akun Admin",
            href: "/akun-admin",
          },
          {
            icon: <FileCheck size={18} />,
            label: "Management Hasil Ujian",
            href: "/hasil-ujian",
          },
        ],
      },
    ],
  };

  return <SidebarComponent {...sidebarData} />;
}
