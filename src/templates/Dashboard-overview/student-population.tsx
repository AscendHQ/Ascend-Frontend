import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function StudentPopulation() {
  const customColors = {
    "purple-600": "#6050CC",
    "purple-700": "#483C99",
    "purple-800": "#302866",
  };
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
      colors: [
        customColors["purple-800"],
        customColors["purple-700"],
        customColors["purple-600"],
      ],
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
    <div className="w-full xl:w-[60%] border-2 rounded-lg p-5 bg-white ">
      <div className="flex gap-5 mb-7 flex-wrap justify-between items-center">
        <h4>Student Population Statistics</h4>
        <select className="rounded-lg text-xs">
          <option value="4 Months">1 Year</option>
          <option value="4 Months">10 Months</option>
          <option value="4 Months">8 Months</option>
          <option value="4 Months">4 Months</option>
          <option value="4 Months">2 Months</option>
          <option value="1 Month">1 Month</option>
        </select>
      </div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options as ApexOptions}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
}
