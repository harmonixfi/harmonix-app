'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

import WidgetCard from './WidgetCard';

type PieChartWidgetProps = {
  loading?: boolean;
  title: string;
  data: { name: string; value: number }[];
};
const COLORS = ['#0E8484', '#A3C7D6', '#F6995C', '#E95793', '#402E7A', '#FF204E', '#35374B'];

const RADIAN = Math.PI / 180;

type PieLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-sm font-light"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderLegendText = (value: string, entry: any) => {
  const { color } = entry;

  return (
    <span className="text-xs lg:text-sm pl-1 pr-4" style={{ color }}>
      {value}
    </span>
  );
};

const PieChartWidget = (props: PieChartWidgetProps) => {
  const { loading, title, data } = props;

  return (
    <WidgetCard loading={loading} name={title}>
      <div className="w-full h-64 sm:h-52">
        <ResponsiveContainer width="100%" height="100%" className="flex justify-start pb-4">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              fill="#8884d8"
              cx="50%"
              outerRadius="100%"
              legendType="circle"
              stroke="none"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              align="right"
              verticalAlign="top"
              layout="vertical"
              iconSize={12}
              formatter={renderLegendText}
              wrapperStyle={{ maxWidth: '50%', paddingLeft: 8, top: -10 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
};

export default PieChartWidget;
