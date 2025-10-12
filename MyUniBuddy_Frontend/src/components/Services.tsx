import { BookOpen, MessageCircle, GraduationCap, Users, Brain, Calendar } from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Digital Library",
    description: "Access thousands of books, research papers, and academic resources from anywhere.",
    features: ["Online Reading", "Download Options", "Search & Filter", "Bookmarks"]
  },
  {
    icon: MessageCircle,
    title: "Q&A Platform",
    description: "Get instant help from teachers and peers through our interactive question-answer system.",
    features: ["Real-time Answers", "Expert Teachers", "Peer Support", "24/7 Availability"]
  },
  {
    icon: GraduationCap,
    title: "FYP Studio",
    description: "Complete project management system for final year projects with mentor guidance.",
    features: ["Project Tracking", "Mentor Support", "Timeline Management", "Resource Sharing"]
  },
  {
    icon: Users,
    title: "Study Groups",
    description: "Join collaborative study sessions and form groups with classmates and peers.",
    features: ["Group Creation", "Scheduled Sessions", "File Sharing", "Discussion Forums"]
  },
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Personalized learning paths and recommendations based on your progress and interests.",
    features: ["Smart Recommendations", "Progress Tracking", "Adaptive Learning", "Performance Analytics"]
  },
  {
    icon: Calendar,
    title: "Academic Calendar",
    description: "Stay organized with integrated scheduling for assignments, exams, and academic events.",
    features: ["Event Reminders", "Assignment Tracking", "Exam Schedules", "Deadline Alerts"]
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-muted/5 via-background to-muted/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive educational tools and services designed to enhance your academic journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="feature-card group hover:shadow-glow transition-all duration-500"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
              
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="btn-hero">
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;