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
  jumlah?: number;
  jumlahKabupaten?: number;
  jumlahKecamatan?: number;
}

const BarChart: FC<BarChartProps> = ({
  labels,
  data,
  jumlah,
  jumlahKabupaten,
  jumlahKecamatan,
  height = 300,
}) => {
  const [percentageData, setPercentageData] = useState<number[]>([]);

  useEffect(() => {
    const calculatePercentage = (item: number, maxConditionValue: number) => {
      return parseFloat(((item / maxConditionValue) * 100).toFixed(2));
    };

    // // Calculate the maximum value for the stack
    // if (jumlahKecamatan !== 0) {
    //   const maxConditionValue = Math.max(jumlahKecamatan);
    //   const percent = data.map((item: number) =>
    //     calculatePercentage(item, maxConditionValue)
    //   );
    //   setPercentageData(percent);
    // } else if (jumlahKabupaten !== 0) {
    //   const maxConditionValue = Math.max(jumlahKabupaten);
    //   const percent = data.map((item: number) =>
    //     calculatePercentage(item, maxConditionValue)
    //   );
    //   setPercentageData(percent);
    // } else {
    //   const percent = data.map((item: any) =>
    //     calculatePercentage(item.count, item.max)
    //   );
    //   setPercentageData(percent);
    // }
    const percent = data.map((item: any) =>
      calculatePercentage(item.count, item.max)
    );
    setPercentageData(percent);
  }, [jumlah, jumlahKabupaten, jumlahKecamatan, data]);

  // Calculate the residual values
  const residualData = percentageData.map((value) => 100 - value);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Jumlah Input Profil",
        data: percentageData,
        originalData: data,
        backgroundColor: ["#77aaff"],
        hoverBackgroundColor: "white",
        hoverBorderColor: "navy",
        borderWidth: 1,
      },
      {
        label: "Sisa",
        data: residualData,
        backgroundColor: [
          "#cccccc",
          "#cccccc",
          "#cccccc",
          "#cccccc",
          "#cccccc",
          "#cccccc",
        ],
        hoverBackgroundColor: "lightgrey",
        hoverBorderColor: "grey",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const, // This sets the chart to display horizontally
    scales: {
      x: {
        stacked: true, // Ensure bars are stacked horizontally
        beginAtZero: true,
        max: 100, // Set the x-axis max value to the stack max
        ticks: {
          font: {
            size: 10, // Smaller font size for x-axis labels
          },
          // Ensure the tick value is treated as a number
          callback: (value: number | string) => `${value}%`, // Append % symbol to the x-axis labels
        },
      },
      y: {
        stacked: true, // Ensure bars are stacked vertically
        beginAtZero: true,
        ticks: {
          font: {
            size: 8, // Smaller font size for y-axis labels
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Show legend
        labels: {
          generateLabels: function (chart: any) {
            const originalLabels =
              ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            // Filter out the "Sisa" dataset
            return originalLabels.filter((label) => label.text !== "Sisa");
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.raw !== null) {
              const dataset = context.dataset.originalData[context.dataIndex];
              const count = parseFloat(dataset.count);
              const max = parseFloat(dataset.max);
              const percentage = ((count / max) * 100).toFixed(2);
              label += `${count} dari ${max} (${percentage}%)`;
            }
            return label;
          },
        },
        backgroundColor: "#f3f6f4",
        titleFont: {
          size: 12,
        },
        titleColor: "#0066ff",
        bodyColor: "#000",
        bodyFont: {
          size: 10,
        },
        displayColors: false,
        padding: 10,
        cornerRadius: 3,
      },
      // datalabels: {
      //   anchor: "center" as const,
      //   align: "center" as const,
      //   formatter: (value: number) => {
      //     return `${value}%`;
      //   },
      //   font: {
      //     size: 20,
      //   },
      //   color: "#000",
      // },
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
