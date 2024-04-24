import React from "react";
import ReactApexChart from "react-apexcharts";

const customColors = {
  "purple-200": "#C9C1FF",
  "grey-500": "#C2C2C2",
  "purple-500": "#7864FF",
};
const heatmapChartOptions = {
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    heatmap: {
      radius: 0,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 2,
            color: customColors["purple-500"],
            name: "Attended",
          },
          {
            from: 3,
            to: 4,
            color: customColors["purple-200"],
            name: "Not Attended",
          },
          {
            from: 5,
            to: 7,
            color: customColors["grey-500"],
            name: "Impending",
          },
        ],
      },
    },
  },
};
const heatmapChartSeries = [
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

const StudentClassAttendanceChart = () => {
  return (
    <div id="heatmap-chart" className="max-w-[350px]">
      <ReactApexChart
        options={heatmapChartOptions}
        series={heatmapChartSeries}
        type="heatmap"
        height={250}
      />
    </div>
  );
};

export default StudentClassAttendanceChart;
