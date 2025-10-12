import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  MessageSquare, 
  Users, 
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Play,
  BookOpen,
  Brain,
  Target,
  Award,
  Zap,
  Clock
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Sign Up & Choose Role",
      description: "Create your account and select whether you're a student, teacher, or admin. Complete your profile with academic interests and expertise.",
      features: ["Quick registration", "Role-based onboarding", "Profile customization"],
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      number: "02",
      icon: MessageSquare,
      title: "Ask Questions & Get Answers",
      description: "Post your academic questions and receive instant AI responses. Teachers can enhance answers with expert insights and personalized guidance.",
      features: ["AI-powered responses", "Expert verification", "Real-time collaboration"],
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      number: "03",
      icon: BookOpen,
      title: "Access Resources & Projects",
      description: "Discover curated learning materials, work on FYP projects with mentor guidance, and track your academic progress over time.",
      features: ["Resource library", "FYP supervision", "Progress tracking"],
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      number: "04",
      icon: GraduationCap,
      title: "Achieve Academic Excellence",
      description: "Complete your assignments, projects, and courses with confidence. Build lasting connections with mentors and fellow students.",
      features: ["Goal achievement", "Network building", "Continuous support"],
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  const roleWorkflows = [
    {
      role: "Students",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      workflow: [
        "Ask questions across any subject",
        "Get instant AI responses with sources",
        "Receive teacher guidance and feedback",
        "Access curated learning resources",
        "Work on FYP with mentor support",
        "Track academic progress"
      ]
    },
    {
      role: "Teachers",
      icon: GraduationCap,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      workflow: [
        "Monitor student Q&A activity",
        "Enhance AI responses with expertise",
        "Provide personalized mentorship",
        "Curate and share resources",
        "Supervise FYP projects",
        "Track student progress"
      ]
    },
    {
      role: "Admins",
      icon: Target,
      color: "text-accent",
      bgColor: "bg-accent/10",
      workflow: [
        "Manage user accounts and roles",
        "Monitor platform activity",
        "Moderate content quality",
        "Analyze usage analytics",
        "Configure system settings",
        "Oversee academic programs"
      ]
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Instant Support",
      description: "Get help immediately, 24/7"
    },
    {
      icon: Brain,
      title: "AI-Enhanced Learning",
      description: "Smart assistance for better understanding"
    },
    {
      icon: Clock,
      title: "Time Efficient",
      description: "Streamlined academic workflows"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "95% student satisfaction rate"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(217_91%_60%/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(142_76%_36%/0.1),transparent_50%)]" />
        
        {/* Floating elements */}
        <div className="absolute top-24 left-12 w-28 h-28 bg-secondary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-24 right-12 w-36 h-36 bg-primary/20 rounded-full blur-xl animate-pulse delay-200" />
        <div className="absolute top-1/2 right-24 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse delay-300" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-secondary/20 text-secondary border-secondary/30 px-6 py-3 text-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            How It Works
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            Your Path to{" "}
            <span className="gradient-text">Academic Success</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover how My Uni Buddy transforms your learning experience through 
            AI-powered assistance, expert mentorship, and collaborative learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button className="btn-hero group text-lg px-8 py-4">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outline" className="btn-hero-outline text-lg px-8 py-4">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Quick benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-3">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1 text-sm">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple <span className="gradient-text">4-Step Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From registration to academic excellence, here's how our platform guides your journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {steps.map((step, index) => (
              <div key={step.number} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className={`${step.bgColor} ${step.color} p-4 rounded-2xl mb-2`}>
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-muted-foreground">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Workflows */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tailored for <span className="gradient-text">Every Role</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're a student, teacher, or admin, we've designed specific workflows for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roleWorkflows.map((workflow, index) => (
              <div key={workflow.role} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`${workflow.bgColor} ${workflow.color} p-6 rounded-2xl w-fit mb-6`}>
                  <workflow.icon className="h-10 w-10" />
                </div>
                
                <h3 className="text-2xl font-semibold mb-6">{workflow.role}</h3>
                
                <div className="space-y-3">
                  {workflow.workflow.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your{" "}
            <span className="gradient-text">Academic Journey?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join thousands of students and educators who are already experiencing the future of education.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="btn-hero group text-lg px-12 py-4">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outline" className="btn-hero-outline text-lg px-12 py-4">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;