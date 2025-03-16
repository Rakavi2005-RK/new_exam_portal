
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivityList from '@/components/dashboard/ActivityList';
import ProgressChart from '@/components/dashboard/ProgressChart';

const Dashboard: React.FC = () => {
  // This would typically come from a user context or API
  // For now, we'll set a state to toggle between roles for testing
  const [userRole, setUserRole] = useState<'admin' | 'faculty' | 'student'>('admin');
  
  // Mock user data based on role
  const userData = {
    admin: {
      name: 'Vishnu',
      role: 'admin' as const,
      email: 'vishnu@accesspro.edu',
    },
    faculty: {
      name: 'Professor Smith',
      role: 'faculty' as const,
      email: 'smith@accesspro.edu',
    },
    student: {
      name: 'Alex Johnson',
      role: 'student' as const,
      email: 'alex@student.edu',
    }
  };

  const currentUser = userData[userRole];

  // Role-specific greeting
  const getRoleSpecificGreeting = () => {
    switch(userRole) {
      case 'admin':
        return "Here's an overview of your institution's assessment activity";
      case 'faculty':
        return "Monitor your students' progress and assessment activities";
      case 'student':
        return "Track your assessment progress and upcoming deadlines";
      default:
        return "";
    }
  };

  // Role-specific activities
  const getActivitiesByRole = () => {
    // Mock data for ActivityList based on role
    const activities = {
      admin: [
        {
          id: '1',
          title: 'Assessment Created',
          time: '30 minutes ago',
          user: { name: 'John Doe', initials: 'JD' },
          status: 'completed' as const,
          type: 'assessment' as const,
          description: 'Created a new assessment for Mathematics - Calculus'
        },
        {
          id: '2',
          title: 'New Student Registered',
          time: '2 hours ago',
          user: { name: 'Jane Smith', initials: 'JS' },
          type: 'user' as const,
        },
        {
          id: '3',
          title: 'Assessment Completed',
          time: '1 day ago',
          user: { name: 'Alex Johnson', initials: 'AJ' },
          status: 'completed' as const,
          type: 'assessment' as const,
          description: 'Scored 85% on Physics - Mechanics'
        },
        {
          id: '4',
          title: 'Group Created',
          time: '2 days ago',
          user: { name: 'Sarah Williams', initials: 'SW' },
          type: 'system' as const,
          description: 'Created a new group "Computer Science 101"'
        },
        {
          id: '5',
          title: 'Assessment Assigned',
          time: '3 days ago',
          user: { name: 'Robert Brown', initials: 'RB' },
          status: 'pending' as const,
          type: 'assessment' as const,
          description: 'Assigned English Literature quiz to 30 students'
        }
      ],
      faculty: [
        {
          id: '1',
          title: 'Assessment Submitted',
          time: '1 hour ago',
          user: { name: 'Emily Davis', initials: 'ED' },
          status: 'completed' as const,
          type: 'assessment' as const,
          description: 'Scored 92% on Programming Fundamentals'
        },
        {
          id: '2',
          title: 'Assessment Created',
          time: '3 hours ago',
          user: { name: 'Professor Smith', initials: 'PS' },
          type: 'assessment' as const,
          description: 'Created Database Systems midterm'
        },
        {
          id: '3',
          title: 'Low Performance Alert',
          time: '1 day ago',
          user: { name: 'Kevin Wilson', initials: 'KW' },
          status: 'warning' as const,
          type: 'alert' as const,
          description: 'Student scored below 60% on three consecutive quizzes'
        },
        {
          id: '4',
          title: 'Class Average Updated',
          time: '2 days ago',
          user: { name: 'System', initials: 'SY' },
          type: 'system' as const,
          description: 'Web Development class average: 78%'
        }
      ],
      student: [
        {
          id: '1',
          title: 'Assessment Assigned',
          time: '2 hours ago',
          user: { name: 'Professor Wilson', initials: 'PW' },
          status: 'pending' as const,
          type: 'assessment' as const,
          description: 'Data Structures & Algorithms - Due in 3 days'
        },
        {
          id: '2',
          title: 'Assessment Completed',
          time: '1 day ago',
          user: { name: 'Alex Johnson', initials: 'AJ' },
          status: 'completed' as const,
          type: 'assessment' as const,
          description: 'Scored 85% on Computer Networks'
        },
        {
          id: '3',
          title: 'Practice Test Completed',
          time: '3 days ago',
          user: { name: 'Alex Johnson', initials: 'AJ' },
          status: 'completed' as const,
          type: 'assessment' as const,
          description: 'Scored 92% on Database Systems practice test'
        }
      ]
    };
    
    return activities[userRole];
  };

  // Role-specific chart data
  const getChartDataByRole = () => {
    const data = {
      admin: [
        { name: 'Jan', math: 65, science: 75, english: 60 },
        { name: 'Feb', math: 70, science: 80, english: 65 },
        { name: 'Mar', math: 75, science: 85, english: 70 },
        { name: 'Apr', math: 80, science: 90, english: 75 },
        { name: 'May', math: 85, science: 88, english: 80 },
        { name: 'Jun', math: 90, science: 85, english: 85 },
      ],
      faculty: [
        { name: 'Week 1', database: 72, webdev: 68, programming: 80 },
        { name: 'Week 2', database: 75, webdev: 70, programming: 82 },
        { name: 'Week 3', database: 78, webdev: 74, programming: 85 },
        { name: 'Week 4', database: 82, webdev: 76, programming: 87 },
        { name: 'Week 5', database: 80, webdev: 79, programming: 90 },
        { name: 'Week 6', database: 85, webdev: 82, programming: 92 },
      ],
      student: [
        { name: 'Quiz 1', score: 75, average: 70 },
        { name: 'Quiz 2', score: 82, average: 73 },
        { name: 'Midterm', score: 78, average: 75 },
        { name: 'Quiz 3', score: 85, average: 77 },
        { name: 'Quiz 4', score: 90, average: 80 },
        { name: 'Final', score: 88, average: 82 },
      ]
    };
    
    return data[userRole];
  };

  // Role-specific chart series
  const getChartSeriesByRole = () => {
    const series = {
      admin: [
        { name: 'Mathematics', dataKey: 'math', color: '#3b82f6' },
        { name: 'Science', dataKey: 'science', color: '#10b981' },
        { name: 'English', dataKey: 'english', color: '#f59e0b' },
      ],
      faculty: [
        { name: 'Database Systems', dataKey: 'database', color: '#3b82f6' },
        { name: 'Web Development', dataKey: 'webdev', color: '#10b981' },
        { name: 'Programming', dataKey: 'programming', color: '#f59e0b' },
      ],
      student: [
        { name: 'Your Score', dataKey: 'score', color: '#3b82f6' },
        { name: 'Class Average', dataKey: 'average', color: '#10b981' },
      ]
    };
    
    return series[userRole];
  };

  // Role-specific tab content
  const getTabsByRole = () => {
    switch(userRole) {
      case 'admin':
        return (
          <>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
          </>
        );
      case 'faculty':
        return (
          <>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">My Students</TabsTrigger>
            <TabsTrigger value="assessments">My Assessments</TabsTrigger>
          </>
        );
      case 'student':
        return (
          <>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">My Assessments</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
          </>
        );
      default:
        return null;
    }
  };

  // For demo purposes - button to toggle roles
  const toggleRole = () => {
    if (userRole === 'admin') setUserRole('faculty');
    else if (userRole === 'faculty') setUserRole('student');
    else setUserRole('admin');
  };

  return (
    <MainLayout>
      <div className="container py-6 space-y-8 animate-fade-in">
        <DashboardHeader 
          title={`Welcome, ${currentUser.name}`}
          description={getRoleSpecificGreeting()}
        />
        
        {/* For demo purposes only - would be removed in production */}
        <div className="flex justify-end">
          <button 
            onClick={toggleRole} 
            className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md hover:bg-secondary/80"
          >
            Demo: Switch to {userRole === 'admin' ? 'Faculty' : userRole === 'faculty' ? 'Student' : 'Admin'} View
          </button>
        </div>
        
        <DashboardStats role={currentUser.role} />
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            {getTabsByRole()}
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {userRole === 'admin' ? 'Recent Activity' : 
                     userRole === 'faculty' ? 'Student Activity' : 
                     'My Recent Activity'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ActivityList 
                    activities={getActivitiesByRole()}
                    title={userRole === 'admin' ? 'Institution Activity' : 
                           userRole === 'faculty' ? 'Class Activity' : 
                           'Personal Activity'}
                    description={userRole === 'admin' ? 'Latest actions across your institution' :
                                 userRole === 'faculty' ? 'Recent activity from your students' :
                                 'Your recent assessment activity'}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>
                    {userRole === 'admin' ? 'Assessment Performance' : 
                     userRole === 'faculty' ? 'Class Performance' : 
                     'My Performance'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ProgressChart 
                    data={getChartDataByRole()}
                    series={getChartSeriesByRole()}
                    title={userRole === 'admin' ? 'Performance Trends' : 
                           userRole === 'faculty' ? 'Class Performance' : 
                           'Personal Performance'}
                    description={userRole === 'admin' ? 'Average scores across subjects' :
                                 userRole === 'faculty' ? 'Average scores by course' :
                                 'Your scores compared to class average'}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {userRole === 'admin' && (
            <>
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
            </>
          )}
          
          {userRole === 'faculty' && (
            <>
              <TabsContent value="students" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      View and manage students assigned to your classes. Track their progress and assessment results.
                    </p>
                    {/* This would typically contain a data table component with student information */}
                    <div className="mt-4 p-8 border rounded-md border-dashed text-center text-muted-foreground">
                      Student list and performance data will be displayed here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="assessments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Assessments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Manage assessments you've created for your classes. Create new assessments, edit existing ones, or review results.
                    </p>
                    {/* This would typically contain a data table component with assessments */}
                    <div className="mt-4 p-8 border rounded-md border-dashed text-center text-muted-foreground">
                      Your created assessments will be listed here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
          
          {userRole === 'student' && (
            <>
              <TabsContent value="assessments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Assessments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      View your pending and completed assessments. Take assessments, review your results, and track your progress.
                    </p>
                    {/* This would typically contain a data table component with assessments */}
                    <div className="mt-4 p-8 border rounded-md border-dashed text-center text-muted-foreground">
                      Your assigned assessments will be listed here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="progress" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Track your academic progress across all subjects and courses. View your performance over time and identify areas for improvement.
                    </p>
                    {/* This would typically contain progress charts and statistics */}
                    <div className="mt-4 p-8 border rounded-md border-dashed text-center text-muted-foreground">
                      Detailed progress reports and charts will be displayed here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
