import { useRef, useEffect, FC, useState } from "react";
import { Chart } from "chart.js";

interface DoughnutChartProps {
  labels: string[];
  data: number[];
}
const ChartCard: FC<DoughnutChartProps> = ({ labels, data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [prevLabels, setPrevLabels] = useState<string[]>([]);
  const [prevData, setPrevData] = useState<number[]>([]);

  // useEffect(() => {
  //   if (
  //     labels.length !== prevLabels.length ||
  //     data.length !== prevData.length
  //   ) {
  //     const myChart = new Chart(chartRef.current, {
  //       type: "doughnut",
  //       data: {
  //         labels,
  //         datasets: [
  //           {
  //             data,
  //             backgroundColor: [
  //               "rgba(255, 99, 132, 0.2)",
  //               "rgba(54, 162, 235, 0.2)",
  //               "rgba(255, 206, 86, 0.2)",
  //               // ...
  //             ],
  //             borderColor: [
  //               "rgba(255, 99, 132, 1)",
  //               "rgba(54, 162, 235, 1)",
  //               "rgba(255, 206, 86, 1)",
  //               // ...
  //             ],
  //             borderWidth: 1,
  //           },
  //         ],
  //       },
  //       options: {
  //         // ...
  //       },
  //     });

  //     return () => {
  //       myChart.destroy();
  //     };
  //   }
  // }, [labels, data, prevLabels, prevData]);

  useEffect(() => {
    setPrevLabels(labels);
    setPrevData(data);
  }, [labels, data]);
  return (
    <div className="border rounded-lg p-4 bg-white">
      {/* <canvas ref={chartRef} /> */}
      <p></p>
    </div>
  );
};

export default ChartCard;
