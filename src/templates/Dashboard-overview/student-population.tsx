import { Select } from "antd";
import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function StudentPopulation() {
  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

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
    <div className="w-full xl:w-[60%] rounded-lg p-5 bg-white ">
      <div className="flex gap-5 mb-7 flex-wrap justify-between items-center">
        <h4 className="text-Text-high-emphasis text-lg font-semibold ">
          Student Population Statistics
        </h4>
        <Select
          defaultValue="1 Year"
          style={{
            width: 120,
            fontSize: 14,
            border: "1px solid",
            borderRadius: 5,
          }}
          onChange={handleChange}
          className="[&>*]:!text-sm"
          options={[
            { value: "1 Year", label: "1 Year" },
            { value: "10 Months", label: "10 Months" },
            { value: "8 Months", label: "8 Months" },
            { value: "4 Months", label: "4 Months" },
            { value: "2 Months", label: "2 Months" },
            { value: "1 Months", label: "1 Months" },
          ]}
        />
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
