"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "1",
    uv: 4000,
    pv: 2400,
  },
  {
    month: "2",
    uv: 3000,
    pv: 1398,
  },
  {
    month: "3",
    uv: 2000,
    pv: 9800,
  },
  {
    month: "4",
    uv: 2780,
    pv: 3908,
  },
  {
    month: "5",
    uv: 1890,
    pv: 4800,
  },
  {
    month: "6",
    uv: 2390,
    pv: 3800,
  },
  {
    month: "7",
    uv: 3490,
    pv: 4300,
  },
  {
    month: "8",
    uv: 3690,
    pv: 1300,
  },
  {
    month: "9",
    uv: 2490,
    pv: 8900,
  },
  {
    month: "10",
    uv: 8790,
    pv: 9300,
  },
  {
    month: "11",
    uv: 5490,
    pv: 6300,
  },
  {
    month: "12",
    uv: 6220,
    pv: 7200,
  },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          vertical={false}
          stroke="#484849"
          strokeDasharray="6 4"
          horizontalCoordinatesGenerator={() => [20, 70, 120, 170, 220]}
        />
        <XAxis
          dataKey="month"
          strokeWidth={0.5}
          tickLine={false}
          style={{ fontSize: 14 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          style={{ fontSize: 14 }}
          tickFormatter={(tick) => {
            return tick.toLocaleString();
          }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          strokeWidth={2}
          stroke="#30C9C9"
          fill="#30C9C9"
          fillOpacity={0.06}
        />
        <Area
          type="monotone"
          dataKey="pv"
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
