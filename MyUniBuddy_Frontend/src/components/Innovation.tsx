import { TechStackModel } from "./SplineModels";
import { Button } from "./ui/button";
import { Sparkles, Rocket, Brain, Shield } from "lucide-react";

const Innovation = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Adaptive algorithms that personalize your educational journey"
    },
    {
      icon: Rocket,
      title: "Next-Gen Interface",
      description: "Immersive 3D environments for interactive learning experiences"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-card/50 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Innovation at Its Core</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Redefining
            <span className="text-primary"> Education </span>
            Through Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Step into the future of learning with our revolutionary platform that combines artificial intelligence, immersive design, and cutting-edge technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* 3D Tech Stack Model */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-3xl"></div>
            <div className="relative z-10">
              <TechStackModel />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex gap-6 p-6 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Sparkles className="h-4 w-4 mr-2" />
              Experience Innovation
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo Video
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;