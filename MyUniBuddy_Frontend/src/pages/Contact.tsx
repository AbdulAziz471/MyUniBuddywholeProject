import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  ArrowRight,
  Globe,
  Heart,
  Headphones
} from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed help via email",
      contact: "support@myunibuddy.com",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-4567",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help through chat",
      contact: "Available 24/7",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  const offices = [
    {
      location: "San Francisco, CA",
      address: "123 Innovation Drive, Suite 100",
      phone: "+1 (555) 123-4567",
      email: "sf@myunibuddy.com"
    },
    {
      location: "London, UK",
      address: "456 Education Street, Floor 5",
      phone: "+44 20 7123 4567",
      email: "london@myunibuddy.com"
    },
    {
      location: "Toronto, CA",
      address: "789 Learning Avenue, Unit 200",
      phone: "+1 (416) 123-4567",
      email: "toronto@myunibuddy.com"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,hsl(217_91%_60%/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,hsl(142_76%_36%/0.1),transparent_50%)]" />
        
        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse delay-200" />
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl animate-pulse delay-300" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-6 py-3 text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Get In Touch
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                We're Here to{" "}
                <span className="gradient-text">Help</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                Have questions about our platform? Need technical support? 
                Want to partner with us? We'd love to hear from you.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mb-12">
                <Button className="btn-hero group text-lg px-8 py-4">
                  Start Conversation
                  <MessageCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </Button>
                <Button variant="outline" className="btn-hero-outline text-lg px-8 py-4">
                  Schedule Call
                </Button>
              </div>

              {/* Contact methods */}
              <div className="grid md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => (
                  <div key={method.title} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className={`inline-flex p-4 rounded-2xl ${method.bgColor} ${method.color} mb-4`}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                    <p className="text-sm font-medium">{method.contact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content - Contact Form */}
            <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input placeholder="John" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input placeholder="Doe" className="h-12" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="john@example.com" className="h-12" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="How can we help you?" className="h-12" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell us more about your question or feedback..." 
                    className="min-h-32 resize-none" 
                  />
                </div>
                
                <Button className="w-full btn-hero group h-12 text-lg">
                  Send Message
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Global Offices</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              With offices around the world, we're always here to support your academic journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={office.location} className="feature-card text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="bg-primary/10 text-primary p-6 rounded-2xl w-fit mx-auto mb-6">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{office.location}</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>{office.address}</p>
                  <p className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{office.phone}</span>
                  </p>
                  <p className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{office.email}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Headphones className="w-24 h-24 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>
                  <p className="text-muted-foreground text-lg">
                    We're always here when you need us, with round-the-clock support for all your academic needs.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Always <span className="gradient-text">Available</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-muted/50">
                  <Clock className="w-6 h-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">Live Chat Support</h4>
                    <p className="text-muted-foreground">Available 24/7 for immediate assistance</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-muted/50">
                  <Mail className="w-6 h-6 text-secondary" />
                  <div>
                    <h4 className="font-semibold">Email Support</h4>
                    <p className="text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-muted/50">
                  <Phone className="w-6 h-6 text-accent" />
                  <div>
                    <h4 className="font-semibold">Phone Support</h4>
                    <p className="text-muted-foreground">Mon-Fri 9AM-6PM in your timezone</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;