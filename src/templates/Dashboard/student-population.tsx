import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function StudentPopulation() {
  const chartData = {
    series: [
      {
        name: "First Term",
        data: [2800, 2600, 2200, 2000],
      },
      {
        name: "Second Term",
        data: [2000, 1600, 2900, 2100],
      },
      {
        name: "Third Term",
        data: [2100, 2300, 2100, 1500],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 9,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["2019/2020", "2020/2021", "2021/2022", "2022/2023"],
      },
      yaxis: {
        title: {
          text: "Students",
        },
      },
      colors: ["#7864FF", "#483C99", "#C9C1FF"],

      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val: number) => val + " students",
        },
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options as ApexOptions}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
}
