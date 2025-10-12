import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  MessageSquare, 
  Clock, 
  Target, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Calendar
} from "lucide-react";

export const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Asked</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books Read</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FYP Progress</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">days in a row</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { question: "How to implement binary search trees?", status: "answered", time: "2 hours ago" },
              { question: "Best practices for database design", status: "pending", time: "1 day ago" },
              { question: "React component lifecycle methods", status: "answered", time: "3 days ago" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.question}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <Badge variant={item.status === "answered" ? "default" : "secondary"}>
                  {item.status === "answered" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                  {item.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">View All Questions</Button>
          </CardContent>
        </Card>

        {/* FYP Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Final Year Project
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI-Powered Learning Assistant</span>
                <span>68%</span>
              </div>
              <Progress value={68} />
            </div>
            
            <div className="space-y-3">
              {[
                { task: "Literature Review", completed: true },
                { task: "Methodology Design", completed: true },
                { task: "Implementation Phase", completed: false },
                { task: "Testing & Validation", completed: false }
              ].map((task, index) => (
                <div key={index} className="flex items-center gap-3">
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.task}
                  </span>
                </div>
              ))}
            </div>
            
            <Button className="w-full">Continue FYP</Button>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { task: "Database Assignment", due: "2 days", priority: "high" },
              { task: "Literature Review", due: "1 week", priority: "medium" },
              { task: "Midterm Presentation", due: "2 weeks", priority: "low" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{item.task}</p>
                  <p className="text-xs text-muted-foreground">Due in {item.due}</p>
                </div>
                <Badge variant={item.priority === "high" ? "destructive" : item.priority === "medium" ? "default" : "secondary"}>
                  {item.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              Ask Question
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Find Books
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Target className="w-6 h-6" />
              FYP Studio
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Calendar className="w-6 h-6" />
              Schedule Help
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};