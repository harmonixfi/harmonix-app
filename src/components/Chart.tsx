"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

export type ChartData = {
  date: string;
  cum_return: number;
  benchmark_ret: number;
}[];

type ChartProps = {
  data: ChartData;
};

const CustomizedTooltip = ({ payload, label, active }: any) => {
  if (active) {
    return (
      <div className="flex flex-col gap-1 bg-primary px-4 py-3 rounded-lg">
        <p className="text-gray-400">
          {dayjs(new Date(payload[0].payload.date)).format("MMMM D, YYYY")}
        </p>
        <p>
          <span className="mr-1">Vault Performance:</span>
          <span>{`${Math.round(payload[0].value * 100) / 100}%`}</span>
        </p>
        <p>
          <span className="mr-1">Ethereum:</span>
          <span>{`${Math.round(payload[1].value * 100) / 100}%`}</span>
        </p>
      </div>
    );
  }

  return null;
};

const CustomizedLegend = () => {
  return (
    <div className="flex flex-col items-end justify-end gap-1">
      <div className="flex items-center gap-1">
        <span className="text-sm text-[#30C9C9]">Vault Performance</span>
        <span className="inline-block w-4 h-2 rounded-sm bg-[#30C9C9]" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm text-[#306FFF]">Ethereum</span>
        <span className="inline-block w-4 h-2 rounded-sm bg-[#306FFF]" />
      </div>
    </div>
  );
};

const Chart = (props: ChartProps) => {
  const { data } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid
          vertical={false}
          stroke="#484849"
          strokeDasharray="6 4"
        />
        <XAxis
          dataKey="date"
          strokeWidth={0.5}
          tickLine={false}
          style={{ fontSize: 14 }}
          tickFormatter={(tick) => {
            return dayjs(new Date(tick)).format("DD/MM");
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          style={{ fontSize: 14 }}
          tickFormatter={(tick) => {
            return `${Math.round(tick * 100) / 100}%`;
          }}
        />
        <Tooltip cursor={false} content={<CustomizedTooltip />} />
        <Legend
          align="right"
          verticalAlign="top"
          iconType="rect"
          content={<CustomizedLegend />}
          wrapperStyle={{
            top: -60,
          }}
        />
        <Area
          type="monotone"
          dataKey="cum_return"
          strokeWidth={2}
          stroke="#30C9C9"
          fill="#30C9C9"
          fillOpacity={0.06}
        />
        <Area
          type="monotone"
          dataKey="benchmark_ret"
          strokeWidth={2}
          stroke="#306FFF"
          fill="#306FFF"
          fillOpacity={0.06}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
