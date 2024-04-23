'use client';

import { useEffect, useRef } from 'react';

import { AreaData, ColorType, Time, createChart } from 'lightweight-charts';

import WidgetCard from './WidgetCard';

type AreaChartWidgetProps = {
  loading?: boolean;
  title: string;
  latestValue: string;
  data: { time: number; value: number }[];
};

const AreaChartWidget = (props: AreaChartWidgetProps) => {
  const { loading, title, latestValue, data } = props;

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
        .setData(data as AreaData<Time>[]);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    }
  }, [data]);

  return (
    <WidgetCard loading={loading}>
      <div className="flex items-baseline justify-between mt-4 px-4 md:px-6">
        <div>
          <p className="text-rock-gray uppercase text-xs md:text-base">{title}</p>
          <p className="text-rock-primary font-semibold text-xs md:text-base">{latestValue}</p>
        </div>
        {/* <ul className="flex items-center gap-4 text-xs md:text-sm">
          <li className="text-rock-gray">1W</li>
          <li>1M</li>
          <li className="text-rock-gray">3M</li>
          <li className="text-rock-gray">6M</li>
          <li className="text-rock-gray">1Y</li>
        </ul> */}
      </div>
      <div ref={chartContainerRef} className="w-full h-40 md:h-60" />
    </WidgetCard>
  );
};

export default AreaChartWidget;
