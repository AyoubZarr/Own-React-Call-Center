import React from "react";
import { Radar } from "react-chartjs-2";

const RadarChart = () => {
  const data = {
    labels: ["TroubleShooting", "Support", "Documentation", "Other", "Mission"],
    datasets: [
      {
        label: "# of Votes",
        data: [4, 9, 3, 5, 2],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Radar data={data} />
    </div>
  );
};

export default RadarChart;
