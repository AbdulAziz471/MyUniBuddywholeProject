import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Award, 
  BookOpen,
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Globe,
  Heart
} from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "50K+", label: "Active Students" },
    { icon: GraduationCap, value: "2K+", label: "Expert Teachers" },
    { icon: BookOpen, value: "100K+", label: "Learning Resources" },
    { icon: Award, value: "95%", label: "Success Rate" }
  ];

  const values = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "Leveraging cutting-edge AI to transform how students learn and teachers teach."
    },
    {
      icon: Heart,
      title: "Student-Centered",
      description: "Every feature designed with student success and learning outcomes at the core."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connecting learners and educators across universities worldwide."
    }
  ];

  const achievements = [
    "Recognized by 500+ Universities Globally",
    "Winner of EdTech Innovation Award 2024",
    "Trusted by Leading Academic Institutions",
    "Featured in Top Education Technology Reviews"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(217_91%_60%/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(142_76%_36%/0.1),transparent_50%)]" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse delay-200" />
        <div className="absolute top-1/2 right-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl animate-pulse delay-300" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-6 py-3 text-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            About My Uni Buddy
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            Empowering <span className="gradient-text">Academic</span> Excellence
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing higher education by connecting students with AI-powered assistance 
            and expert mentorship, creating a comprehensive ecosystem for academic success.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button className="btn-hero group text-lg px-8 py-4">
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outline" className="btn-hero-outline text-lg px-8 py-4">
              Watch Our Story
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                To democratize access to quality education by bridging the gap between students and 
                expert knowledge through innovative technology and collaborative learning.
              </p>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Target className="w-24 h-24 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Academic Excellence</h3>
                  <p className="text-muted-foreground">
                    Helping students achieve their full potential through personalized guidance and support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and drive our commitment to educational excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={value.title} className="feature-card text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="bg-primary/10 text-primary p-6 rounded-2xl w-fit mx-auto mb-6">
                  <value.icon className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;