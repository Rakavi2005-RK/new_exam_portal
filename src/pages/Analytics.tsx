
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { DualChart } from '@/components/dashboard/ProgressChart';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [subject, setSubject] = useState('all');
  
  // Mock data for performance analytics
  const performanceData = [
    { month: 'Jan', average: 78, highest: 95, lowest: 65 },
    { month: 'Feb', average: 82, highest: 98, lowest: 68 },
    { month: 'Mar', average: 79, highest: 96, lowest: 63 },
    { month: 'Apr', average: 85, highest: 99, lowest: 72 },
    { month: 'May', average: 83, highest: 97, lowest: 70 },
    { month: 'Jun', average: 87, highest: 100, lowest: 75 },
  ];
  
  // Mock data for subject performance
  const subjectPerformance = [
    { subject: 'Mathematics', score: 82 },
    { subject: 'Science', score: 78 },
    { subject: 'English', score: 85 },
    { subject: 'History', score: 76 },
    { subject: 'Computer Science', score: 90 },
  ];
  
  // Mock data for assessment completion
  const completionData = [
    { month: 'Jan', assigned: 25, completed: 22 },
    { month: 'Feb', assigned: 30, completed: 27 },
    { month: 'Mar', assigned: 28, completed: 25 },
    { month: 'Apr', assigned: 32, completed: 30 },
    { month: 'May', assigned: 35, completed: 32 },
    { month: 'Jun', assigned: 38, completed: 36 },
  ];
  
  // Mock data for pie chart
  const distributionData = [
    { name: 'Excellent (90-100%)', value: 30, color: '#10b981' },
    { name: 'Good (80-89%)', value: 40, color: '#3b82f6' },
    { name: 'Average (70-79%)', value: 15, color: '#f59e0b' },
    { name: 'Below Average (60-69%)', value: 10, color: '#ef4444' },
    { name: 'Poor (Below 60%)', value: 5, color: '#6b7280' },
  ];

  return (
    <MainLayout>
      <div className="container py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Detailed insights into assessment performance and progress</p>
          </div>
          
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="quarter">Past Quarter</SelectItem>
                <SelectItem value="year">Past Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="completion">Completion</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <DualChart 
                performanceData={performanceData.map(d => ({
                  name: d.month,
                  math: d.average,
                  science: d.highest,
                  english: d.lowest
                }))}
                completionData={completionData}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Average scores by subject</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectPerformance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        type="number" 
                        domain={[0, 100]}
                        tick={{ fontSize: 12 }} 
                        tickLine={false} 
                      />
                      <YAxis 
                        dataKey="subject" 
                        type="category"
                        width={100}
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <Tooltip />
                      <Bar 
                        dataKey="score" 
                        fill="#3b82f6" 
                        radius={[0, 4, 4, 0]}
                        label={{ position: 'right', formatter: (value) => `${value}%` }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Average, highest, and lowest scores over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false} 
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="highest"
                      name="Highest Score"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="average"
                      name="Average Score"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="lowest"
                      name="Lowest Score"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completion" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Completion Rate</CardTitle>
                <CardDescription>Assigned vs completed assessments</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={completionData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false} 
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>Percentage breakdown of assessment scores</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Analytics;
