import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, MessageSquare, FileText, Clock, User, GraduationCap, CheckCircle, AlertCircle } from "lucide-react";

const fypProjects = [
  {
    id: 1,
    student: "Alice Johnson",
    avatar: "/placeholder.svg",
    project: "AI-Powered Student Learning Analytics Platform",
    progress: 75,
    status: "on-track",
    nextMeeting: "2024-02-15",
    lastUpdate: "3 days ago",
    milestones: {
      completed: 6,
      total: 8
    },
    recentActivity: "Submitted literature review chapter"
  },
  {
    id: 2,
    student: "Bob Smith", 
    avatar: "/placeholder.svg",
    project: "Blockchain-Based Supply Chain Management System",
    progress: 45,
    status: "delayed",
    nextMeeting: "2024-02-12",
    lastUpdate: "1 week ago",
    milestones: {
      completed: 3,
      total: 7
    },
    recentActivity: "Working on system architecture design"
  },
  {
    id: 3,
    student: "Carol Davis",
    avatar: "/placeholder.svg", 
    project: "Mobile Health Monitoring Application",
    progress: 90,
    status: "excellent",
    nextMeeting: "2024-02-10",
    lastUpdate: "1 day ago", 
    milestones: {
      completed: 7,
      total: 8
    },
    recentActivity: "Completed final testing phase"
  }
];

const meetings = [
  {
    id: 1,
    student: "Alice Johnson",
    project: "AI-Powered Student Learning Analytics Platform",
    date: "2024-02-15",
    time: "10:00 AM",
    type: "Progress Review",
    agenda: "Discuss implementation progress and next steps"
  },
  {
    id: 2,
    student: "Bob Smith",
    project: "Blockchain-Based Supply Chain Management System", 
    date: "2024-02-12",
    time: "2:00 PM",
    type: "Problem Solving",
    agenda: "Address technical challenges in smart contract development"
  }
];

export function FYPSupervisionPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "default";
      case "on-track": return "secondary"; 
      case "delayed": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return CheckCircle;
      case "on-track": return CheckCircle;
      case "delayed": return AlertCircle;
      default: return AlertCircle;
    }
  };

  const handleSubmitFeedback = () => {
    console.log("Submitting feedback:", feedback);
    setFeedback("");
    setIsFeedbackDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">FYP Supervision</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and guide your Final Year Project students
        </p>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Active Projects ({fypProjects.length})</TabsTrigger>
          <TabsTrigger value="meetings">Upcoming Meetings ({meetings.length})</TabsTrigger>
          <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {fypProjects.map((project) => {
              const StatusIcon = getStatusIcon(project.status);
              
              return (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={project.avatar} alt={project.student} />
                          <AvatarFallback>
                            {project.student.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{project.student}</h3>
                            <Badge variant={getStatusColor(project.status)} className="flex items-center gap-1">
                              <StatusIcon className="h-3 w-3" />
                              {project.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <h4 className="text-sm font-medium text-primary mb-2">
                            {project.project}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {project.recentActivity}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>Next: {project.nextMeeting}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Updated: {project.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Overall Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Milestones Completed</span>
                      <span className="font-medium">
                        {project.milestones.completed}/{project.milestones.total}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2">
                      <Button size="sm" className="flex items-center gap-2">
                        <MessageSquare className="h-3 w-3" />
                        Message Student
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        Schedule Meeting
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="flex items-center gap-2">
                            <FileText className="h-3 w-3" />
                            Add Feedback
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Feedback for {project.student}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="feedback">Feedback</Label>
                              <Textarea
                                id="feedback"
                                placeholder="Enter your feedback..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="min-h-[100px]"
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Cancel</Button>
                              <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <div className="grid gap-4">
            {meetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{meeting.student}</h3>
                      <p className="text-sm text-muted-foreground">{meeting.project}</p>
                    </div>
                    <Badge variant="outline">{meeting.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{meeting.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Agenda:</strong> {meeting.agenda}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <Button size="sm">Join Meeting</Button>
                    <Button size="sm" variant="outline">Reschedule</Button>
                    <Button size="sm" variant="outline">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="text-center py-8 text-muted-foreground">
            Recent project submissions will be shown here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}