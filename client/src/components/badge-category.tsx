import { Badge } from "./ui/badge";
import React from "react";

type IBadgeCategory = {
  name: string;
};

const BadgeCategory: React.FC<IBadgeCategory> = ({ name }) => {
  const conditionalColor = () => {
    if (name === "Sulit") {
      return "bg-[#FEF4F0] text-[#F36A1D] px-4 py-1 border-[#F36A1D]";
    }

    if (name === "Sangat Mudah") {
      return "bg-[#F2FAF2] text-green-500 px-4 py-1 border-green-500";
    }

    if (name === "Mudah") {
      return "bg-[#F2FCFC] text-[#1F93FF] px-4 py-1 border-[#1F93FF]";
    }

    return null;
  };

  return (
    <Badge variant="outline" className={conditionalColor()}>
      {name}
    </Badge>
  );
};

export default BadgeCategory;
