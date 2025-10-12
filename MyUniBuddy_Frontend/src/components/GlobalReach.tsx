import { WorldGlobeModel } from "./SplineModels";
import { Badge } from "./ui/badge";
import { Users, MapPin, Award, Zap } from "lucide-react";

const GlobalReach = () => {
  const stats = [
    { icon: Users, label: "Active Students", value: "100K+", color: "text-blue-500" },
    { icon: MapPin, label: "Countries", value: "50+", color: "text-green-500" },
    { icon: Award, label: "Certificates", value: "25K+", color: "text-purple-500" },
    { icon: Zap, label: "Success Rate", value: "98%", color: "text-orange-500" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Globe */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-xl blur-3xl"></div>
            <div className="relative z-10">
              <WorldGlobeModel />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2">
                🌍 Global Impact
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Connecting
                <span className="text-primary"> Minds </span>
                Worldwide
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join a global community of learners and educators. Our platform bridges geographical boundaries, creating opportunities for knowledge sharing across continents.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
                    <Icon className={`h-8 w-8 mb-3 ${stat.color}`} />
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 rounded-xl border bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2">🚀 Join the Revolution</h3>
              <p className="text-muted-foreground mb-4">
                Be part of the next generation of digital education. Experience learning like never before.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge>Real-time Collaboration</Badge>
                <Badge>AI-Powered Learning</Badge>
                <Badge>24/7 Support</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;