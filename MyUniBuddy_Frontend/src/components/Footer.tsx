import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "#features" },
        { name: "How it Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
        { name: "Success Stories", href: "#showcase" }
      ]
    },
    {
      title: "For Students",
      links: [
        { name: "Ask Questions", href: "/student/questions" },
        { name: "FYP Studio", href: "/student/fyp" },
        { name: "Assignment Help", href: "/student/assignments" },
        { name: "Resource Library", href: "/student/resources" }
      ]
    },
    {
      title: "For Educators",
      links: [
        { name: "Become a Mentor", href: "/teacher/signup" },
        { name: "Q&A Dashboard", href: "/teacher/dashboard" },
        { name: "Student Progress", href: "/teacher/progress" },
        { name: "Resource Curation", href: "/teacher/resources" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" }
      ]
    }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gradient-text">My Uni Buddy</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your complete university companion for academic excellence. 
              Ask anything, learn faster, and build stronger projects with AI assistance 
              and expert mentorship.
            </p>
            
            {/* Contact info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@myunibuddy.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 My Uni Buddy. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Privacy
              </a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Terms
              </a>
              <a href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Built with ❤️ for the academic community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};