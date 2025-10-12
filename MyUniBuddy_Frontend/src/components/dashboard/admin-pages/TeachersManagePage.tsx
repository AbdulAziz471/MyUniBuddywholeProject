import { useState } from "react";
import { Users, Plus, Edit, Trash2, Search, BookOpen, Award, Clock } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

const mockTeachers = [
  {
    id: 1,
    name: "Dr. John Smith",
    email: "john.smith@university.edu",
    employeeId: "EMP001",
    department: "Computer Science",
    position: "Professor",
    specialization: "Artificial Intelligence",
    yearsOfExperience: 15,
    courses: ["Machine Learning", "AI Fundamentals", "Deep Learning"],
    students: 45,
    officeHours: "Mon, Wed 2-4 PM",
    status: "Active",
    rating: 4.8
  },
  {
    id: 2,
    name: "Prof. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    employeeId: "EMP002", 
    department: "Software Engineering",
    position: "Associate Professor",
    specialization: "Software Architecture",
    yearsOfExperience: 10,
    courses: ["Software Design", "System Architecture", "DevOps"],
    students: 38,
    officeHours: "Tue, Thu 1-3 PM",
    status: "Active",
    rating: 4.6
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    email: "michael.chen@university.edu",
    employeeId: "EMP003",
    department: "Data Science", 
    position: "Assistant Professor",
    specialization: "Data Analytics",
    yearsOfExperience: 7,
    courses: ["Data Mining", "Statistics", "Big Data"],
    students: 52,
    officeHours: "Wed, Fri 10-12 PM",
    status: "Active",
    rating: 4.7
  },
  {
    id: 4,
    name: "Prof. Lisa Wilson",
    email: "lisa.wilson@university.edu",
    employeeId: "EMP004",
    department: "Information Technology",
    position: "Senior Lecturer",
    specialization: "Network Security", 
    yearsOfExperience: 12,
    courses: ["Cybersecurity", "Network Admin", "IT Management"],
    students: 41,
    officeHours: "Mon, Fri 3-5 PM",
    status: "On Leave",
    rating: 4.5
  },
  {
    id: 5,
    name: "Dr. Robert Davis",
    email: "robert.davis@university.edu",
    employeeId: "EMP005",
    department: "Computer Science",
    position: "Professor",
    specialization: "Algorithms & Data Structures",
    yearsOfExperience: 20,
    courses: ["Algorithms", "Data Structures", "Discrete Math"],
    students: 67,
    officeHours: "Tue, Thu 11-1 PM",
    status: "Active", 
    rating: 4.9
  }
];

const departments = ["Computer Science", "Software Engineering", "Data Science", "Information Technology"];
const positions = ["Professor", "Associate Professor", "Assistant Professor", "Senior Lecturer", "Lecturer"];

export function TeachersManagePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);

  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Leave": return "bg-yellow-100 text-yellow-800";
      case "Retired": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Teacher Management</h1>
          <p className="text-muted-foreground">Manage faculty members, courses, and teaching assignments</p>
        </div>
        <Dialog open={isAddTeacherOpen} onOpenChange={setIsAddTeacherOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teacherName">Full Name</Label>
                  <Input id="teacherName" placeholder="Enter teacher name" />
                </div>
                <div>
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input id="employeeId" placeholder="e.g., EMP006" />
                </div>
              </div>
              <div>
                <Label htmlFor="teacherEmail">Email</Label>
                <Input id="teacherEmail" type="email" placeholder="Enter email address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" placeholder="Enter area of specialization" />
              </div>
              <div>
                <Label htmlFor="bio">Bio/Background</Label>
                <Textarea id="bio" placeholder="Brief background and qualifications" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddTeacherOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddTeacherOpen(false)}>
                  Add Teacher
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
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeachers.length}</div>
            <p className="text-xs text-muted-foreground">Active faculty members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockTeachers.filter(t => t.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently teaching</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">Student feedback rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockTeachers.reduce((sum, teacher) => sum + teacher.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Under supervision</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
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
          </div>

          {/* Teachers Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Department & Position</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder-teacher-${teacher.id}.jpg`} />
                        <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-muted-foreground">{teacher.employeeId}</p>
                        <p className="text-xs text-muted-foreground">{teacher.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{teacher.department}</p>
                      <p className="text-sm text-muted-foreground">{teacher.position}</p>
                      <p className="text-xs text-muted-foreground">{teacher.specialization}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {teacher.courses.slice(0, 2).map((course, index) => (
                        <Badge key={index} variant="outline" className="text-xs mr-1">
                          {course}
                        </Badge>
                      ))}
                      {teacher.courses.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          +{teacher.courses.length - 2} more
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span>{teacher.students}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Award className="w-3 h-3" />
                      <span className={getRatingColor(teacher.rating)}>
                        {teacher.rating}/5.0
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(teacher.status)}>
                      {teacher.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{teacher.officeHours}</span>
                    </div>
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