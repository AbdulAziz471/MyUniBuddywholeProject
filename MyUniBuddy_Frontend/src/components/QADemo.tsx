import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ThumbsUp, 
  Clock,
  CheckCircle,
  Brain
} from "lucide-react";

export const QADemo = () => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");

  const demoQuestions = [
    {
      question: "How do I structure my machine learning FYP proposal?",
      aiResponse: "Here's a comprehensive structure for your ML FYP proposal:",
      details: [
        "1. **Problem Statement**: Define the specific ML challenge you're addressing",
        "2. **Literature Review**: Survey existing solutions and identify gaps", 
        "3. **Methodology**: Outline your ML approach (algorithms, datasets, evaluation)",
        "4. **Timeline**: Break down phases - data collection, model development, testing",
        "5. **Expected Outcomes**: Define success metrics and deliverables"
      ],
      confidence: 95,
      tags: ["FYP", "Machine Learning", "Proposal"],
      teacherNote: "Dr. Sarah Chen: Excellent structure! Consider adding a risk assessment section."
    },
    {
      question: "What are the best databases for academic research?",
      aiResponse: "Here are the top academic databases by field:",
      details: [
        "**Computer Science**: IEEE Xplore, ACM Digital Library, arXiv",
        "**Medicine**: PubMed, Cochrane Library, EMBASE",
        "**Business**: JSTOR, Business Source Premier, Google Scholar",
        "**Engineering**: ScienceDirect, Web of Science, Scopus",
        "**General**: Google Scholar, ResearchGate, Academia.edu"
      ],
      confidence: 98,
      tags: ["Research", "Databases", "Academic"],
      teacherNote: "Prof. Martinez: Don't forget your university's licensed databases!"
    }
  ];

  const currentQuestion = demoQuestions[currentDemo];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demoQuestions.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSendDemo = () => {
    if (!userInput.trim()) return;
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setUserInput("");
    }, 2000);
  };

  return (
    <section id="how-it-works" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(263_85%_60%/0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            See It In <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience how students get instant, comprehensive answers with AI assistance 
            and teacher enhancement.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Demo Interface */}
          <Card className="feature-card p-0 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-primary p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-6 w-6" />
                  <h3 className="text-lg font-semibold">My Uni Buddy - Ask Anything</h3>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  Live Demo
                </Badge>
              </div>
            </div>

            {/* Chat Area */}
            <div className="p-6 space-y-6 bg-background/50 backdrop-blur-sm min-h-[500px]">
              {/* User Question */}
              <div className="flex items-start space-x-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-primary/10 rounded-2xl rounded-tl-sm p-4">
                    <p className="text-foreground font-medium">
                      {currentQuestion.question}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Just now</span>
                  </div>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start space-x-3">
                <div className="bg-accent/20 p-2 rounded-full">
                  <Bot className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="bg-card border rounded-2xl rounded-tl-sm p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Brain className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-accent">AI Assistant</span>
                      <Badge variant="outline" className="text-xs">
                        {currentQuestion.confidence}% confident
                      </Badge>
                    </div>
                    
                    <p className="text-foreground font-medium mb-4">
                      {currentQuestion.aiResponse}
                    </p>
                    
                    <div className="space-y-2">
                      {currentQuestion.details.map((detail, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {currentQuestion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful
                    </Button>
                    <span className="text-sm text-muted-foreground">Answered in 0.3s</span>
                  </div>
                </div>
              </div>

              {/* Teacher Enhancement */}
              <div className="flex items-start space-x-3">
                <div className="bg-secondary/20 p-2 rounded-full">
                  <User className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="bg-secondary/10 border border-secondary/30 rounded-2xl rounded-tl-sm p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span className="text-sm font-medium text-secondary">Teacher Enhanced</span>
                    </div>
                    <p className="text-sm text-foreground">
                      {currentQuestion.teacherNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t pt-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask your question here..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendDemo()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendDemo}
                    disabled={isTyping}
                    className="btn-secondary"
                  >
                    {isTyping ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Demo controls */}
          <div className="flex justify-center mt-8 space-x-2">
            {demoQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDemo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentDemo === index ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};