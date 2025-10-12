import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Users, 
  MessageSquare, 
  Calendar,
  Star,
  Clock,
  CheckCircle2,
  Plus,
  Filter,
  Search,
  Video,
  FileText,
  Code
} from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Sarah Ahmed",
    expertise: "Machine Learning",
    year: "Final Year",
    rating: 4.9,
    projects: 12,
    available: true,
    avatar: "SA"
  },
  {
    id: 2,
    name: "Ali Hassan",
    expertise: "Web Development",
    year: "Final Year",
    rating: 4.8,
    projects: 8,
    available: false,
    avatar: "AH"
  },
  {
    id: 3,
    name: "Fatima Khan",
    expertise: "Mobile Apps",
    year: "Graduate",
    rating: 5.0,
    projects: 15,
    available: true,
    avatar: "FK"
  }
];

const projectHelp = [
  {
    id: 1,
    title: "E-Commerce Platform Development",
    student: "Ahmad Ali",
    category: "Web Development",
    progress: 75,
    helpers: 3,
    lastActivity: "2 hours ago",
    status: "active",
    description: "Building a full-stack e-commerce platform with React and Node.js"
  },
  {
    id: 2,
    title: "AI Chatbot for Customer Service",
    student: "Zara Sheikh",
    category: "AI/ML",
    progress: 45,
    helpers: 2,
    lastActivity: "1 day ago",
    status: "needs-help",
    description: "Developing an intelligent chatbot using natural language processing"
  },
  {
    id: 3,
    title: "Mobile Fitness Tracking App",
    student: "Hassan Malik",
    category: "Mobile Development",
    progress: 90,
    helpers: 1,
    lastActivity: "3 days ago",
    status: "completed",
    description: "React Native app for fitness tracking with health monitoring"
  }
];

const myProject = {
  title: "AI-Powered Learning Assistant",
  description: "An intelligent tutoring system that adapts to student learning patterns",
  progress: 68,
  mentor: "Dr. Sarah Ahmed",
  nextMeeting: "Tomorrow at 2:00 PM",
  tasks: [
    { name: "Literature Review", completed: true },
    { name: "System Design", completed: true },
    { name: "Backend API", completed: false, inProgress: true },
    { name: "Frontend Development", completed: false },
    { name: "Testing & Deployment", completed: false }
  ]
};

export const FYPStudioPage = () => {
  const [activeTab, setActiveTab] = useState("my-project");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">FYP Studio</h1>
          <p className="text-muted-foreground">Collaborate on final year projects with seniors and peers</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Request Help
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="my-project">My Project</TabsTrigger>
          <TabsTrigger value="get-help">Get Help</TabsTrigger>
          <TabsTrigger value="help-others">Help Others</TabsTrigger>
          <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
        </TabsList>

        <TabsContent value="my-project" className="space-y-6">
          <Card className="feature-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  {myProject.title}
                </CardTitle>
                <Badge variant="secondary">In Progress</Badge>
              </div>
              <p className="text-muted-foreground">{myProject.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">{myProject.progress}%</span>
                </div>
                <Progress value={myProject.progress} className="h-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Project Tasks</h4>
                  <div className="space-y-3">
                    {myProject.tasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {task.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : task.inProgress ? (
                          <Clock className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                        )}
                        <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : task.inProgress ? 'font-medium text-yellow-600' : ''}`}>
                          {task.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h4 className="font-semibold mb-2">Mentor</h4>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{myProject.mentor}</p>
                        <p className="text-xs text-muted-foreground">Machine Learning Expert</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold mb-2">Next Meeting</h4>
                    <p className="text-sm">{myProject.nextMeeting}</p>
                    <Button size="sm" className="mt-2">
                      <Video className="w-4 h-4 mr-2" />
                      Join Meeting
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
                <Button variant="outline">
                  <Code className="w-4 h-4 mr-2" />
                  Source Code
                </Button>
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with Mentor
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help-others" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search projects to help with..."
                className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md text-sm"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4">
            {projectHelp.map((project) => (
              <Card key={project.id} className="feature-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by {project.student}</span>
                        <span>•</span>
                        <span>{project.lastActivity}</span>
                      </div>
                    </div>
                    <Badge variant={
                      project.status === "active" ? "default" : 
                      project.status === "needs-help" ? "destructive" : "secondary"
                    }>
                      {project.status.replace("-", " ")}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{project.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{project.helpers} helpers</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{project.progress}%</span>
                      <Progress value={project.progress} className="w-20 h-2" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm">Offer Help</Button>
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="feature-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>{mentor.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.year}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{mentor.rating}</span>
                      </div>
                    </div>
                    <Badge variant={mentor.available ? "default" : "secondary"}>
                      {mentor.available ? "Available" : "Busy"}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><strong>Expertise:</strong> {mentor.expertise}</p>
                    <p className="text-sm"><strong>Projects Helped:</strong> {mentor.projects}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" disabled={!mentor.available}>
                      Connect
                    </Button>
                    <Button size="sm" variant="outline">
                      Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="get-help" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Project Help</CardTitle>
              <p className="text-muted-foreground">Connect with senior students and get guidance for your FYP</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Project Title</label>
                  <input className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md text-sm">
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>AI/Machine Learning</option>
                    <option>Data Science</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md text-sm" 
                  rows={4}
                  placeholder="Describe your project and what kind of help you need..."
                />
              </div>
              <Button>Submit Request</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};