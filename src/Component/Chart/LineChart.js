import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [-65, 59, 80, -81, -56, 55, -40],
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.9)",
    },
    {
      label: "Dataset 2",
      data: [-25, 30, -20, 15, 100, 40, -10],
      backgroundColor: "rgb(54, 162, 235)",
      borderColor: "rgba(54, 162, 235, 0.9)",
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const LineChart = () => {
  return (
    <>
      <Line
        style={{ width: "auto", height: "400px" }}
        data={data}
        options={options}
      />
    </>
  );
};

export default LineChart;
