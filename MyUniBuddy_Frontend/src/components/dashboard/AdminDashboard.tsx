import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  UserX
} from "lucide-react";

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">+234 this month</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Questions</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,547</div>
            <p className="text-xs text-muted-foreground">+67 today</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Needs review</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Panel Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-12">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Moderation
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Approvals */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    Pending Teacher Approvals
                    <Badge variant="destructive">5</Badge>
                  </h3>
                  {[
                    { name: "Dr. Sarah Ahmed", email: "sarah@university.edu", department: "Computer Science" },
                    { name: "Prof. Michael Chen", email: "mchen@university.edu", department: "Mathematics" },
                    { name: "Dr. Lisa Rodriguez", email: "lrodriguez@university.edu", department: "Physics" }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">{user.department}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="default">Approve</Button>
                        <Button size="sm" variant="outline">Reject</Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Actions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent User Actions</h3>
                  {[
                    { action: "Suspended user for violations", user: "john.doe@email.com", time: "2 hours ago" },
                    { action: "Approved teacher application", user: "jane.smith@university.edu", time: "1 day ago" },
                    { action: "Role changed to admin", user: "admin@university.edu", time: "3 days ago" }
                  ].map((action, index) => (
                    <div key={index} className="p-3 bg-accent/10 rounded-lg">
                      <p className="text-sm font-medium">{action.action}</p>
                      <p className="text-xs text-muted-foreground">{action.user} • {action.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Flagged Content */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Flagged Content
                    <Badge variant="destructive">8</Badge>
                  </h3>
                  {[
                    { type: "Question", content: "Inappropriate question about...", reporter: "student123", severity: "high" },
                    { type: "Answer", content: "Potentially harmful advice...", reporter: "teacher456", severity: "medium" },
                    { type: "Comment", content: "Spam content detected...", reporter: "auto-mod", severity: "low" }
                  ].map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{item.type}</Badge>
                        <Badge variant={item.severity === "high" ? "destructive" : item.severity === "medium" ? "default" : "secondary"}>
                          {item.severity}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{item.content}</p>
                      <p className="text-xs text-muted-foreground mb-3">Reported by: {item.reporter}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive">Remove</Button>
                        <Button size="sm" variant="outline">Dismiss</Button>
                        <Button size="sm" variant="outline">View Full</Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Moderation Stats */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Moderation Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">156</div>
                        <p className="text-sm text-muted-foreground">Items reviewed today</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-sm text-muted-foreground">Content removed</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">98.5%</div>
                        <p className="text-sm text-muted-foreground">Auto-mod accuracy</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-sm text-muted-foreground">Active moderators</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-500">+15.3%</div>
                    <p className="text-sm text-muted-foreground">vs last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Question Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-500">2,341</div>
                    <p className="text-sm text-muted-foreground">This week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-500">4.2m</div>
                    <p className="text-sm text-muted-foreground">Average response</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Feature Flags</h3>
                  {[
                    { feature: "AI Question Answering", enabled: true },
                    { feature: "FYP Matching", enabled: true },
                    { feature: "Video Uploads", enabled: false },
                    { feature: "Live Chat", enabled: true }
                  ].map((flag, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{flag.feature}</span>
                      <Badge variant={flag.enabled ? "default" : "secondary"}>
                        {flag.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">System Status</h3>
                  {[
                    { service: "API Server", status: "healthy", uptime: "99.9%" },
                    { service: "Database", status: "healthy", uptime: "99.8%" },
                    { service: "AI Service", status: "warning", uptime: "98.5%" },
                    { service: "File Storage", status: "healthy", uptime: "99.9%" }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{service.service}</p>
                        <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                      </div>
                      <Badge variant={service.status === "healthy" ? "default" : "destructive"}>
                        {service.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Exports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Generate Reports</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      User Activity Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Platform Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Audit Log
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="w-4 h-4 mr-2" />
                      Data Export
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Reports</h3>
                  {[
                    { name: "Monthly User Report", generated: "2 days ago", size: "2.4 MB" },
                    { name: "Security Audit", generated: "1 week ago", size: "1.8 MB" },
                    { name: "Performance Analytics", generated: "2 weeks ago", size: "3.1 MB" }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">{report.generated} • {report.size}</p>
                      </div>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};