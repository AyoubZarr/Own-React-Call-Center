import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = (props) => {
  const statusColors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(132, 255, 99, 0.5)",
    "rgba(132, 99, 255, 0.5)",
    "rgba(99, 255, 132, 0.5)",
    "rgba(255, 132, 99, 0.5)",
  ];
  const statusBorderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(132, 255, 99, 1)",
    "rgba(132, 99, 255, 1)",
    "rgba(99, 255, 132, 1)",
    "rgba(255, 132, 99, 1)",
  ];
  const data = {
    labels: ["On Going", "On Hold", "Finished", "Launched", "E2E Test"],
    datasets: [
      {
        label: "Count",
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
      {props.datas.length > 0 ? (
        <Doughnut
          data={{
            labels: props.datas.map((d) => d.status), //["On Going", "On Hold", "Finished", "Launched", "E2E Test"],
            datasets: [
              {
                label: "Count",
                data: props.datas.map((d) => d.nb), //[(12, 22, 88, 65, 31)],
                backgroundColor: statusColors,
                borderColor: statusBorderColors,
                borderWidth: 1,
              },
            ],
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default DoughnutChart;
