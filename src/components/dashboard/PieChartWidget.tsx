'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

type PieChartWidgetProps = {
  title: string;
};
const COLORS = ['#0E8484', '#313C69'];

const data = [
  { name: 'Options wheel', value: 400 },
  { name: 'Delta neutral', value: 300 },
];

const PieChartWidget = (props: PieChartWidgetProps) => {
  const { title } = props;

  return (
    <div className="flex flex-col gap-6 bg-white bg-opacity-5 border border-rock-divider rounded-2xl px-6 py-2">
      <p className="text-rock-gray uppercase mt-4 ml-2">{title}</p>
      <ResponsiveContainer width="100%" height="100%" className="flex justify-start pb-8">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            fill="#8884d8"
            cx="20%"
            outerRadius="100%"
            legendType="circle"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend align="right" wrapperStyle={{ display: 'flex', flexDirection: 'column' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartWidget;
