import { Search, MessageCircle, Users, CheckCircle } from "lucide-react";

const ProcessSteps = () => {
  const steps = [
    {
      icon: Search,
      title: "Ask Your Question",
      description: "Submit your academic question in any subject or field of study",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: "Get Expert Help",
      description: "Connect with qualified teachers and professors in your field",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Join Study Groups",
      description: "Collaborate with peers and share knowledge in study communities",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: CheckCircle,
      title: "Achieve Success",
      description: "Master concepts and excel in your academic journey",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four simple steps to transform your learning experience and achieve academic excellence
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-background border-4 border-border rounded-full mb-6 relative z-10">
                    <span className="text-2xl font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;