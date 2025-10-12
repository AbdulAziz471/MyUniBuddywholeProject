import { ComputerModel } from "./SplineModels";
import { Button } from "./ui/button";
import { ArrowRight, Code, Database, Globe } from "lucide-react";

const TechShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-card/50">
                <Code className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Cutting-Edge Technology</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Experience the
                <span className="text-primary"> Future </span>
                of Learning
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform leverages advanced AI algorithms, cloud computing, and immersive 3D interfaces to create an unparalleled educational experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm">
                <Database className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Smart Database</h3>
                <p className="text-sm text-muted-foreground">
                  Intelligent data processing with real-time analytics
                </p>
              </div>
              <div className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm">
                <Globe className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Global Access</h3>
                <p className="text-sm text-muted-foreground">
                  Learn from anywhere in the world with cloud technology
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore Technology
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </div>
          </div>

          {/* 3D Model */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-3xl"></div>
            <div className="relative z-10">
              <ComputerModel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;