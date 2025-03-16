
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
                  <ActivityList limit={5} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ProgressChart />
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
