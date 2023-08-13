import { ApexOptions } from "apexcharts";
import React, { ReactNode } from "react";
import ReactApexChart from "react-apexcharts";

export default function FinancialSummary(): ReactNode {
  const customColors = {
    "purple-600": "#6050CC",
    "purple-700": "#483C99",
    "purple-800": "#302866",
  };
  const chartData = {
    series: [94, 35, 21],
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
              show: false,
              name: {
                // formatter: (val: number) => val + "gdh",
                // formatter: (val: number) => {
                //   return val;
                // },
              },
              // value: {
              //   ...
              // }
            },
          },
        },
      },
      colors: [
        customColors["purple-800"],
        customColors["purple-700"],
        customColors["purple-600"],
      ],
      labels: ["School Fees", "Social Media", "Referrals"],
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="flex-1 border-2 rounded-lg p-5 grid  bg-white border-border-colour-light">
      <h4>Financial Sum</h4>
      <div id="chart" className="relative top-5 max-w-[600px] mx-auto">
        <ReactApexChart
          options={chartData.options as ApexOptions}
          series={chartData.series}
          type="donut"
        />
      </div>
    </div>
  );
}
