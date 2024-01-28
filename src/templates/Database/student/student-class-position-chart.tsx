import React from "react";
import ReactApexChart from "react-apexcharts";

const lineChartOptions = {
  chart: {
    height: 250,
    type: "line" as const,
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ["First Term", "Second Term", "Third Term"],
  },
  yaxis: {
    min: 0,
    max: 30,
  },
};

const lineChartSeries = [
  {
    name: "Position",
    data: [12, 7, 6],
  },
];

const StudentClassPositionChart = () => {
  return (
    <div>
      <div id="line-chart" className="max-w-[350px]">
        <ReactApexChart
          options={lineChartOptions}
          series={lineChartSeries}
          type="line"
          height={250}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default StudentClassPositionChart;
