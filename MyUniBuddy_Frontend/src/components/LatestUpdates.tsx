import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Zap, BookOpen, Users } from "lucide-react";

const LatestUpdates = () => {
  const updates = [
    {
      category: "Feature",
      title: "AI-Powered Study Recommendations",
      description: "Get personalized study plans and resource recommendations based on your learning patterns and goals.",
      date: "2 days ago",
      icon: Zap,
      color: "bg-blue-500"
    },
    {
      category: "Enhancement",
      title: "Advanced Study Groups",
      description: "Create subject-specific study groups with video calls, shared whiteboards, and collaborative notes.",
      date: "5 days ago", 
      icon: Users,
      color: "bg-green-500"
    },
    {
      category: "Content",
      title: "New Resource Library",
      description: "Access thousands of new books, research papers, and multimedia content across all academic disciplines.",
      date: "1 week ago",
      icon: BookOpen,
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-muted/30 via-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            What's New
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Latest Updates & Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay up-to-date with the newest features and improvements to enhance your learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {updates.map((update, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {update.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {update.date}
                  </div>
                </div>
                <div className={`inline-flex items-center justify-center w-12 h-12 ${update.color} rounded-xl mb-4`}>
                  <update.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {update.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {update.description}
                </p>
                <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
                  <span className="text-primary font-medium">Learn more</span>
                  <ArrowRight className="ml-2 w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-6 text-lg font-semibold rounded-full border-2 hover:bg-primary/5"
          >
            View All Updates
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;