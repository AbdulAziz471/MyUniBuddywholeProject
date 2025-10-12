import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  TrendingUp,
  FileText,
  Settings,
  Shield,
  Database,
  Activity,
  BarChart3,
  UserCheck,
  UserX,
  Eye,
  Clock,
  Globe,
  Server,
  Zap,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Calendar,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

export const EnhancedAdminDashboard = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Real-time System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="feature-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">12,847</div>
            <div className="flex items-center space-x-2 text-xs">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success">+234 this month</span>
            </div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="feature-card border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Questions</CardTitle>
            <MessageSquare className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">1,547</div>
            <div className="flex items-center space-x-2 text-xs">
              <Activity className="h-3 w-3 text-secondary" />
              <span className="text-secondary">+67 today</span>
            </div>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="feature-card border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">23</div>
            <div className="flex items-center space-x-2 text-xs">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Needs review</span>
            </div>
            <Progress value={15} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="feature-card border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">99.9%</div>
            <div className="flex items-center space-x-2 text-xs">
              <CheckCircle className="h-3 w-3 text-success" />
              <span className="text-success">All systems operational</span>
            </div>
            <Progress value={99} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="gradient-text">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2 btn-hero">
              <UserCheck className="w-6 h-6" />
              <span className="text-sm">Approve Teachers</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2 btn-secondary">
              <Shield className="w-6 h-6" />
              <span className="text-sm">Review Content</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2 btn-hero-outline">
              <FileText className="w-6 h-6" />
              <span className="text-sm">Generate Report</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2 btn-secondary">
              <Settings className="w-6 h-6" />
              <span className="text-sm">System Config</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Admin Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6 h-14 bg-card">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real-time Activity Feed */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Live Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { action: "New question posted", user: "sarah.chen@uni.edu", time: "2 min ago", type: "question" },
                  { action: "Teacher approved", user: "dr.ahmed@uni.edu", time: "5 min ago", type: "approval" },
                  { action: "Content flagged", user: "auto-mod", time: "8 min ago", type: "flag" },
                  { action: "Report generated", user: "admin", time: "12 min ago", type: "report" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'question' ? 'bg-primary' :
                        activity.type === 'approval' ? 'bg-success' :
                        activity.type === 'flag' ? 'bg-destructive' : 'bg-accent'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Performance */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span className="text-muted-foreground">24%</span>
                  </div>
                  <Progress value={24} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span className="text-muted-foreground">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Load</span>
                    <span className="text-muted-foreground">31%</span>
                  </div>
                  <Progress value={31} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span className="text-success">145ms</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold gradient-text">User Management</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-10 w-64" />
              </div>
              <Button className="btn-hero">Add User</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Approvals */}
            <Card className="feature-card border-warning/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Pending Teacher Approvals
                  <Badge variant="destructive">5</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Dr. Sarah Ahmed", email: "sarah@university.edu", department: "Computer Science", date: "2 days ago" },
                  { name: "Prof. Michael Chen", email: "mchen@university.edu", department: "Mathematics", date: "1 day ago" },
                  { name: "Dr. Lisa Rodriguez", email: "lrodriguez@university.edu", department: "Physics", date: "3 hours ago" }
                ].map((user, index) => (
                  <div key={index} className="p-4 border border-border/50 rounded-xl bg-card/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">{user.department}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{user.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 btn-hero">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* User Statistics */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  User Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="text-2xl font-bold text-primary">8,234</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                    <div className="text-2xl font-bold text-secondary">456</div>
                    <div className="text-xs text-muted-foreground">Teachers</div>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="text-2xl font-bold text-accent">12</div>
                    <div className="text-xs text-muted-foreground">Admins</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Users (24h)</span>
                    <span className="text-sm font-medium">2,847</span>
                  </div>
                  <Progress value={75} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New Registrations (7d)</span>
                    <span className="text-sm font-medium">234</span>
                  </div>
                  <Progress value={45} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Account Verifications</span>
                    <span className="text-sm font-medium">98.2%</span>
                  </div>
                  <Progress value={98} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold gradient-text">Content Moderation</h3>
            <div className="flex gap-2">
              <Button variant="outline">Export Logs</Button>
              <Button className="btn-hero">Bulk Actions</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Moderation Queue */}
            <div className="lg:col-span-2">
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Flagged Content Queue
                    </span>
                    <Badge variant="destructive">8 items</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: "Question", content: "Inappropriate academic question about...", reporter: "student123", severity: "high", time: "2h ago" },
                    { type: "Answer", content: "Potentially harmful advice regarding...", reporter: "teacher456", severity: "medium", time: "4h ago" },
                    { type: "Comment", content: "Spam content detected in discussion...", reporter: "auto-mod", severity: "low", time: "6h ago" }
                  ].map((item, index) => (
                    <div key={index} className="p-4 border border-border/50 rounded-xl bg-card/50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-2">
                          <Badge variant="outline">{item.type}</Badge>
                          <Badge variant={item.severity === "high" ? "destructive" : item.severity === "medium" ? "default" : "secondary"}>
                            {item.severity}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-sm mb-2 line-clamp-2">{item.content}</p>
                      <p className="text-xs text-muted-foreground mb-3">Reported by: {item.reporter}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive" className="flex-1">Remove</Button>
                        <Button size="sm" variant="outline" className="flex-1">Dismiss</Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Moderation Stats */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Moderation Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="text-3xl font-bold text-success">156</div>
                  <div className="text-sm text-muted-foreground">Items reviewed today</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Auto-detected</span>
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <Progress value={89} />
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Manual reports</span>
                    <span className="text-sm font-medium">11%</span>
                  </div>
                  <Progress value={11} />
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-destructive/10 rounded">
                      <div className="text-lg font-bold text-destructive">12</div>
                      <div className="text-xs">Removed</div>
                    </div>
                    <div className="p-2 bg-muted/10 rounded">
                      <div className="text-lg font-bold">144</div>
                      <div className="text-xs">Approved</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold gradient-text">Platform Analytics</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="feature-card border-success/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  User Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-success">+15.3%</div>
                <p className="text-sm text-muted-foreground">vs last month</p>
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground">New users this week</div>
                  <div className="text-2xl font-semibold">1,234</div>
                </div>
              </CardContent>
            </Card>

            <Card className="feature-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Question Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">2,341</div>
                <p className="text-sm text-muted-foreground">This week</p>
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground">Avg. response time</div>
                  <div className="text-2xl font-semibold">4.2m</div>
                </div>
              </CardContent>
            </Card>

            <Card className="feature-card border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-accent">87.3%</div>
                <p className="text-sm text-muted-foreground">Daily active rate</p>
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground">Session duration</div>
                  <div className="text-2xl font-semibold">23m</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold gradient-text">System Configuration</h3>
            <Button className="btn-hero">Save Changes</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Feature Flags */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Feature Flags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { feature: "AI Question Answering", enabled: true, description: "Enable AI-powered instant answers" },
                  { feature: "FYP Matching", enabled: true, description: "Automated project mentor matching" },
                  { feature: "Video Uploads", enabled: false, description: "Allow video file uploads" },
                  { feature: "Live Chat", enabled: true, description: "Real-time messaging system" }
                ].map((flag, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div>
                      <span className="font-medium">{flag.feature}</span>
                      <p className="text-sm text-muted-foreground">{flag.description}</p>
                    </div>
                    <Badge variant={flag.enabled ? "default" : "secondary"}>
                      {flag.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { service: "API Server", status: "healthy", uptime: "99.9%", load: "23%" },
                  { service: "Database", status: "healthy", uptime: "99.8%", load: "67%" },
                  { service: "AI Service", status: "warning", uptime: "98.5%", load: "89%" },
                  { service: "File Storage", status: "healthy", uptime: "99.9%", load: "34%" }
                ].map((service, index) => (
                  <div key={index} className="p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{service.service}</span>
                      <Badge variant={service.status === "healthy" ? "default" : "destructive"}>
                        {service.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Uptime: {service.uptime}</span>
                      <span>Load: {service.load}</span>
                    </div>
                    <Progress value={parseFloat(service.load)} className="h-1" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold gradient-text">Reports & Exports</h3>
            <Button className="btn-hero">Schedule Report</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Generate Reports */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generate New Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "User Activity Report", description: "Detailed user engagement metrics", icon: Users },
                  { name: "Platform Analytics", description: "Comprehensive platform statistics", icon: BarChart3 },
                  { name: "Security Audit Log", description: "Security events and access logs", icon: Shield },
                  { name: "Content Moderation", description: "Moderation actions and flagged content", icon: AlertTriangle },
                  { name: "System Performance", description: "Server performance and uptime metrics", icon: Activity },
                  { name: "Data Export", description: "Full database export for backup", icon: Database }
                ].map((report, index) => {
                  const IconComponent = report.icon;
                  return (
                    <Button key={index} variant="outline" className="w-full justify-start h-auto p-4">
                      <div className="flex items-center gap-3 text-left">
                        <IconComponent className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">{report.description}</div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Monthly User Report", generated: "2 days ago", size: "2.4 MB", status: "completed" },
                  { name: "Security Audit", generated: "1 week ago", size: "1.8 MB", status: "completed" },
                  { name: "Performance Analytics", generated: "2 weeks ago", size: "3.1 MB", status: "completed" },
                  { name: "Weekly Content Report", generated: "Processing...", size: "~2.0 MB", status: "processing" }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-card/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${report.status === 'completed' ? 'bg-success' : 'bg-warning'}`} />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">{report.generated} • {report.size}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {report.status === 'completed' && (
                        <>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {report.status === 'processing' && (
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};