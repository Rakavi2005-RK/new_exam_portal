
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus, Search } from "lucide-react";

const Assessments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("active");
  
  // Mock assessment data
  const assessments = [
    { id: 1, title: "Midterm Physics Assessment", subject: "Physics", dueDate: "2025-04-10", status: "active" },
    { id: 2, title: "Chemistry Practical Evaluation", subject: "Chemistry", dueDate: "2025-04-15", status: "active" },
    { id: 3, title: "Mathematics Problem Set #3", subject: "Mathematics", dueDate: "2025-04-20", status: "active" },
    { id: 4, title: "Literature Review Essay", subject: "English", dueDate: "2025-03-30", status: "completed" },
    { id: 5, title: "Biology Final Exam", subject: "Biology", dueDate: "2025-05-15", status: "draft" },
  ];

  const filteredAssessments = assessments.filter(assessment => assessment.status === activeTab);

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Faculty Assessment Dashboard</h1>
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Create New Assessment
          </Button>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>My Assessments</CardTitle>
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
                            <Button variant="outline" size="sm">View</Button>
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
                            <Button variant="outline" size="sm">View</Button>
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
                            <Button variant="outline" size="sm">Edit</Button>
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
