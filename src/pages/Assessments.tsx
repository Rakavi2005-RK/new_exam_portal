
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Plus, Search } from "lucide-react";
import AssessmentGenerator from "@/components/assessments/AssessmentGenerator";
import QuestionGenerator from "@/components/assessments/QuestionGenerator";
import { toast } from "sonner";

interface AssessmentsProps {
  userRole?: 'admin' | 'faculty' | 'student';
}

const Assessments: React.FC<AssessmentsProps> = ({ userRole = 'faculty' }) => {
  const [activeTab, setActiveTab] = useState<string>("active");
  const [showGenerator, setShowGenerator] = useState(false);
  const [showQuestionGenerator, setShowQuestionGenerator] = useState(false);
  
  // Mock assessment data
  const assessments = [
    { id: 1, title: "Midterm Physics Assessment", subject: "Physics", dueDate: "2025-04-10", status: "active" },
    { id: 2, title: "Chemistry Practical Evaluation", subject: "Chemistry", dueDate: "2025-04-15", status: "active" },
    { id: 3, title: "Mathematics Problem Set #3", subject: "Mathematics", dueDate: "2025-04-20", status: "active" },
    { id: 4, title: "Literature Review Essay", subject: "English", dueDate: "2025-03-30", status: "completed" },
    { id: 5, title: "Biology Final Exam", subject: "Biology", dueDate: "2025-05-15", status: "draft" },
  ];

  const filteredAssessments = assessments.filter(assessment => assessment.status === activeTab);

  const handleNewAssessment = () => {
    if (userRole === 'admin') {
      toast.error("Admins cannot create assessments");
      return;
    }
    
    setShowGenerator(true);
  };
  
  const closeGenerator = () => {
    setShowGenerator(false);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {userRole === 'admin' 
              ? 'Assessment Progress Dashboard' 
              : 'Faculty Assessment Dashboard'}
          </h1>
          {userRole !== 'admin' && (
            <div className="flex gap-2">
              <Dialog open={showGenerator} onOpenChange={setShowGenerator}>
                <DialogTrigger asChild>
                  <Button className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" /> Create New Assessment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px]">
                  <DialogHeader>
                    <DialogTitle>Create New Assessment</DialogTitle>
                    <DialogDescription>
                      Use our AI-powered assessment generator to create a new assessment.
                    </DialogDescription>
                  </DialogHeader>
                  <AssessmentGenerator />
                </DialogContent>
              </Dialog>
              
              <Dialog open={showQuestionGenerator} onOpenChange={setShowQuestionGenerator}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" /> Generate Questions
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px]">
                  <DialogHeader>
                    <DialogTitle>AI Question Generator</DialogTitle>
                    <DialogDescription>
                      Generate questions from a syllabus using AI technology.
                    </DialogDescription>
                  </DialogHeader>
                  <QuestionGenerator />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>
                {userRole === 'admin' ? 'Assessment Analytics' : 'My Assessments'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search assessments..."
                    className="w-full pl-8"
                  />
                </div>
              </div>

              <Tabs defaultValue="active" onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
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
                          <TableCell>{assessment.dueDate}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                if (userRole === 'admin') {
                                  toast.info("Viewing analytics for " + assessment.title);
                                } else {
                                  toast.info("Viewing details for " + assessment.title);
                                }
                              }}
                            >
                              {userRole === 'admin' ? 'Analytics' : 'View'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
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
                          <TableCell>{assessment.dueDate}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                if (userRole === 'admin') {
                                  toast.info("Viewing results for " + assessment.title);
                                } else {
                                  toast.info("Viewing details for " + assessment.title);
                                }
                              }}
                            >
                              {userRole === 'admin' ? 'Results' : 'View'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="draft" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
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
                          <TableCell>{assessment.dueDate}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toast.info("Editing " + assessment.title)}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Assessments;
