import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, 
  Users, 
  BookOpen, 
  Award, 
  Clock, 
  Shield,
  Zap,
  Globe,
  Brain,
  Target,
  Video,
  FileText
} from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Real-time Q&A",
      description: "Get instant answers from expert teachers and professors",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Join collaborative study sessions with peers worldwide",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Access comprehensive video lessons and explanations",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: BookOpen,
      title: "Resource Library",
      description: "Vast collection of books, papers, and study materials",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Brain,
      title: "AI Learning Assistant",
      description: "Personalized learning paths powered by artificial intelligence",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Award,
      title: "Achievement System",
      description: "Track progress and earn badges for your accomplishments",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock academic assistance whenever you need it",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Safe and protected environment for all your academic needs",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Quick Solutions",
      description: "Fast and efficient problem-solving with expert guidance",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with students and educators from around the world",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set and monitor your academic objectives and milestones",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: FileText,
      title: "Study Notes",
      description: "Create, share, and access comprehensive study notes",
      gradient: "from-amber-500 to-yellow-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Academic Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover all the tools and resources you need to excel in your academic journey and achieve your learning goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <CardHeader className="pb-4 relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;