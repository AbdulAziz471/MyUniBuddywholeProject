import { useState } from "react";
import { GraduationCap, Plus, Edit, Trash2, Search, BookOpen, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const mockStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@student.edu",
    studentId: "STU2024001",
    program: "Computer Science",
    year: "3rd Year",
    gpa: 3.8,
    status: "Active",
    enrolledCourses: 6,
    completedCourses: 18,
    fyp: "AI-Based Learning System",
    mentor: "Dr. Smith"
  },
  {
    id: 2,
    name: "Bob Chen",
    email: "bob.chen@student.edu", 
    studentId: "STU2024002",
    program: "Software Engineering",
    year: "2nd Year",
    gpa: 3.6,
    status: "Active",
    enrolledCourses: 5,
    completedCourses: 12,
    fyp: null,
    mentor: null
  },
  {
    id: 3,
    name: "Carol Williams",
    email: "carol.williams@student.edu",
    studentId: "STU2024003", 
    program: "Data Science",
    year: "4th Year",
    gpa: 3.9,
    status: "Active",
    enrolledCourses: 4,
    completedCourses: 22,
    fyp: "Machine Learning for Healthcare",
    mentor: "Prof. Johnson"
  },
  {
    id: 4,
    name: "David Brown",
    email: "david.brown@student.edu",
    studentId: "STU2024004",
    program: "Information Technology", 
    year: "1st Year",
    gpa: 3.4,
    status: "Probation",
    enrolledCourses: 6,
    completedCourses: 6,
    fyp: null,
    mentor: null
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva.martinez@student.edu",
    studentId: "STU2024005",
    program: "Computer Science",
    year: "3rd Year", 
    gpa: 3.7,
    status: "Active",
    enrolledCourses: 5,
    completedCourses: 16,
    fyp: "Blockchain Application",
    mentor: "Dr. Wilson"
  }
];

const programs = ["Computer Science", "Software Engineering", "Data Science", "Information Technology"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export function StudentsManagePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === "all" || student.program === selectedProgram;
    return matchesSearch && matchesProgram;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Probation": return "bg-yellow-100 text-yellow-800";
      case "Suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-600";
    if (gpa >= 3.0) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Student Management</h1>
          <p className="text-muted-foreground">Manage student records, enrollment, and academic progress</p>
        </div>
        <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentName">Full Name</Label>
                  <Input id="studentName" placeholder="Enter student name" />
                </div>
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input id="studentId" placeholder="e.g., STU2024006" />
                </div>
              </div>
              <div>
                <Label htmlFor="studentEmail">Email</Label>
                <Input id="studentEmail" type="email" placeholder="Enter email address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="program">Program</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program} value={program}>
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddStudentOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddStudentOpen(false)}>
                  Add Student
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudents.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStudents.filter(s => s.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Good academic standing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.68</div>
            <p className="text-xs text-muted-foreground">+0.15 from last term</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FYP Projects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStudents.filter(s => s.fyp).length}
            </div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Programs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {programs.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Students Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Program & Year</TableHead>
                <TableHead>Academic Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>FYP</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder-avatar-${student.id}.jpg`} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.studentId}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.program}</p>
                      <p className="text-sm text-muted-foreground">{student.year}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">GPA: </span>
                        <span className={`font-medium ${getGPAColor(student.gpa)}`}>
                          {student.gpa}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{student.completedCourses} completed</span>
                        <span>•</span>
                        <span>{student.enrolledCourses} current</span>
                      </div>
                      <Progress 
                        value={(student.completedCourses / (student.completedCourses + student.enrolledCourses)) * 100} 
                        className="h-1"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {student.fyp ? (
                      <div>
                        <p className="text-sm font-medium">{student.fyp}</p>
                        <p className="text-xs text-muted-foreground">Mentor: {student.mentor}</p>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}