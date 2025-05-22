import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronRight } from "lucide-react";
// Update the import path to match your hook file location:
import { useBreakpoint } from "@/hooks/use-mobile";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const navigate = useNavigate();
  const { isMobile, isTablet } = useBreakpoint();

  const currentUser = {
    name: "Alex Johnson",
    role: "student",
    email: "alex@student.edu",
  };

  const assessments = [
    {
      id: 1,
      title: "Midterm Physics Assessment",
      subject: "Physics",
      dueDate: "2025-04-15",
      status: "pending",
      teacher: "Dr. Richard Feynman",
    },
    {
      id: 2,
      title: "Chemistry Practical Evaluation",
      subject: "Chemistry",
      dueDate: "2025-04-20",
      status: "pending",
      teacher: "Dr. Marie Curie",
    },
    {
      id: 3,
      title: "Literature Review Essay",
      subject: "English",
      dueDate: "2025-03-30",
      status: "completed",
      teacher: "Prof. Jane Austen",
      score: 85,
    },
    {
      id: 4,
      title: "Mathematics Problem Set #2",
      subject: "Mathematics",
      dueDate: "2025-03-25",
      status: "completed",
      teacher: "Dr. Alan Turing",
      score: 92,
    },
  ];

  const filteredAssessments = assessments.filter(
    (assessment) => assessment.status === activeTab
  );

  return (
    <MainLayout>
      <div className="py-6 space-y-8 animate-fade-in">
        <DashboardHeader
          title={`Welcome, ${currentUser.name}`}
          description="Track your assessment progress and upcoming deadlines"
        />

        <DashboardStats role={currentUser.role} />

        <Card>
          <CardHeader>
            <CardTitle>Your Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {isMobile || isTablet ? (
                  <div className="space-y-4">
                    {filteredAssessments.map((assessment) => (
                      <Card key={assessment.id} className="p-4">
                        <div className="mb-2 text-base font-semibold">
                          {assessment.title}
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          <strong>Subject:</strong> {assessment.subject}
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          <strong>Teacher:</strong> {assessment.teacher}
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          <strong>Due Date:</strong> {assessment.dueDate}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <strong>Status:</strong>{" "}
                          <Badge
                            variant="outline"
                            className={
                              assessment.status === "pending"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-green-50 text-green-700 border-green-200"
                            }
                          >
                            {assessment.status.charAt(0).toUpperCase() +
                              assessment.status.slice(1)}
                          </Badge>
                        </div>
                        <Button asChild size="sm">
                          <Link to={`/take-assessment/${assessment.id}`}>
                            Start <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Table className="text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAssessments.map((assessment) => (
                        <TableRow key={assessment.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-primary" />
                              {assessment.title}
                            </div>
                          </TableCell>
                          <TableCell>{assessment.subject}</TableCell>
                          <TableCell>{assessment.teacher}</TableCell>
                          <TableCell>{assessment.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                assessment.status === "pending"
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                              }
                            >
                              {assessment.status.charAt(0).toUpperCase() +
                                assessment.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Link to={`/take-assessment/${assessment.id}`}>
                              <Button variant="default" size="sm">
                                Start <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
