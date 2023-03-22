import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Data from "./Data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Your Activity",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

function Chart() {
  const { UserData } = Data();

  if (!UserData) {
    return <h3>Loadin...</h3>;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Posts",
        data: UserData.map((data) => data.postNumber),
        backgroundColor: "rgba(6, 103, 135, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default Chart;
