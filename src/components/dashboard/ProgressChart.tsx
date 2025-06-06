
import React from 'react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChartData {
  name: string;
  [key: string]: string | number;
}

interface ProgressChartProps {
  className?: string;
  title?: string;
  description?: string;
  data: ChartData[];
  type?: 'line' | 'bar';
  series: Array<{
    name: string;
    dataKey: string;
    color: string;
  }>;
  showLegend?: boolean;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  className,
  title = "Performance Overview",
  description = "Assessment results over time",
  data,
  type = 'line',
  series,
  showLegend = true,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <div className="h-80 w-full px-4 pb-4">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'line' ? (
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }} 
                />
                {showLegend && <Legend />}
                {series.map((s) => (
                  <Line
                    key={s.dataKey}
                    type="monotone"
                    dataKey={s.dataKey}
                    name={s.name}
                    stroke={s.color}
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: s.color }}
                  />
                ))}
              </LineChart>
            ) : (
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }} 
                />
                {showLegend && <Legend />}
                {series.map((s) => (
                  <Bar
                    key={s.dataKey}
                    dataKey={s.dataKey}
                    name={s.name}
                    fill={s.color}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

interface DualChartProps {
  className?: string;
  performanceData: ChartData[];
  completionData: ChartData[];
}

export const DualChart: React.FC<DualChartProps> = ({
  className,
  performanceData,
  completionData
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>Assessment Analytics</CardTitle>
        <CardDescription>Track performance and completion rates</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4 mx-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="completion">Completion</TabsTrigger>
          </TabsList>
          <TabsContent value="performance" className="h-80 w-full px-4 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
                  domain={[0, 100]}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="math"
                  name="Mathematics"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
                />
                <Line
                  type="monotone"
                  dataKey="science"
                  name="Science"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
                />
                <Line
                  type="monotone"
                  dataKey="english"
                  name="English"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#f59e0b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="completion" className="h-80 w-full px-4 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="assigned"
                  name="Assigned"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
