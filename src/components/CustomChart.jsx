import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { api } from "../services/api";

export function CustomChart({ series, labels }) {
  const chart = {
    series,
    options: {
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ["#FF0000"],
      labels,
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 160,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName, opts) {
          return (
            seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%"
          );
        },
        itemMargin: {
          vertical: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chart.options}
          series={chart.series}
          type="radialBar"
          height={390}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
