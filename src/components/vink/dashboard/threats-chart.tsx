'use client';

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useMemo } from 'react';

const generateData = () => {
    const data = [];
    const now = new Date();
    for (let i = 24; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            threats: Math.floor(Math.random() * (i % 6 === 0 ? 30 : 5))
        });
    }
    return data;
};


export function ThreatsChart() {
    const data = useMemo(() => generateData(), []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
        <Tooltip
            contentStyle={{
                backgroundColor: 'hsl(var(--background) / 0.8)',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                backdropFilter: 'blur(4px)',
            }}
            cursor={{ fill: 'hsl(var(--accent))' }}
        />
        <Area type="monotone" dataKey="threats" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
