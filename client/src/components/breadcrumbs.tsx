import { ChevronRight } from "lucide-react";
import React, { FC } from "react";

interface BreadcrumbsProps {
  paths: {
    label: string;
    path?: string;
  }[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ paths }) => {
  return (
    <nav className="flex">
      {paths.map((path, index) => (
        <div className="flex items-center gap-2">
          <a href={path.path} className="text-sm text-[#777674] cursor-pointer">
            {path.label}
          </a>
          {index < paths.length - 1 && (
            <ChevronRight color="#777674" size={16} className="mr-1" />
          )}
        </div>
      ))}
    </nav>
  );
};
