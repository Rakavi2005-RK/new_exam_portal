
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle, AlertCircle, ChevronRight, PlusCircle, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const StudentAssessment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const navigate = useNavigate();
  
  // Mock assessment data for a student
  const assessments = [
    { 
      id: 1, 
      title: "Midterm Physics Assessment", 
      subject: "Physics", 
      dueDate: "2025-04-15", 
      status: "pending",
      totalQuestions: 20,
      timeLimit: 60, // minutes
      created_at: "2024-10-22" 
    },
    { 
      id: 2, 
      title: "Chemistry Practical Evaluation", 
      subject: "Chemistry", 
      dueDate: "2025-04-20", 
      status: "pending",
      totalQuestions: 15,
      timeLimit: 45,
      created_at: "2024-09-10"
    },
    { 
      id: 3, 
      title: "Literature Review Essay", 
      subject: "English", 
      dueDate: "2025-03-30", 
      status: "completed",
      totalQuestions: 5,
      timeLimit: 120,
      created_at: "2024-11-22",
      score: 85 
    },
    { 
      id: 4, 
      title: "Mathematics Problem Set #2", 
      subject: "Mathematics", 
      dueDate: "2025-03-25", 
      status: "completed",
      totalQuestions: 10,
      timeLimit: 90,
      created_at: "2024-12-02",
      score: 92 
    },
  ];

  const filteredAssessments = assessments.filter(assessment => assessment.status === activeTab);

  const handleStartAssessment = (id: number) => {
    toast.info("Starting assessment...");
  };

  const handleTakeSelfAssessment = () => {
    navigate("/assessments");
    toast.success("Create a new self assessment");
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Student Assessment Dashboard</h1>
          <Button 
            onClick={handleTakeSelfAssessment}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Take Self Assessment
          </Button>
        </div>

        <div className="grid gap-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>My Assessments</CardTitle>
              <CardDescription>
                View and complete your assigned assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending" onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                  {filteredAssessments.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      No pending assessments found.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Created at</TableHead>
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
                            <TableCell>{assessment.created_at}</TableCell>
                            <TableCell>{assessment.dueDate}</TableCell>
                            <TableCell>{renderStatusBadge(assessment.status)}</TableCell>
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

                <TabsContent value="completed" className="space-y-4">
                  {filteredAssessments.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      No completed assessments found.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Created at</TableHead>
                          <TableHead>Score</TableHead>
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
                            <TableCell>{assessment.created_at}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span>{assessment.score}%</span>
                                </div>
                                <Progress value={assessment.score} className="h-2" />
                              </div>
                            </TableCell>
                            <TableCell>{renderStatusBadge(assessment.status)}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toast.info("This would show assessment results")}
                              >
                                View Results
                              </Button>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Assessments
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {assessments.filter(a => a.status === "pending").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Assessments waiting to be completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Assessments
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {assessments.filter(a => a.status === "completed").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successfully completed assessments
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Score
                </CardTitle>
                <FileText className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    assessments
                      .filter(a => a.status === "completed" && a.score)
                      .reduce((acc, curr) => acc + (curr.score || 0), 0) / 
                    assessments.filter(a => a.status === "completed" && a.score).length
                  )}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Your overall performance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentAssessment;
