import { Users, Award, BookOpen, Target } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Active Students" },
  { icon: Award, value: "500+", label: "Expert Teachers" },
  { icon: BookOpen, value: "50,000+", label: "Resources Available" },
  { icon: Target, value: "95%", label: "Success Rate" },
];

const About = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">My Uni Buddy</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing education by connecting students, teachers, and resources 
            in one comprehensive platform designed for academic excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:bg-card transition-all duration-300 hover:scale-105"
            >
              <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              To create an inclusive educational ecosystem where knowledge flows freely, 
              students achieve their potential, and teachers can focus on what they do best - teaching.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Personalized learning experiences</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Expert teacher guidance</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Comprehensive resource library</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-card rounded-2xl border border-border/50 p-8 flex items-center justify-center">
              <div className="text-center">
                <Award className="w-24 h-24 text-primary mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Excellence in Education</h4>
                <p className="text-muted-foreground">
                  Recognized for innovation in educational technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;