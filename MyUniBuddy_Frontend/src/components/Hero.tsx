import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Brain, 
  BookOpen, 
  Users, 
  GraduationCap, 
  Settings,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const roleContent = [
    {
      role: "student",
      title: "Ask anything, anytime.",
      subtitle: "From assignments to FYPs—get AI answers and mentor guidance in one place.",
      features: ["AI-Powered Q&A", "FYP Guidance", "Assignment Help", "Resource Discovery"],
      cta: "Get Help Now",
      icon: Users,
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      role: "teacher",
      title: "Mentor the next generation.",
      subtitle: "Guide students, share knowledge, and build academic excellence together.",
      features: ["Student Q&A Queue", "FYP Mentorship", "Resource Curation", "Progress Tracking"],
      cta: "Become a Mentor",
      icon: GraduationCap,
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      role: "admin",
      title: "Manage academic excellence.",
      subtitle: "Oversee the platform, moderate content, and drive educational success.",
      features: ["User Management", "Content Moderation", "Analytics Dashboard", "System Config"],
      cta: "Admin Access",
      icon: Settings,
      gradient: "from-orange-500/20 to-red-500/20"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % roleContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + roleContent.length) % roleContent.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentContent = roleContent[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(217_91%_60%/0.1),transparent_70%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl float delay-200" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-secondary/20 rounded-full blur-xl float delay-300" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Slider Controls */}
        <div className="flex justify-center items-center mb-8 animate-fade-in-up">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full glass hover:bg-primary/10 transition-all duration-300 mr-4"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${currentContent.gradient} border border-border/20`}>
              <currentContent.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold capitalize">{currentContent.role}</h3>
              <div className="flex space-x-1 mt-2">
                {roleContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-primary w-6" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={nextSlide}
            className="p-3 rounded-full glass hover:bg-primary/10 transition-all duration-300 ml-4"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="animate-fade-in-up delay-200">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Your Complete University Companion
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {currentContent.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {currentContent.features.map((feature, index) => (
              <Badge 
                key={feature}
                variant="outline" 
                className="px-4 py-2 text-sm border-border/50 hover:border-primary/50 transition-colors duration-300"
              >
                {feature}
              </Badge>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="btn-hero group">
              {currentContent.cta}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outline" className="btn-hero-outline">
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">Trusted by students and educators worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-sm font-medium">500+ Universities</div>
              <div className="text-sm font-medium">50k+ Students</div>
              <div className="text-sm font-medium">2k+ Teachers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};