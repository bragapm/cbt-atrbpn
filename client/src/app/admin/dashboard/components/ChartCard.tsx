import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5],
//       backgroundColor: ["#FFCE1E", "#5F3424", "#B33A2A", "#FF9543"],
//       borderWidth: 0,
//     },
//   ],
// };

const options = {
  responsive: false,
  tooltips: {
    callbacks: {
      label: (tooltipItem: any, data: any) => {
        let label = data.datasets[tooltipItem.datasetIndex].label || "";
        if (label) {
          label += ": ";
        }
        label += tooltipItem.yLabel;
        return label;
      },
    },
    backgroundColor: "#FFF",
    titleFontSize: 16,
    titleFontColor: "#0066ff",
    bodyFontColor: "#000",
    bodyFontSize: 14,
    displayColors: false,
    xPadding: 10,
    yPadding: 10,
    cornerRadius: 3,
  },
  plugins: {
    legend: {
      display: false,
      labels: {
        color: "#FFFFFF",
      },
    },
    datalabels: {
      display: false,
      color: "#000000", // Set the label color here
      font: {
        size: 10,
      },
    },
  },
  // maintainAspectRatio: false
};
interface DougnutState {
  datas: any;
  legend: any[];
  height?: number;
  centerContent?: any;
}

const ChartCard: FC<DougnutState> = ({
  datas,
  legend,
  height = 250,
  centerContent,
}) => {
  return (
    <div className="flex flex-col gap-6 items-center w-full h-full p-2">
      <div className="relative">
        <Doughnut
          data={datas}
          options={options}
          height={height}
          className="flex justify-center items-center text-white"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-1">
          <p className="text-xs">{centerContent?.label || "Jumlah Soal"}</p>
          <p className="text-2xl font-semibold">{centerContent?.value || 0}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {legend &&
          legend?.map((elm: any) => (
            <div
              className="flex items-center gap-2 justify-between"
              key={elm.label}
            >
              <div className={`${elm.color} rounded-full h-4 w-4`} />
              <p className="text-[9px]">{elm.label} </p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ChartCard;
