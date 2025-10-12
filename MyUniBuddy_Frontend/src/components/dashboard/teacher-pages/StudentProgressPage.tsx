import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, TrendingUp, Award, Eye } from "lucide-react";

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg",
    course: "Computer Science",
    gpa: 3.8,
    attendance: 92,
    assignments: { completed: 8, total: 10 },
    lastActive: "2 hours ago",
    performance: "excellent",
    trend: "up"
  },
  {
    id: 2,
    name: "Bob Smith", 
    avatar: "/placeholder.svg",
    course: "Software Engineering",
    gpa: 3.2,
    attendance: 78,
    assignments: { completed: 6, total: 10 },
    lastActive: "1 day ago",
    performance: "average",
    trend: "stable"
  },
  {
    id: 3,
    name: "Carol Davis",
    avatar: "/placeholder.svg",
    course: "Data Science", 
    gpa: 3.9,
    attendance: 95,
    assignments: { completed: 9, total: 10 },
    lastActive: "5 hours ago",
    performance: "excellent", 
    trend: "up"
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "/placeholder.svg",
    course: "Computer Science",
    gpa: 2.8,
    attendance: 65,
    assignments: { completed: 4, total: 10 },
    lastActive: "3 days ago",
    performance: "needs-attention",
    trend: "down"
  }
];

const performanceData = [
  { month: 'Jan', avgGpa: 3.2, attendance: 85, assignments: 75 },
  { month: 'Feb', avgGpa: 3.4, attendance: 88, assignments: 80 },
  { month: 'Mar', avgGpa: 3.5, attendance: 87, assignments: 82 },
  { month: 'Apr', avgGpa: 3.6, attendance: 90, assignments: 85 },
  { month: 'May', avgGpa: 3.4, attendance: 89, assignments: 78 }
];

const gradeDistribution = [
  { grade: 'A', count: 12, color: '#22c55e' },
  { grade: 'B', count: 18, color: '#3b82f6' },
  { grade: 'C', count: 8, color: '#f59e0b' },
  { grade: 'D', count: 3, color: '#ef4444' },
  { grade: 'F', count: 1, color: '#991b1b' }
];

export function StudentProgressPage() {
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("semester");

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent": return "default";
      case "average": return "secondary";
      case "needs-attention": return "destructive";
      default: return "outline";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "📈";
      case "down": return "📉";
      case "stable": return "➖";
      default: return "➖";
    }
  };

  const filteredStudents = selectedCourse === "all" 
    ? students 
    : students.filter(student => student.course === selectedCourse);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Student Progress</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and analyze student performance across all courses
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Software Engineering">Software Engineering</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">Semester</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredStudents.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(filteredStudents.reduce((acc, s) => acc + s.gpa, 0) / filteredStudents.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              +0.2 from last semester
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(filteredStudents.reduce((acc, s) => acc + s.attendance, 0) / filteredStudents.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              -5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignment Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (filteredStudents.reduce((acc, s) => acc + s.assignments.completed, 0) /
                filteredStudents.reduce((acc, s) => acc + s.assignments.total, 0)) * 100
              )}%
            </div>
            <p className="text-xs text-muted-foreground">
              +8% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Individual Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgGpa" stroke="#8884d8" name="Avg GPA" />
                    <Line type="monotone" dataKey="attendance" stroke="#82ca9d" name="Attendance %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ grade, count }) => `${grade}: ${count}`}
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>
                          {student.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{student.name}</h3>
                          <Badge variant={getPerformanceColor(student.performance)}>
                            {student.performance.replace("-", " ")}
                          </Badge>
                          <span className="text-lg">{getTrendIcon(student.trend)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{student.course}</p>
                        <p className="text-xs text-muted-foreground">Last active: {student.lastActive}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">GPA</p>
                      <p className="font-semibold">{student.gpa}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Attendance</p>
                      <p className="font-semibold">{student.attendance}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Assignments</p>
                      <p className="font-semibold">
                        {student.assignments.completed}/{student.assignments.total}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completion</p>
                      <Progress 
                        value={(student.assignments.completed / student.assignments.total) * 100} 
                        className="h-2 mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Eye className="h-3 w-3" />
                      View Detailed Report
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="text-center py-8 text-muted-foreground">
            Advanced analytics and insights will be shown here
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="text-center py-8 text-muted-foreground">
            Downloadable reports and summaries will be shown here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}