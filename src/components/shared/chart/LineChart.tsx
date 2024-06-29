'use client';

import { useEffect, useRef } from 'react';

import { ColorType, Time, createChart } from 'lightweight-charts';

export type LineChartData = {
  time: Time;
  value: string | number;
};

type LineChartOption = {
  id: string;
  data: LineChartData[];
  lineColor?: string;
};

type LineChartProps = {
  timeVisible?: boolean;
  options: LineChartOption[];
};

const LineChart = (props: LineChartProps) => {
  const { timeVisible, options } = props;

  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef.current || '', {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#848E9C',
        fontSize: 12,
      },
      width: chartContainerRef.current?.clientWidth,
      height: chartContainerRef.current?.clientHeight,
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: true,
          style: 2,
        },
      },
      rightPriceScale: {
        visible: true,
        borderColor: '#E3E3E3',
      },
      localization: {
        priceFormatter: (v: string | number) => `${Math.round(Number(v) * 100) / 100}%`,
      },
      timeScale: {
        timeVisible,
        borderColor: '#E3E3E3',
      },
    });
    chart.timeScale().fitContent();

    options.map((option) => {
      chart
        .addAreaSeries({
          lineWidth: 1,
          priceLineVisible: false,
        })
        .setData(option.data);
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [options]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
};

export default LineChart;
