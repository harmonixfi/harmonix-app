'use client';

import { useEffect, useRef } from 'react';

import { ColorType, createChart } from 'lightweight-charts';

export type LineChartData = {
  time: string;
  value: string | number;
};

type LineChartOption = {
  id: string;
  data: LineChartData[];
  lineColor?: string;
};

type LineChartProps = {
  options: LineChartOption[];
};

const LineChart = (props: LineChartProps) => {
  const { options } = props;

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
          visible: false,
        },
      },
      localization: {
        priceFormatter: (v: string | number) => `${Math.round(Number(v) * 100) / 100}%`,
      },
    });
    chart.timeScale().fitContent();

    options.map((option) => {
      chart
        .addLineSeries({
          lineWidth: 1,
          color: option.lineColor,
          priceLineVisible: false,
          // lastValueVisible: false,
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
