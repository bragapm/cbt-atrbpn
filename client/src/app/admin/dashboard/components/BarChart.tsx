import { FC, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface BarChartProps {
  labels: string[];
  data: any[];
  height?: number;
}

const BarChart: FC<BarChartProps> = ({ labels, data, height = 300 }) => {
  // Calculate the residual value
  const chartData = {
    labels,
    datasets: [
      {
        label: "Rata-rata nilai",
        data: data,
        backgroundColor: ["#2A6083"],
        hoverBackgroundColor: "white",
        hoverBorderColor: "navy",
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false, // Show legend
        // labels: {
        //   generateLabels: function (chart: any) {
        //     const originalLabels =
        //       ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
        //     // Filter out the "Sisa" dataset
        //     return originalLabels.filter((label) => label.text !== "Sisa");
        //   },
        // },
      },
      tooltip: {
        // callbacks: {
        //   label: function (context: any) {
        //     let label = context.dataset.label || "";
        //     if (label) {
        //       label += ": ";
        //     }
        //     if (context.raw !== null) {
        //       const dataset = context.dataset.originalData[context.dataIndex];
        //       const count = parseFloat(dataset.count);
        //       const max = parseFloat(dataset.max);
        //       const percentage = ((count / max) * 100).toFixed(2);
        //       label += `${count} dari ${max} (${percentage}%)`;
        //     }
        //     return label;
        //   },
        // },
        // backgroundColor: "#f3f6f4",
        // titleFont: {
        //   size: 12,
        // },
        // titleColor: "#0066ff",
        // bodyColor: "#000",
        // bodyFont: {
        //   size: 8,
        // },
        // displayColors: true,
        // padding: 10,
        // cornerRadius: 3,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <Bar data={chartData} options={options} height={height} className="z-50" />
  );
};

export default BarChart;
