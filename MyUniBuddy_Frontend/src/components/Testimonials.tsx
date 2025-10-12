import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Computer Science Student",
    university: "University of Technology",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 5,
    text: "My Uni Buddy has transformed my academic experience. The Q&A platform helped me understand complex algorithms, and the FYP Studio made project management so much easier!"
  },
  {
    name: "Dr. Mohammad Khan",
    role: "Associate Professor",
    university: "Engineering College",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 5,
    text: "As an educator, I appreciate how this platform facilitates meaningful interactions with students. The question-answer system allows me to help more students efficiently."
  },
  {
    name: "Ali Hassan",
    role: "Final Year Student",
    university: "Business School",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5,
    text: "The digital library is incredible! I can access all the resources I need for my research. The study groups feature also helped me connect with like-minded peers."
  },
  {
    name: "Fatima Malik",
    role: "Master's Student",
    university: "Medical College",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    text: "The AI-powered recommendations are spot-on. The platform understands my learning style and suggests exactly what I need to improve my understanding."
  },
  {
    name: "Ahmed Khan",
    role: "PhD Candidate",
    university: "Research Institute",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
    text: "The platform's collaborative tools have been invaluable for my research. The ability to share resources and get feedback from professors has accelerated my work significantly."
  },
  {
    name: "Zainab Ali",
    role: "Engineering Student",
    university: "Technical University",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    rating: 5,
    text: "I love how easy it is to schedule meetings with my supervisors. The FYP domain selection helped me find the perfect project aligned with my interests in renewable energy."
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Student <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from our community of students and educators
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-card/50 border-border/50 hover:bg-card transition-all duration-300 hover:shadow-glow h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start space-x-4 mb-6">
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-gradient-primary text-white font-bold text-lg">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-primary">{testimonial.university}</p>
                      </div>
                      <Quote className="w-6 h-6 text-primary/30 flex-shrink-0" />
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed text-sm italic flex-1">
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold">4.9/5 average rating from 10,000+ users</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;