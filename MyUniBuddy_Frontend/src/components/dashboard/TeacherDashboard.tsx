import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  Clock, 
  BookOpen, 
  Star,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Calendar,
  FileText
} from "lucide-react";

export const TeacherDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Helped</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+89 this week</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">356</div>
            <p className="text-xs text-muted-foreground">+23 today</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FYP Mentees</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9</div>
            <p className="text-xs text-muted-foreground">From 234 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Pending Questions
              <Badge variant="destructive">5</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                question: "Help with machine learning algorithms", 
                student: "Alice Chen", 
                course: "CS-301",
                urgency: "high",
                time: "30 mins ago" 
              },
              { 
                question: "Database normalization confusion", 
                student: "Bob Smith", 
                course: "CS-205",
                urgency: "medium",
                time: "2 hours ago" 
              },
              { 
                question: "React hooks best practices", 
                student: "Carol Davis", 
                course: "CS-401",
                urgency: "low",
                time: "1 day ago" 
              }
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.question}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.student} • {item.course} • {item.time}
                    </p>
                  </div>
                  <Badge variant={item.urgency === "high" ? "destructive" : item.urgency === "medium" ? "default" : "secondary"}>
                    {item.urgency}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="default">Answer</Button>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">View All Questions</Button>
          </CardContent>
        </Card>

        {/* FYP Mentorship */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              FYP Mentorship
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                student: "Emma Wilson", 
                project: "AI Chatbot for Customer Service", 
                progress: 75, 
                status: "on-track",
                nextMeeting: "Tomorrow, 2 PM"
              },
              { 
                student: "David Lee", 
                project: "Blockchain Supply Chain", 
                progress: 45, 
                status: "needs-attention",
                nextMeeting: "Friday, 10 AM"
              },
              { 
                student: "Sarah Johnson", 
                project: "IoT Home Automation", 
                progress: 90, 
                status: "excellent",
                nextMeeting: "Next week"
              }
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{item.student}</p>
                    <p className="text-xs text-muted-foreground">{item.project}</p>
                  </div>
                  <Badge variant={item.status === "excellent" ? "default" : item.status === "needs-attention" ? "destructive" : "secondary"}>
                    {item.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Next meeting: {item.nextMeeting}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full">View All Mentees</Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "Answered question about React hooks", time: "10 mins ago", type: "answer" },
              { action: "Added new resource for Database Design", time: "2 hours ago", type: "resource" },
              { action: "Scheduled meeting with Emma Wilson", time: "1 day ago", type: "meeting" },
              { action: "Reviewed FYP proposal from new student", time: "2 days ago", type: "review" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                {item.type === "answer" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                {item.type === "resource" && <BookOpen className="w-4 h-4 text-blue-500" />}
                {item.type === "meeting" && <Calendar className="w-4 h-4 text-purple-500" />}
                {item.type === "review" && <FileText className="w-4 h-4 text-orange-500" />}
                <div className="flex-1">
                  <p className="text-sm">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Teaching Tools</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              Answer Queue
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Add Resources
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="w-6 h-6" />
              Student Progress
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Calendar className="w-6 h-6" />
              Office Hours
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};