
import React from 'react';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Users, Book, Award } from 'lucide-react';
import ProgressChart, { DualChart } from '@/components/dashboard/ProgressChart';
import MainLayout from '@/components/layout/MainLayout';
import ActivityList from '@/components/dashboard/ActivityList';

// Sample data for charts
const performanceData = [
  { name: 'Jan', highest: 85, average: 75, lowest: 65 },
  { name: 'Feb', highest: 88, average: 78, lowest: 67 },
  { name: 'Mar', highest: 90, average: 80, lowest: 70 },
  { name: 'Apr', highest: 92, average: 82, lowest: 72 },
  { name: 'May', highest: 94, average: 84, lowest: 74 },
  { name: 'Jun', highest: 96, average: 86, lowest: 76 },
];

const subjectPerformanceData = [
  { name: 'Jan', math: 75, science: 68, english: 82 },
  { name: 'Feb', math: 78, science: 72, english: 80 },
  { name: 'Mar', math: 82, science: 75, english: 85 },
  { name: 'Apr', math: 79, science: 80, english: 83 },
  { name: 'May', math: 85, science: 82, english: 88 },
  { name: 'Jun', math: 88, science: 84, english: 90 },
];

const completionData = [
  { name: 'Jan', assigned: 15, completed: 12 },
  { name: 'Feb', assigned: 18, completed: 15 },
  { name: 'Mar', assigned: 20, completed: 18 },
  { name: 'Apr', assigned: 22, completed: 20 },
  { name: 'May', assigned: 25, completed: 22 },
  { name: 'Jun', assigned: 28, completed: 25 },
];

const recentActivities = [
  {
    id: '1',
    title: 'Math Assessment Completed',
    time: '2 hours ago',
    user: { name: 'John Doe', avatar: undefined, initials: 'JD' },
    status: 'completed' as const,
    type: 'assessment' as const,
    description: 'Scored 92% on Advanced Algebra assessment',
  },
  {
    id: '2',
    title: 'Science Quiz Assigned',
    time: '4 hours ago',
    user: { name: 'Jane Smith', avatar: undefined, initials: 'JS' },
    status: 'pending' as const,
    type: 'assessment' as const,
    description: 'Physics Concepts Quiz due in 3 days',
  },
  {
    id: '3',
    title: 'Low Engagement Warning',
    time: '1 day ago',
    user: { name: 'System', avatar: undefined, initials: 'SY' },
    status: 'warning' as const,
    type: 'alert' as const,
    description: '5 students have not logged in for over a week',
  },
];

const Analytics = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of assessment performance and student engagement metrics.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">248</div>
                <Book className="h-8 w-8 text-muted-foreground/70" />
              </div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">1,342</div>
                <Users className="h-8 w-8 text-muted-foreground/70" />
              </div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">78%</div>
                <Award className="h-8 w-8 text-muted-foreground/70" />
              </div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Student performance metrics over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
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
                    dataKey="name" 
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

          <DualChart
            className="col-span-2 lg:col-span-1"
            performanceData={subjectPerformanceData}
            completionData={completionData}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ActivityList 
            activities={recentActivities}
            title="Recent Activities"
            description="Latest assessment activities and alerts"
            className="col-span-2 md:col-span-1" 
          />

          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Completion Rates</CardTitle>
              <CardDescription>Assessment completion statistics</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
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
                    dataKey="name" 
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
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
