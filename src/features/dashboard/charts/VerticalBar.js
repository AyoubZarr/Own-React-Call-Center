import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const VerticalBar = (props) => {
  const channelsColors = {
    1: "rgba(255, 99, 132, 0.5)",
    2: "rgba(132, 99, 255, 0.5)",
    3: "rgba(99, 132, 255, 0.5)",
    4: "rgba(255, 132, 99, 0.5)",
    5: "rgba(99, 255, 132, 0.5)",
    6: "rgba(132, 255, 99, 0.5)",
  };

  return (
    <div>
      {props.datas.length > 0 ? (
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: props.title,
                font: {
                  family: "Helvetica",
                },
              },
            },
          }}
          data={{
            labels: ["Channels"], //props.datas.map((d) => d.code), //["USSD", "WEB", "MobileApp"],
            datasets: props.datas.map((d) => {
              return {
                label: d.code,
                data: [d.nb], //[65, 59, 80],
                backgroundColor: channelsColors[d.channel],
              };
            }),
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default VerticalBar;
