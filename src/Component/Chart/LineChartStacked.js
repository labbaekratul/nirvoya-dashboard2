import React from "react";
import { Line } from "react-chartjs-2";

const config = {
  type: "line",
};

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [-65, 59, 80, -81, -56, 55, -40],
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: [-25, 30, -20, 15, 100, 40, -10],
      backgroundColor: "rgb(54, 162, 235)",
      borderColor: "rgba(54, 162, 235)",
    },
    {
      label: "Dataset 3",
      data: [-30, 20, -25, 15, 95, 45, -12],
      backgroundColor: "rgb(255, 159, 64)",
      borderColor: "rgb(255, 159, 64)",
    },
    {
      label: "Dataset 4",
      data: [30, 10, -30, 15, -95, 100, -50],
      backgroundColor: "rgb(255, 205, 86)",
      borderColor: "rgb(255, 205, 86)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: (ctx) =>
        "Chart.js Line Chart - stacked=" + ctx.chart.options.scales.y.stacked,
    },
    tooltip: {
      mode: "index",
    },
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};

const LineChartStacked = () => {
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartStacked;
