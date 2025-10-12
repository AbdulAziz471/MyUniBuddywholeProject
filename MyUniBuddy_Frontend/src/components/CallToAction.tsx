import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, BookOpen } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-primary font-semibold">Join Today</span>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Learning Journey?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students and educators who are already experiencing the future of academic collaboration and support.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-muted-foreground">Expert Support</div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-muted-foreground">Subjects Covered</div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">Free</div>
              <div className="text-muted-foreground">To Get Started</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-full border-2 hover:bg-primary/5"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Trusted by leading educational institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-lg font-semibold">University A</div>
              <div className="text-lg font-semibold">College B</div>
              <div className="text-lg font-semibold">Institute C</div>
              <div className="text-lg font-semibold">Academy D</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;