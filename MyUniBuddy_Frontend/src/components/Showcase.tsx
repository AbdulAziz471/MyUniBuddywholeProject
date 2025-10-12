import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Calendar,
  Star
} from "lucide-react";

export const Showcase = () => {
  const projects = [
    {
      title: "Smart Campus Navigation System",
      student: "Alex Chen",
      mentor: "Dr. Rodriguez",
      category: "Computer Science",
      description: "AI-powered indoor navigation using computer vision and machine learning for university campuses.",
      image: "/api/placeholder/400/250",
      tags: ["AI", "Computer Vision", "Mobile App"],
      completion: "95%",
      rating: 4.9
    },
    {
      title: "Sustainable Energy Management",
      student: "Maria Santos",
      mentor: "Prof. Johnson",
      category: "Engineering",
      description: "IoT-based system for monitoring and optimizing energy consumption in smart buildings.",
      image: "/api/placeholder/400/250",
      tags: ["IoT", "Sustainability", "Data Analytics"],
      completion: "88%",
      rating: 4.8
    },
    {
      title: "Mental Health Support Platform",
      student: "David Kim",
      mentor: "Dr. Williams",
      category: "Psychology",
      description: "Web platform providing peer support and resources for university students' mental wellness.",
      image: "/api/placeholder/400/250",
      tags: ["Web Development", "Psychology", "Healthcare"],
      completion: "92%",
      rating: 4.9
    }
  ];

  const resources = [
    {
      title: "Machine Learning Fundamentals",
      author: "Dr. Sarah Mitchell",
      type: "Book",
      downloads: "2.5k",
      rating: 4.8,
      category: "Computer Science"
    },
    {
      title: "Research Methodology Guide",
      author: "Prof. James Wilson",
      type: "Guide",
      downloads: "3.2k",
      rating: 4.9,
      category: "General"
    },
    {
      title: "Statistics for Engineers",
      author: "Dr. Lisa Park",
      type: "Textbook",
      downloads: "1.8k",
      rating: 4.7,
      category: "Engineering"
    }
  ];

  const stats = [
    { label: "Successful Projects", value: "1,200+", icon: Award },
    { label: "Active Mentors", value: "500+", icon: Users },
    { label: "Resources Shared", value: "10k+", icon: BookOpen },
    { label: "Growth Rate", value: "45%", icon: TrendingUp }
  ];

  return (
    <section id="showcase" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(142_76%_36%/0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Student <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover amazing final year projects, curated resources, and academic achievements 
            from our thriving university community.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="feature-card text-center p-6 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Featured FYP Projects</h3>
            <Button variant="outline" className="btn-hero-outline">
              View All Projects
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={project.title} className="feature-card overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="aspect-video bg-gradient-card" />
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{project.rating}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    {project.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Student:</span>
                      <span className="font-medium">{project.student}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Mentor:</span>
                      <span className="font-medium">{project.mentor}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium text-success">{project.completion}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Resources */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Popular Resources</h3>
            <Button variant="outline" className="btn-hero-outline">
              Browse Library
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={resource.title} className="feature-card p-6 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {resource.type}
                  </Badge>
                </div>

                <h4 className="font-semibold mb-2 text-foreground">
                  {resource.title}
                </h4>
                
                <p className="text-sm text-muted-foreground mb-4">
                  by {resource.author}
                </p>

                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{resource.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {resource.downloads} downloads
                  </span>
                </div>

                <Badge className="w-fit" variant="secondary">
                  {resource.category}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};