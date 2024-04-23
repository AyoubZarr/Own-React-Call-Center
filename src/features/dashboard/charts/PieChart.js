import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
  const channelsColors = {
    1: "rgba(255, 99, 132, 0.5)",
    2: "rgba(255, 99, 132, 0.5)",
    3: "rgba(132, 99, 255, 0.5)",
    4: "rgba(99, 255, 132, 0.5)",
    5: "rgba(255, 99, 132, 0.5)",
    6: "rgba(255, 99, 132, 0.5)",
  };
  const channelsBorderColors = {
    1: "rgba(255, 99, 132, 1)",
    2: "rgba(255, 99, 132, 1)",
    3: "rgba(132, 99, 255, 1)",
    4: "rgba(99, 255, 132, 1)",
    5: "rgba(255, 99, 132, 1)",
    6: "rgba(255, 99, 132, 1)",
  };
  const data = {
    labels: ["On Going", "On Hold", "Finished", "Launched", "E2E Test"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 22, 88, 65, 31],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
