import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Plus, 
  Search, 
  Calendar,
  Clock,
  MapPin,
  Video,
  BookOpen,
  MessageSquare,
  Star,
  Filter
} from "lucide-react";

const studyGroups = [
  {
    id: 1,
    name: "Data Structures Study Circle",
    subject: "Computer Science",
    members: 8,
    maxMembers: 12,
    nextMeeting: "Today at 6:00 PM",
    location: "Library Room 204",
    type: "in-person",
    difficulty: "Intermediate",
    description: "Weekly study sessions covering algorithms and data structures for CS students",
    organizer: "Sarah Ahmed",
    rating: 4.8,
    tags: ["algorithms", "coding", "cs"]
  },
  {
    id: 2,
    name: "React Development Bootcamp",
    subject: "Web Development",
    members: 15,
    maxMembers: 20,
    nextMeeting: "Tomorrow at 3:00 PM",
    location: "Online",
    type: "virtual",
    difficulty: "Beginner",
    description: "Learn React from basics to advanced concepts with hands-on projects",
    organizer: "Ali Hassan",
    rating: 4.9,
    tags: ["react", "javascript", "frontend"]
  },
  {
    id: 3,
    name: "Database Design Workshop",
    subject: "Database Systems",
    members: 6,
    maxMembers: 10,
    nextMeeting: "Friday at 2:00 PM",
    location: "CS Lab 3",
    type: "in-person",
    difficulty: "Advanced",
    description: "Deep dive into database normalization, optimization, and design patterns",
    organizer: "Fatima Khan",
    rating: 4.7,
    tags: ["database", "sql", "design"]
  }
];

const myGroups = [
  {
    name: "Machine Learning Study Group",
    nextMeeting: "Tomorrow at 4:00 PM",
    members: 12,
    role: "Member"
  },
  {
    name: "Software Engineering Project Team",
    nextMeeting: "Friday at 10:00 AM",
    members: 6,
    role: "Organizer"
  }
];

const upcomingMeetings = [
  {
    group: "Data Structures Study Circle",
    time: "Today at 6:00 PM",
    location: "Library Room 204",
    topic: "Binary Trees Implementation"
  },
  {
    group: "ML Study Group",
    time: "Tomorrow at 4:00 PM",
    location: "Online",
    topic: "Neural Networks Basics"
  },
  {
    group: "SE Project Team",
    time: "Friday at 10:00 AM",
    location: "CS Lab 1",
    topic: "Sprint Planning"
  }
];

export const StudyGroupsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Study Groups</h1>
          <p className="text-muted-foreground">Join collaborative learning sessions with your peers</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Available Groups</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Joined Groups</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search study groups by subject or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md text-sm"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Groups */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Available Study Groups</h2>
          <div className="space-y-4">
            {studyGroups.map((group) => (
              <Card key={group.id} className="feature-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{group.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>by {group.organizer}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{group.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{group.subject}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{group.members}/{group.maxMembers} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {group.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{group.nextMeeting}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {group.type === "virtual" ? (
                        <Video className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span>{group.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {group.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">Join Group</Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* My Groups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                My Study Groups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myGroups.map((group, index) => (
                <div key={index} className="p-3 bg-accent/10 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">{group.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{group.nextMeeting}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{group.members} members</span>
                    <Badge variant="outline" className="text-xs">{group.role}</Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Meetings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingMeetings.map((meeting, index) => (
                <div key={index} className="p-3 bg-accent/10 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">{meeting.group}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{meeting.topic}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{meeting.location}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Create Study Group
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Session
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Find Study Buddy
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};