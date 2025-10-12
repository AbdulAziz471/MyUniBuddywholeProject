import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, GraduationCap, Clock, CheckCircle, AlertCircle, Users, FileText, Calendar } from "lucide-react";

const mockProjects = [
  {
    id: 1,
    title: "AI-Powered Student Management System",
    student: "Ahmad Hassan",
    supervisor: "Dr. Sarah Ahmed",
    status: "In Progress",
    progress: 75,
    department: "Computer Science",
    semester: "Fall 2024",
    startDate: "2024-09-01",
    deadline: "2024-12-15",
    lastUpdate: "2024-11-20",
    milestones: [
      { name: "Proposal", completed: true },
      { name: "Literature Review", completed: true },
      { name: "System Design", completed: true },
      { name: "Implementation", completed: false },
      { name: "Testing", completed: false },
      { name: "Documentation", completed: false }
    ]
  },
  {
    id: 2,
    title: "Blockchain-based Voting System",
    student: "Fatima Khan",
    supervisor: "Dr. Ali Raza",
    status: "Proposal Review",
    progress: 25,
    department: "Computer Science",
    semester: "Fall 2024",
    startDate: "2024-09-15",
    deadline: "2024-12-20",
    lastUpdate: "2024-11-18",
    milestones: [
      { name: "Proposal", completed: true },
      { name: "Literature Review", completed: false },
      { name: "System Design", completed: false },
      { name: "Implementation", completed: false },
      { name: "Testing", completed: false },
      { name: "Documentation", completed: false }
    ]
  },
  {
    id: 3,
    title: "IoT Smart Campus Monitoring",
    student: "Hassan Ali",
    supervisor: "Dr. Maria Khan",
    status: "Completed",
    progress: 100,
    department: "Electrical Engineering",
    semester: "Spring 2024",
    startDate: "2024-02-01",
    deadline: "2024-06-15",
    lastUpdate: "2024-06-10",
    milestones: [
      { name: "Proposal", completed: true },
      { name: "Literature Review", completed: true },
      { name: "System Design", completed: true },
      { name: "Implementation", completed: true },
      { name: "Testing", completed: true },
      { name: "Documentation", completed: true }
    ]
  }
];

export function FYPProjectsPage() {
  const [projects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Business Administration"];
  const statuses = ["Proposal Review", "In Progress", "Completed", "Overdue"];
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
    const matchesDepartment = selectedDepartment === "all" || project.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500/10 text-green-700 border-green-200";
      case "In Progress": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "Proposal Review": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "Overdue": return "bg-red-500/10 text-red-700 border-red-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="w-4 h-4" />;
      case "In Progress": return <Clock className="w-4 h-4" />;
      case "Proposal Review": return <FileText className="w-4 h-4" />;
      case "Overdue": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const totalProjects = projects.length;
  const inProgressProjects = projects.filter(p => p.status === "In Progress").length;
  const completedProjects = projects.filter(p => p.status === "Completed").length;
  const overdueProjects = projects.filter(p => p.status === "Overdue").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">FYP Projects Management</h1>
          <p className="text-muted-foreground">Monitor and manage Final Year Projects across all departments</p>
        </div>
        <Button className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressProjects}</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">Successfully finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueProjects}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Project Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All FYP Projects</CardTitle>
              <CardDescription>Comprehensive view of all Final Year Projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects by title, student, or supervisor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Details</TableHead>
                      <TableHead>Student & Supervisor</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-muted-foreground">{project.department}</div>
                            <div className="text-xs text-muted-foreground">{project.semester}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {project.student}
                            </div>
                            <div className="text-sm text-muted-foreground">Supervisor: {project.supervisor}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                            <div className="text-xs text-muted-foreground">
                              {project.milestones.filter(m => m.completed).length}/{project.milestones.length} milestones
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(project.status)}>
                            {getStatusIcon(project.status)}
                            <span className="ml-1">{project.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(project.deadline).toLocaleDateString()}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              Updated: {new Date(project.lastUpdate).toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>Track project deadlines and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Timeline view coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Analytics</CardTitle>
              <CardDescription>Performance metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Analytics dashboard coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}