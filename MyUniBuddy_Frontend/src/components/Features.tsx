import { 
  MessageSquare, 
  Brain, 
  BookOpen, 
  PenTool, 
  Users, 
  Shield,
  Zap,
  Clock,
  Target,
  Award,
  Search,
  FileText
} from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Ask-Anything Q&A",
      description: "Get instant AI answers to any academic question. Teachers can enhance responses and provide personalized guidance.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Brain,
      title: "AI-Powered Assistance",
      description: "Advanced AI provides structured answers with confidence scores, source citations, and learning recommendations.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: BookOpen,
      title: "FYP Studio",
      description: "Complete final year project guidance from idea discovery to submission with mentor matching and milestone tracking.",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Search,
      title: "Smart Resource Discovery",
      description: "Find the perfect books, articles, and materials with AI recommendations and teacher-curated collections.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: PenTool,
      title: "Assignment Helper",
      description: "Get outlines, research plans, and structured guidance for all your assignments with plagiarism awareness.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Users,
      title: "Teacher Collaboration",
      description: "Direct access to mentors and teachers with real-time Q&A, office hours, and personalized feedback.",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Academic help whenever you need it with instant AI responses and global teacher network coverage.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Shield,
      title: "Admin Dashboard",
      description: "Comprehensive management tools for user oversight, content moderation, and platform analytics.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Target,
      title: "Progress Tracking",
      description: "Monitor learning progress, track completed resources, and measure academic growth over time.",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(217_91%_60%/0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(142_76%_36%/0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need for{" "}
            <span className="gradient-text">Academic Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive platform that brings together AI assistance, expert mentorship, 
            and academic resources in one seamless experience.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${feature.bgColor} ${feature.color} p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature highlights */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl glass">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Instant Answers</h3>
            <p className="text-muted-foreground">Get responses in seconds, not hours</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl glass">
            <Award className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Expert Verified</h3>
            <p className="text-muted-foreground">Teacher-reviewed and enhanced content</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl glass">
            <FileText className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Complete Solution</h3>
            <p className="text-muted-foreground">From questions to final projects</p>
          </div>
        </div>
      </div>
    </section>
  );
};