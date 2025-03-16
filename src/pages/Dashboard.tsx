
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivityList from '@/components/dashboard/ActivityList';
import ProgressChart from '@/components/dashboard/ProgressChart';

const Dashboard: React.FC = () => {
  // This would typically come from a user context or API
  const adminUser = {
    name: 'Vishnu',
    role: 'admin' as const,
    email: 'vishnu@accesspro.edu',
  };

  // Mock data for ActivityList
  const mockActivities = [
    {
      id: '1',
      title: 'Assessment Created',
      time: '30 minutes ago',
      user: {
        name: 'John Doe',
        initials: 'JD',
      },
      status: 'completed' as const,
      type: 'assessment' as const,
      description: 'Created a new assessment for Mathematics - Calculus'
    },
    {
      id: '2',
      title: 'New Student Registered',
      time: '2 hours ago',
      user: {
        name: 'Jane Smith',
        initials: 'JS',
      },
      type: 'user' as const,
    },
    {
      id: '3',
      title: 'Assessment Completed',
      time: '1 day ago',
      user: {
        name: 'Alex Johnson',
        initials: 'AJ',
      },
      status: 'completed' as const,
      type: 'assessment' as const,
      description: 'Scored 85% on Physics - Mechanics'
    },
    {
      id: '4',
      title: 'Group Created',
      time: '2 days ago',
      user: {
        name: 'Sarah Williams',
        initials: 'SW',
      },
      type: 'system' as const,
      description: 'Created a new group "Computer Science 101"'
    },
    {
      id: '5',
      title: 'Assessment Assigned',
      time: '3 days ago',
      user: {
        name: 'Robert Brown',
        initials: 'RB',
      },
      status: 'pending' as const,
      type: 'assessment' as const,
      description: 'Assigned English Literature quiz to 30 students'
    }
  ];

  // Mock data for ProgressChart
  const chartData = [
    { name: 'Jan', math: 65, science: 75, english: 60 },
    { name: 'Feb', math: 70, science: 80, english: 65 },
    { name: 'Mar', math: 75, science: 85, english: 70 },
    { name: 'Apr', math: 80, science: 90, english: 75 },
    { name: 'May', math: 85, science: 88, english: 80 },
    { name: 'Jun', math: 90, science: 85, english: 85 },
  ];

  const chartSeries = [
    { name: 'Mathematics', dataKey: 'math', color: '#3b82f6' },
    { name: 'Science', dataKey: 'science', color: '#10b981' },
    { name: 'English', dataKey: 'english', color: '#f59e0b' },
  ];

  return (
    <MainLayout>
      <div className="container py-6 space-y-8 animate-fade-in">
        <DashboardHeader 
          title={`Welcome, ${adminUser.name}`}
          description="Here's an overview of your institution's assessment activity"
        />
        
        <DashboardStats role={adminUser.role} />
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ActivityList 
                    activities={mockActivities}
                    title="Recent Activity"
                    description="Latest actions across your institution"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ProgressChart 
                    data={chartData}
                    series={chartSeries}
                    title="Performance Trends"
                    description="Average scores across subjects"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  View and manage all students in your institution. You can add, edit, or remove students, 
                  and organize them into groups for better assessment management.
                </p>
                {/* This would typically contain a data table component with student information */}
                <div className="mt-4 p-8 border rounded-md border-dashed text-center text-muted-foreground">
                  Student management interface will be available here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faculty" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage your institution's faculty members. You can assign roles, permissions, and classes to faculty members.
                </p>
                {/* This would typically contain a data table component with faculty information */}
                <div className="mt-4 p-8 border rounded-md border-dashed text-center text-muted-foreground">
                  Faculty management interface will be available here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
