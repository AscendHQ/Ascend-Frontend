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
            to: 2,
            color: "#7864FF",
            name: "Attended",
          },
          {
            from: 3,
            to: 4,
            color: "#C7D2FE",
            name: "Not Attended",
          },
          {
            from: 5,
            to: 7,
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
        y: 6,
      },
      {
        x: "T",
        y: 6,
      },
      {
        x: "w",
        y: 6,
      },
      {
        x: "Th",
        y: 6,
      },
      {
        x: "Fr",
        y: 6,
      },
    ],
  },
  {
    name: "Week 3",
    data: [
      {
        x: "M",
        y: 2,
      },
      {
        x: "T",
        y: 2,
      },
      {
        x: "w",
        y: 2,
      },
      {
        x: "Th",
        y: 2,
      },
      {
        x: "Fr",
        y: 5,
      },
    ],
  },
  {
    name: "Week 2",
    data: [
      {
        x: "M",
        y: 2,
      },
      {
        x: "T",
        y: 2,
      },
      {
        x: "w",
        y: 2,
      },
      {
        x: "Th",
        y: 2,
      },
      {
        x: "Fr",
        y: 3,
      },
    ],
  },
  {
    name: "Week 1",
    data: [
      {
        x: "M",
        y: 2,
      },
      {
        x: "T",
        y: 2,
      },
      {
        x: "w",
        y: 2,
      },
      {
        x: "Th",
        y: 2,
      },
      {
        x: "Fr",
        y: 2,
      },
    ],
  },
];
export default ApexChart;
