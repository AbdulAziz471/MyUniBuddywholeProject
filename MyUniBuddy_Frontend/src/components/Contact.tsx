import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    content: "support@myunibuddy.com",
    description: "Send us an email anytime"
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+92 300 1234567",
    description: "Mon-Fri from 9am to 6pm"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "Lahore, Pakistan",
    description: "Educational Technology Hub"
  },
  {
    icon: Clock,
    title: "Support Hours",
    content: "24/7 Online",
    description: "We're always here to help"
  }
];

const Contact = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-muted/5 via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have questions or need support? We're here to help you succeed in your academic journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-border/50 bg-card/50 hover:bg-card transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      <p className="text-primary font-medium">{info.content}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="Your first name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Your last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="What's this about?" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Tell us how we can help you..." 
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full btn-hero">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">How do I get started?</h4>
                <p className="text-muted-foreground">Simply sign up for a free account and choose your role (student or teacher). You'll have immediate access to our platform features.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Is the platform free to use?</h4>
                <p className="text-muted-foreground">We offer a comprehensive free tier with access to basic features. Premium features are available with our subscription plans.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Can teachers create custom content?</h4>
                <p className="text-muted-foreground">Yes! Teachers can upload resources, create assignments, and manage their courses through our teacher dashboard.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How secure is my data?</h4>
                <p className="text-muted-foreground">We use industry-standard encryption and security measures to protect your personal information and academic data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;