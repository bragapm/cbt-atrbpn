import React from "react";

type ITableActions = {
  title: string;
  description: string;
  actions?: React.ReactNode;
};

const TableActions: React.FC<ITableActions> = ({
  title,
  description,
  actions,
}) => {
  return (
    <div className="w-full justify-between flex items-center h-[60px]">
      <div className="flex flex-col">
        <h1 className="text-base font-medium text-gray-600">{title}</h1>
        <p className="text-sm font-light">{description}</p>
      </div>

      {actions}
    </div>
  );
};

export default TableActions;
