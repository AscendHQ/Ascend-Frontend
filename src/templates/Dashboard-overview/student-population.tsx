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
    <div className="w-[60%] border-2 rounded-lg p-5 bg-white border-border-colour-light">
      <div className="flex flex-col xl:flex-row gap-5 mb-7 flex-wrap justify-between items-center">
        <h4>Student Population Statistics</h4>
        <ul className="flex">
          <li>
            <button className="border border-gray-400 text-Text-high-emphasis font-bold py-2 px-5 rounded-md">
              4 Years
            </button>
          </li>
          <li>
            <button className="border border-white py-2 text-Text-meduim-emphasis font-bold px-5 rounded-md">
              1 Year
            </button>
          </li>
          <li>
            <button className="border border-white py-2 text-Text-meduim-emphasis font-bold px-5 rounded-md">
              4 Months
            </button>
          </li>
        </ul>
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
