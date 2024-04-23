import React from "react";
import { Bar } from "react-chartjs-2";

const HorizentalBar = (props) => {
  return (
    <div>
      {props.datas.length > 0 ? (
        <Bar
          options={{
            indexAxis: "y",
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: props.title,
              },
            },
          }}
          data={{
            labels: ["Categories"], //props.datas.map((d) => d.code), //["USSD", "WEB", "MobileApp"],
            datasets: props.datas.map((d) => {
              return {
                label: d.category,
                data: [d.nb], //[65, 59, 80],
                backgroundColor:
                  d.category == "Low"
                    ? "rgba(132, 99, 255, 0.5)"
                    : d.category == "Medium"
                    ? "rgba(99, 255, 132, 0.5)"
                    : "rgba(255, 99, 132, 0.5)",
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

export default HorizentalBar;
