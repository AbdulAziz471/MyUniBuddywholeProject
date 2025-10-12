import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  FileText,
  Sparkles,
  ArrowRight,
  Star,
  TrendingUp
} from "lucide-react";

const Features = () => {
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

  const highlights = [
    {
      icon: Zap,
      title: "Instant Answers",
      description: "Get responses in seconds, not hours",
      color: "text-primary"
    },
    {
      icon: Award,
      title: "Expert Verified",
      description: "Teacher-reviewed and enhanced content",
      color: "text-secondary"
    },
    {
      icon: FileText,
      title: "Complete Solution",
      description: "From questions to final projects",
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(217_91%_60%/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,hsl(142_76%_36%/0.1),transparent_50%)]" />
        
        {/* Floating elements */}
        <div className="absolute top-32 left-16 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-150" />
        <div className="absolute top-1/3 right-20 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-pulse delay-300" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-6 py-3 text-lg">
            <Star className="w-5 h-5 mr-2" />
            Powerful Features
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            Everything You Need for{" "}
            <span className="gradient-text">Academic Success</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            A comprehensive platform that brings together AI assistance, expert mentorship, 
            and academic resources in one seamless experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button className="btn-hero group text-lg px-8 py-4">
              Explore Features
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outline" className="btn-hero-outline text-lg px-8 py-4">
              See Demo
            </Button>
          </div>

          {/* Feature highlights preview */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {highlights.map((highlight, index) => (
              <div key={highlight.title} className="text-center p-6 rounded-2xl glass animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <highlight.icon className={`h-12 w-12 ${highlight.color} mx-auto mb-4`} />
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(217_91%_60%/0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(142_76%_36%/0.05),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Complete <span className="gradient-text">Feature Set</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every tool you need to excel in your academic journey, powered by cutting-edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card group animate-fade-in-up hover:scale-105 transition-all duration-300"
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
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">My Uni Buddy</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the difference that intelligent design and expert support can make in your academic journey.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Improved Academic Performance</h3>
                    <p className="text-muted-foreground">Students see an average 40% improvement in grades with our comprehensive support system.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Time-Saving Solutions</h3>
                    <p className="text-muted-foreground">Reduce research time by 60% with our AI-powered resource discovery and instant Q&A.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Network Access</h3>
                    <p className="text-muted-foreground">Connect with over 2,000 verified teachers and mentors across all academic disciplines.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-24 h-24 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">AI-Enhanced Learning</h3>
                  <p className="text-muted-foreground text-lg">
                    Experience the future of education with personalized AI assistance tailored to your learning style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;