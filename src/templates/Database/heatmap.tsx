import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  return (
    <div id="chart" className="max-w-[350px] pointer-events-none">
      <ReactApexChart
        options={options}
        series={seriesData}
        type="heatmap"
        height={250}
      />
    </div>
  );
};
const options = {
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    heatmap: {
      radius: 16,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 42,
            color: "#7864FF",
            name: "Attended",
          },
          {
            from: 42,
            to: 50,
            color: "#C7D2FE",
            name: "Not Attended",
          },
          {
            from: 50,
            to: 200,
            color: "#808080",
            name: "Impending",
          },
        ],
      },
    },
  },
};
const seriesData = [
  {
    name: "Week 4",
    data: [
      {
        x: "M",
        y: 100,
      },
      {
        x: "T",
        y: 100,
      },
      {
        x: "w",
        y: 100,
      },
      {
        x: "Th",
        y: 100,
      },
      {
        x: "Fr",
        y: 100,
      },
    ],
  },
  {
    name: "Week 3",
    data: [
      {
        x: "M",
        y: 43,
      },
      {
        x: "T",
        y: 43,
      },
      {
        x: "w",
        y: 43,
      },
      {
        x: "Th",
        y: 43,
      },
      {
        x: "Fr",
        y: 120,
      },
    ],
  },
  {
    name: "Week 2",
    data: [
      {
        x: "M",
        y: 43,
      },
      {
        x: "T",
        y: 43,
      },
      {
        x: "w",
        y: 43,
      },
      {
        x: "Th",
        y: 43,
      },
      {
        x: "Fr",
        y: 12,
      },
    ],
  },
  {
    name: "Week 1",
    data: [
      {
        x: "M",
        y: 22,
      },
      {
        x: "T",
        y: 29,
      },
      {
        x: "w",
        y: 13,
      },
      {
        x: "Th",
        y: 32,
      },
      {
        x: "Fr",
        y: 12,
      },
    ],
  },
];
export default ApexChart;
