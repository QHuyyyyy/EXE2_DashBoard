"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

type PropsType = {
  data: {
    sales: { x: string; y: number }[];
  };
  onBarClick?: (rawValue: string) => void;
};

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function WeeksProfitChart({ data, onBarClick }: PropsType) {
  const options: ApexOptions & { _onBarClick?: (v: string) => void } = {
    // Use gold color for main series
    colors: ["#5750F1"],
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
      events: {
        dataPointSelection: function (event, chartContext, config) {
          try {
            const idx = config.dataPointIndex;
            const seriesIndex = config.seriesIndex;
            const series = chartContext?.w?.config?.series ?? [];
            const seriesData = series?.[seriesIndex]?.data ?? [];
            const item = seriesData?.[idx];
            const raw = item && typeof item === "object" && item.raw ? item.raw : item && typeof item === "object" && item.x ? item.x : String(item);
            // call handler if present on the chart instance
            const handler = (chartContext?.w?.config as any)?._onBarClick as ((v: string) => void) | undefined;
            if (handler) handler(raw);
          } catch (e) {
            // ignore
          }
        },
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },

    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "inherit",
      fontWeight: 500,
      fontSize: "14px",
      markers: {
        size: 9,
        shape: "circle",
      },
    },
    fill: {
      opacity: 1,
    },
  };
  // store handler on options so chart events can access it via chartContext.w.config
  (options as any)._onBarClick = onBarClick;
  return (
    <div className="-ml-3.5 mt-3">
      <Chart
        options={options}
        series={[{ name: "Reviews", data: data.sales }]}
        type="bar"
        height={370}
      />
    </div>
  );
}
