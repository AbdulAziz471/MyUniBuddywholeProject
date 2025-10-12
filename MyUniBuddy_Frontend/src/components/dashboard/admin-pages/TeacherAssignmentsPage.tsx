import { useState } from "react";
import { Calendar, Search, Plus, Edit, Users, BookOpen, Clock } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const mockAssignments = [
  {
    id: 1,
    teacherName: "Dr. John Smith",
    teacherId: "T001",
    department: "Computer Science",
    assignments: [
      { 
        course: "Machine Learning", 
        code: "CS401", 
        students: 45, 
        schedule: "Mon/Wed/Fri 9:00-10:30 AM",
        semester: "Fall 2024",
        room: "CS-101"
      },
      { 
        course: "AI Fundamentals", 
        code: "CS301", 
        students: 38, 
        schedule: "Tue/Thu 2:00-3:30 PM",
        semester: "Fall 2024",
        room: "CS-102"
      }
    ],
    totalStudents: 83,
    totalHours: 6,
    officeHours: "Mon/Wed 2-4 PM"
  },
  {
    id: 2,
    teacherName: "Prof. Sarah Johnson",
    teacherId: "T002",
    department: "Software Engineering",
    assignments: [
      { 
        course: "Software Design", 
        code: "SE201", 
        students: 52, 
        schedule: "Mon/Wed/Fri 11:00-12:30 PM",
        semester: "Fall 2024",
        room: "SE-201"
      },
      { 
        course: "System Architecture", 
        code: "SE401", 
        students: 28, 
        schedule: "Tue/Thu 10:00-11:30 AM",
        semester: "Fall 2024",
        room: "SE-202"
      }
    ],
    totalStudents: 80,
    totalHours: 6,
    officeHours: "Tue/Thu 1-3 PM"
  },
  {
    id: 3,
    teacherName: "Dr. Michael Chen",
    teacherId: "T003",
    department: "Data Science",
    assignments: [
      { 
        course: "Data Mining", 
        code: "DS301", 
        students: 35, 
        schedule: "Mon/Wed 1:00-2:30 PM",
        semester: "Fall 2024",
        room: "DS-101"
      },
      { 
        course: "Statistics", 
        code: "DS201", 
        students: 42, 
        schedule: "Tue/Thu 9:00-10:30 AM",
        semester: "Fall 2024",
        room: "DS-102"
      },
      { 
        course: "Big Data", 
        code: "DS401", 
        students: 25, 
        schedule: "Fri 2:00-5:00 PM",
        semester: "Fall 2024",
        room: "DS-Lab"
      }
    ],
    totalStudents: 102,
    totalHours: 9,
    officeHours: "Wed/Fri 10-12 PM"
  }
];

const departments = ["Computer Science", "Software Engineering", "Data Science", "Information Technology"];
const semesters = ["Fall 2024", "Spring 2024", "Summer 2024"];

export function TeacherAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesSearch = assignment.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.assignments.some(a => a.course.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === "all" || assignment.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getWorkloadColor = (hours: number) => {
    if (hours >= 9) return "text-red-600";
    if (hours >= 6) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Teacher Assignments</h1>
          <p className="text-muted-foreground">Manage course assignments and teaching schedules</p>
        </div>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Select Teacher</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAssignments.map((assignment) => (
                        <SelectItem key={assignment.id} value={assignment.teacherId}>
                          {assignment.teacherName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Course</label>
                  <Input placeholder="Enter course name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Course Code</label>
                  <Input placeholder="e.g., CS401" />
                </div>
                <div>
                  <label className="text-sm font-medium">Room</label>
                  <Input placeholder="e.g., CS-101" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Schedule</label>
                <Input placeholder="e.g., Mon/Wed/Fri 9:00-10:30 AM" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAssignDialogOpen(false)}>
                  Create Assignment
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
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAssignments.reduce((sum, t) => sum + t.assignments.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Active this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers Assigned</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssignments.length}</div>
            <p className="text-xs text-muted-foreground">Currently teaching</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAssignments.reduce((sum, t) => sum + t.totalStudents, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Enrolled in courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Teaching Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockAssignments.reduce((sum, t) => sum + t.totalHours, 0) / mockAssignments.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Hours per week</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Semesters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Assignments Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Course Assignments</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Office Hours</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder-teacher-${assignment.id}.jpg`} />
                        <AvatarFallback>{assignment.teacherName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{assignment.teacherName}</p>
                        <p className="text-sm text-muted-foreground">{assignment.teacherId}</p>
                        <p className="text-xs text-muted-foreground">{assignment.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {assignment.assignments.slice(0, 2).map((course, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{course.course}</p>
                            <p className="text-xs text-muted-foreground">
                              {course.code} • {course.room} • {course.students} students
                            </p>
                            <p className="text-xs text-muted-foreground">{course.schedule}</p>
                          </div>
                        </div>
                      ))}
                      {assignment.assignments.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          +{assignment.assignments.length - 2} more assignments
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{assignment.totalStudents} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className={`text-sm font-medium ${getWorkloadColor(assignment.totalHours)}`}>
                          {assignment.totalHours} hours/week
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {assignment.assignments.length} courses
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{assignment.officeHours}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        View Schedule
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