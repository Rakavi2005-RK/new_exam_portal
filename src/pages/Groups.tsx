
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, Users, UserPlus, Edit, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
  assessmentCount: number;
  type: 'class' | 'placement';
}

const Groups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [showAddStudents, setShowAddStudents] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newGroupType, setNewGroupType] = useState<'class' | 'placement'>('class');
  
  // Mock group data
  const mockGroups: Group[] = [
    { 
      id: "g1", 
      name: "Computer Science - Year 1", 
      description: "First year computer science students", 
      memberCount: 32, 
      createdAt: "2025-01-15", 
      assessmentCount: 4,
      type: 'class'
    },
    { 
      id: "g2", 
      name: "Computer Science - Year 2", 
      description: "Second year computer science students", 
      memberCount: 28, 
      createdAt: "2025-01-16", 
      assessmentCount: 5,
      type: 'class'
    },
    { 
      id: "g3", 
      name: "Electronics - Year 1", 
      description: "First year electronics students", 
      memberCount: 35, 
      createdAt: "2025-01-18", 
      assessmentCount: 3,
      type: 'class'
    },
    { 
      id: "g4", 
      name: "Placement Batch 2025", 
      description: "Students preparing for placements in 2025", 
      memberCount: 45, 
      createdAt: "2025-02-01", 
      assessmentCount: 6,
      type: 'placement'
    },
    { 
      id: "g5", 
      name: "Aptitude Training Group", 
      description: "Special group for aptitude training", 
      memberCount: 25, 
      createdAt: "2025-02-10", 
      assessmentCount: 2,
      type: 'placement'
    },
  ];
  
  // Mock student data
  const mockStudents: Student[] = [
    { id: "s1", name: "Alice Johnson", email: "alice@example.com", department: "Computer Science", year: "1" },
    { id: "s2", name: "Bob Smith", email: "bob@example.com", department: "Computer Science", year: "2" },
    { id: "s3", name: "Charlie Brown", email: "charlie@example.com", department: "Electronics", year: "1" },
    { id: "s4", name: "Diana Miller", email: "diana@example.com", department: "Computer Science", year: "3" },
    { id: "s5", name: "Edward Wilson", email: "edward@example.com", department: "Electronics", year: "2" },
    { id: "s6", name: "Fiona Garcia", email: "fiona@example.com", department: "Computer Science", year: "4" },
    { id: "s7", name: "George Martinez", email: "george@example.com", department: "Computer Science", year: "3" },
    { id: "s8", name: "Hannah Lee", email: "hannah@example.com", department: "Electronics", year: "1" },
  ];
  
  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || group.type === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  const handleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };
  
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast.error("Group name is required");
      return;
    }
    
    toast.success(`Group "${newGroupName}" created successfully`);
    setNewGroupName("");
    setNewGroupDescription("");
    setShowAddGroup(false);
  };
  
  const handleAddStudentsToGroup = () => {
    if (!selectedGroup) {
      toast.error("No group selected");
      return;
    }
    
    if (selectedStudents.length === 0) {
      toast.error("No students selected");
      return;
    }
    
    toast.success(`Added ${selectedStudents.length} students to ${selectedGroup.name}`);
    setSelectedStudents([]);
    setShowAddStudents(false);
  };
  
  const openAddStudentsSheet = (group: Group) => {
    setSelectedGroup(group);
    setSelectedStudents([]);
    setShowAddStudents(true);
  };
  
  const handleDeleteGroup = (group: Group) => {
    toast.success(`Group "${group.name}" deleted successfully`);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Group Management</h1>
          <Dialog open={showAddGroup} onOpenChange={setShowAddGroup}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="mr-2 h-4 w-4" /> Create New Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogDescription>
                  Create a new student group for assessments.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Group Name</label>
                  <Input 
                    placeholder="e.g., Computer Science - Year 3" 
                    value={newGroupName}
                    onChange={e => setNewGroupName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input 
                    placeholder="Brief description of the group" 
                    value={newGroupDescription}
                    onChange={e => setNewGroupDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Group Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="groupType" 
                        checked={newGroupType === 'class'} 
                        onChange={() => setNewGroupType('class')}
                        className="h-4 w-4 text-primary"
                      />
                      <span>Class Group</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="groupType" 
                        checked={newGroupType === 'placement'} 
                        onChange={() => setNewGroupType('placement')}
                        className="h-4 w-4 text-primary"
                      />
                      <span>Placement Group</span>
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateGroup}>Create Group</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>My Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search groups..."
                      className="w-full pl-8"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="all">All Groups</TabsTrigger>
                      <TabsTrigger value="class">Class Groups</TabsTrigger>
                      <TabsTrigger value="placement">Placement Groups</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Group Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Assessments</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGroups.map((group) => (
                      <TableRow key={group.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            {group.name}
                          </div>
                        </TableCell>
                        <TableCell>{group.description}</TableCell>
                        <TableCell>
                          <Badge variant={group.type === 'placement' ? 'secondary' : 'default'}>
                            {group.type === 'placement' ? 'Placement' : 'Class'}
                          </Badge>
                        </TableCell>
                        <TableCell>{group.memberCount}</TableCell>
                        <TableCell>
                          <Link 
                            to={`/assessments?group=${group.id}`} 
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            <FileText className="h-4 w-4" />
                            {group.assessmentCount}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => openAddStudentsSheet(group)}
                                >
                                  <UserPlus className="h-4 w-4" />
                                </Button>
                              </SheetTrigger>
                              <SheetContent side="right">
                                <SheetHeader>
                                  <SheetTitle>Add Students to {selectedGroup?.name}</SheetTitle>
                                  <SheetDescription>
                                    Select students to add to this group.
                                  </SheetDescription>
                                </SheetHeader>
                                <div className="py-6">
                                  <div className="relative mb-4">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                      type="search"
                                      placeholder="Search students..."
                                      className="w-full pl-8"
                                    />
                                  </div>
                                  <ScrollArea className="h-[400px] rounded-md border p-4">
                                    <div className="space-y-2">
                                      {mockStudents.map((student) => (
                                        <div 
                                          key={student.id}
                                          className="flex items-center space-x-2 rounded-md border p-2"
                                        >
                                          <input
                                            type="checkbox"
                                            id={`student-${student.id}`}
                                            checked={selectedStudents.includes(student.id)}
                                            onChange={() => handleStudentSelection(student.id)}
                                            className="h-4 w-4"
                                          />
                                          <label 
                                            htmlFor={`student-${student.id}`}
                                            className="flex-1 cursor-pointer"
                                          >
                                            <div className="font-medium">{student.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                              {student.email} • {student.department} (Year {student.year})
                                            </div>
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  </ScrollArea>
                                  
                                  <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">
                                      {selectedStudents.length} students selected
                                    </div>
                                    <Button 
                                      disabled={selectedStudents.length === 0} 
                                      onClick={handleAddStudentsToGroup}
                                    >
                                      Add Selected Students
                                    </Button>
                                  </div>
                                </div>
                              </SheetContent>
                            </Sheet>
                            
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteGroup(group)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Groups;
