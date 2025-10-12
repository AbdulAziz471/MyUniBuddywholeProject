import { useState } from "react";
import { TrendingUp, Search, Filter, Award, Star, Users, BookOpen, Target } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

const mockPerformance = [
  {
    id: 1,
    teacherName: "Dr. John Smith",
    teacherId: "T001",
    department: "Computer Science",
    studentRating: 4.8,
    totalStudents: 83,
    coursesCompleted: 12,
    publicationsCount: 8,
    researchProjects: 3,
    performance: {
      teaching: 95,
      research: 88,
      service: 92,
      overall: 92
    },
    recentAchievements: ["Best Teacher Award 2024", "Research Grant Recipient"],
    goals: [
      { name: "Student Satisfaction", target: 90, current: 96 },
      { name: "Research Publications", target: 6, current: 8 },
      { name: "Course Completion Rate", target: 95, current: 98 }
    ]
  },
  {
    id: 2,
    teacherName: "Prof. Sarah Johnson",
    teacherId: "T002",
    department: "Software Engineering",
    studentRating: 4.6,
    totalStudents: 80,
    coursesCompleted: 10,
    publicationsCount: 5,
    researchProjects: 2,
    performance: {
      teaching: 88,
      research: 75,
      service: 85,
      overall: 83
    },
    recentAchievements: ["Excellence in Teaching", "Industry Partnership"],
    goals: [
      { name: "Student Satisfaction", target: 90, current: 92 },
      { name: "Research Publications", target: 6, current: 5 },
      { name: "Course Completion Rate", target: 95, current: 94 }
    ]
  },
  {
    id: 3,
    teacherName: "Dr. Michael Chen",
    teacherId: "T003",
    department: "Data Science",
    studentRating: 4.7,
    totalStudents: 102,
    coursesCompleted: 15,
    publicationsCount: 12,
    researchProjects: 5,
    performance: {
      teaching: 90,
      research: 95,
      service: 88,
      overall: 91
    },
    recentAchievements: ["Outstanding Researcher", "Student Mentor Award"],
    goals: [
      { name: "Student Satisfaction", target: 90, current: 94 },
      { name: "Research Publications", target: 10, current: 12 },
      { name: "Course Completion Rate", target: 95, current: 96 }
    ]
  }
];

const departments = ["Computer Science", "Software Engineering", "Data Science", "Information Technology"];

export function TeacherPerformancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredPerformance = mockPerformance.filter(record => {
    const matchesSearch = record.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.teacherId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || record.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-yellow-600";
    return "text-red-600";
  };

  const getGoalStatus = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return "Exceeded";
    if (percentage >= 90) return "On Track";
    return "Needs Attention";
  };

  const getGoalColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return "text-green-600";
    if (percentage >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Teacher Performance</h1>
          <p className="text-muted-foreground">Evaluate and track teacher performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Generate Report
          </Button>
          <Button className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Performance Review
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">Student feedback</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Performers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPerformance.filter(p => p.performance.overall >= 90).length}
            </div>
            <p className="text-xs text-muted-foreground">Above 90% overall</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPerformance.reduce((sum, t) => sum + t.totalStudents, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Under supervision</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publications</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPerformance.reduce((sum, t) => sum + t.publicationsCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
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

          {/* Performance Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Performance Metrics</TableHead>
                <TableHead>Student Impact</TableHead>
                <TableHead>Goals Progress</TableHead>
                <TableHead>Achievements</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPerformance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder-teacher-${record.id}.jpg`} />
                        <AvatarFallback>{record.teacherName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{record.teacherName}</p>
                        <p className="text-sm text-muted-foreground">{record.teacherId}</p>
                        <p className="text-xs text-muted-foreground">{record.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Overall</span>
                        <span className={`font-bold ${getPerformanceColor(record.performance.overall)}`}>
                          {record.performance.overall}%
                        </span>
                      </div>
                      <Progress value={record.performance.overall} className="h-1" />
                      <div className="grid grid-cols-3 gap-1 text-xs text-muted-foreground">
                        <span>Teaching: {record.performance.teaching}%</span>
                        <span>Research: {record.performance.research}%</span>
                        <span>Service: {record.performance.service}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className={`font-medium ${getRatingColor(record.studentRating)}`}>
                          {record.studentRating}/5.0
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span>{record.totalStudents} students</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="w-3 h-3" />
                        <span>{record.coursesCompleted} courses</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {record.goals.slice(0, 2).map((goal, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="truncate max-w-20">{goal.name}</span>
                            <span className={getGoalColor(goal.current, goal.target)}>
                              {goal.current}/{goal.target}
                            </span>
                          </div>
                          <Progress value={(goal.current / goal.target) * 100} className="h-1" />
                        </div>
                      ))}
                      {record.goals.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          +{record.goals.length - 2} more goals
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {record.recentAchievements.slice(0, 2).map((achievement, index) => (
                        <Badge key={index} variant="outline" className="text-xs block">
                          {achievement}
                        </Badge>
                      ))}
                      <div className="flex gap-1 text-xs text-muted-foreground">
                        <Target className="w-3 h-3" />
                        <span>{record.publicationsCount} publications</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        View Report
                      </Button>
                      <Button variant="ghost" size="sm">
                        Set Goals
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