import React, { FC } from "react";

interface LoaderProps {
  width: number;
  height: number;
  color: string;
}

const Loader: FC<LoaderProps> = ({ width, height, color }) => {
  return (
    <svg
      style={{
        margin: "auto",
        background: "0 0",
      }}
      width={width}
      height={height}
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
      display='block'
    >
      <circle
        cx={50}
        cy={50}
        fill='none'
        stroke={color}
        strokeWidth={10}
        r={35}
        strokeDasharray='164.93361431346415 56.97787143782138'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='1s'
          values='0 50 50;360 50 50'
          keyTimes='0;1'
        />
      </circle>
    </svg>
  );
};

const MemoLoader = React.memo(Loader);
export default MemoLoader;
