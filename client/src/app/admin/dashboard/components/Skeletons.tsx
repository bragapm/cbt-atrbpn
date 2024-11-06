import React, { FC } from "react";

interface ISkeleton {
  count: number;
}

const Skeletons: FC<ISkeleton> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="h-8 w-full bg-gray-200 rounded-lg animate-pulse"
        />
      ))}
    </>
  );
};

export default Skeletons;
