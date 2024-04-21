'use client';

import { useEffect, useRef } from 'react';

import { ColorType, createChart } from 'lightweight-charts';

import WidgetCard from './WidgetCard';

type AreaChartWidgetProps = {
  title: string;
};
const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
];

const AreaChartWidget = (props: AreaChartWidgetProps) => {
  const { title } = props;

  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
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
        timeScale: {
          timeVisible: true,
        },
      });
      chart.timeScale().fitContent();

      chart
        .addAreaSeries({
          lineWidth: 1,
          priceLineVisible: false,
          lastValueVisible: false,
        })
        .setData(initialData);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    }
  }, []);

  return (
    <WidgetCard>
      <div className="flex items-baseline justify-between mt-4 px-4 md:px-6">
        <div>
          <p className="text-rock-gray uppercase text-xs md:text-base">{title}</p>
          <p className="text-rock-primary font-semibold text-xs md:text-base">28.49%</p>
        </div>
        <ul className="flex items-center gap-4 text-xs md:text-sm">
          <li className="text-rock-gray">1W</li>
          <li>1M</li>
          <li className="text-rock-gray">3M</li>
          <li className="text-rock-gray">6M</li>
          <li className="text-rock-gray">1Y</li>
        </ul>
      </div>
      <div ref={chartContainerRef} className="w-full h-40 md:h-60" />
    </WidgetCard>
  );
};

export default AreaChartWidget;
