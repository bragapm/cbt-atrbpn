import { AlertCircle } from "lucide-react";
import React from "react";

const ErrorPlaceholder: React.FC = () => {
  return (
    <div className="w-full h-[65vh] flex items-center justify-center flex-col gap-2">
      <AlertCircle className="w-10 h-10 text-red-600" />
      <p className="text-sm font-semibold text-gray-500">Terjadi Kealahan</p>
    </div>
  );
};

export default ErrorPlaceholder;
