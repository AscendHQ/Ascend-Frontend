import { ApexOptions } from "apexcharts";
import React, { ReactNode } from "react";
import ReactApexChart from "react-apexcharts";

export default function FinancialSummary(): ReactNode {
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
              show: true,
              // name: {
              //   // formatter: (val: number) => val + "gdh",
              //   formatter:(val:number)=>{
              //     return "djdj"
              //   }
              // },
              // value: {
              //   ...
              // }
            },
          },
        },
      },
      colors: ["#7864FF", "#483C99", "#C9C1FF"],
      labels: ["School Fees", "Social Media", "Referrals"],
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div id="chart" className="relative top-5">
      <ReactApexChart
        options={chartData.options as ApexOptions}
        series={chartData.series}
        type="donut"
      />
    </div>
  );
}
