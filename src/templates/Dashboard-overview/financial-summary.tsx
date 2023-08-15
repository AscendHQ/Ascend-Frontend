import { ApexOptions } from "apexcharts";
import React, { ReactNode } from "react";
import ReactApexChart from "react-apexcharts";

export default function FinancialSummary(): ReactNode {
  const customColors = {
    "purple-300": "#AEA2FF",
    "purple-400": "#9383FF",
    "purple-500": "#7864FF",
    "purple-600": "#6050CC",
    "purple-700": "#483C99",
    "purple-800": "#302866",
  };
  const chartData = {
    series: [50, 15, 10, 20, 15],
    options: {
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            labels: {
              // show: true,
              name: {
                // formatter: (val: number) => val + "gdh",
              },
              // value: {},
            },
          },
        },
      },
      colors: [
        customColors["purple-800"],
        customColors["purple-700"],
        customColors["purple-600"],
        customColors["purple-500"],
        customColors["purple-400"],
        customColors["purple-300"],
      ],
      labels: [
        "School Fees",
        "Social Media",
        "Rentals",
        "Summer Programs",
        "E-Learning",
      ],
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="flex-1 border rounded-lg p-5 grid  bg-white border-border-colour-light">
      <div>
        <h4 className="text-Text-high-emphasis text-lg font-semibold ">
          Financial Sum
        </h4>
        <p className="text-sm text-gray-800">
          Percentage indicator of school's financial activity
        </p>
      </div>
      <div id="chart" className="relative top-5 max-w-[650px] mx-auto">
        <ReactApexChart
          options={chartData.options as ApexOptions}
          series={chartData.series}
          type="donut"
        />
      </div>
    </div>
  );
}
