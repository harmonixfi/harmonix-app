"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];
const initialData2 = [
  { time: "2018-12-22", value: 42.51 },
  { time: "2018-12-23", value: 41.11 },
  { time: "2018-12-24", value: 47.02 },
  { time: "2018-12-25", value: 47.32 },
  { time: "2018-12-26", value: 45.17 },
  { time: "2018-12-27", value: 48.89 },
  { time: "2018-12-28", value: 45.46 },
  { time: "2018-12-29", value: 43.92 },
  { time: "2018-12-30", value: 42.68 },
  { time: "2018-12-31", value: 42.67 },
];

const NewChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef.current || "", {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#848E9C",
        fontSize: 10,
      },
      width: chartContainerRef.current?.clientWidth,
      height: chartContainerRef.current?.clientHeight,
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart
      .addLineSeries({
        lineWidth: 1,
        color: "#0057FF",
        priceLineVisible: false,
        lastValueVisible: false,
      })
      .setData(initialData);

    const newSeries2 = chart
      .addLineSeries({
        lineWidth: 1,
        color: "#9EB50E",
        priceLineVisible: false,
        lastValueVisible: false,
      })
      .setData(initialData2);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button type="button" className="rounded-full px-3 text-rock-gray">
            Week
          </button>
          <button
            type="button"
            className="bg-rock-button rounded-full px-6 py-2"
          >
            Month
          </button>
          <button type="button" className="rounded-full px-3 text-rock-gray">
            Year
          </button>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <span className="w-5 h-[1px] bg-[#9EB50E]" />
            <p className="text-rock-gray">Market</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-[1px] bg-[#0057FF]" />
            <p className="text-rock-gray">Onyx Vault *</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6 pl-4">
        <p className="text-3xl">$1.030</p>
        <span className="px-2 py-0.5 border border-rock-green border-opacity-40 rounded-md text-rock-green font-semibold">
          +14%
        </span>
      </div>
      <div ref={chartContainerRef} className="h-full" />
    </div>
  );
};

export default NewChart;
