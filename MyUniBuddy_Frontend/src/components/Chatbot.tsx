import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  BookOpen, 
  Calculator, 
  Beaker, 
  Code, 
  Microscope,
  Globe,
  ArrowLeft,
  Bot
} from "lucide-react";

interface Professor {
  name: string;
  department: string;
  specialization: string[];
  available: boolean;
}

interface Question {
  id: string;
  text: string;
  options: {
    label: string;
    value: string;
    nextQuestion?: string;
  }[];
}

const departments = [
  { value: "cs", label: "Computer Science", icon: Code },
  { value: "math", label: "Mathematics", icon: Calculator },
  { value: "physics", label: "Physics", icon: Beaker },
  { value: "chemistry", label: "Chemistry", icon: Microscope },
  { value: "english", label: "English Literature", icon: BookOpen },
  { value: "geography", label: "Geography", icon: Globe }
];

const professors: Professor[] = [
  { name: "Dr. Ahmed Ali", department: "cs", specialization: ["AI", "Machine Learning", "Data Science"], available: true },
  { name: "Prof. Sarah Khan", department: "cs", specialization: ["Web Development", "Software Engineering"], available: true },
  { name: "Dr. Muhammad Hassan", department: "math", specialization: ["Calculus", "Statistics", "Linear Algebra"], available: false },
  { name: "Prof. Fatima Sheikh", department: "physics", specialization: ["Quantum Physics", "Thermodynamics"], available: true },
  { name: "Dr. Omar Siddique", department: "chemistry", specialization: ["Organic Chemistry", "Biochemistry"], available: true },
  { name: "Prof. Aisha Rahman", department: "english", specialization: ["Creative Writing", "Literature Analysis"], available: true }
];

const questions: Record<string, Question> = {
  start: {
    id: "start",
    text: "Hi! I'm here to help you find the right academic support. What do you need help with?",
    options: [
      { label: "Assignment Help", value: "assignment", nextQuestion: "department" },
      { label: "FYP Guidance", value: "fyp", nextQuestion: "department" },
      { label: "General Questions", value: "general", nextQuestion: "department" },
      { label: "Book Recommendations", value: "books", nextQuestion: "department" }
    ]
  },
  department: {
    id: "department",
    text: "Which department or subject area do you need help with?",
    options: departments.map(dept => ({
      label: dept.label,
      value: dept.value,
      nextQuestion: "urgency"
    }))
  },
  urgency: {
    id: "urgency",
    text: "How urgent is your request?",
    options: [
      { label: "Very Urgent (Today)", value: "urgent", nextQuestion: "results" },
      { label: "This Week", value: "week", nextQuestion: "results" },
      { label: "This Month", value: "month", nextQuestion: "results" },
      { label: "Just Browsing", value: "browse", nextQuestion: "results" }
    ]
  }
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("start");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, answer: string, nextQuestion?: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    if (nextQuestion === "results") {
      setShowResults(true);
    } else if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const resetChat = () => {
    setCurrentQuestion("start");
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendedProfessors = () => {
    const selectedDept = answers.department;
    return professors.filter(prof => prof.department === selectedDept);
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] z-40 animate-scale-in">
          <Card className="h-full flex flex-col glass border border-border/20">
            {/* Header */}
            <div className="p-4 border-b border-border/20 bg-primary/5 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Academic Assistant</h3>
                  <p className="text-sm text-muted-foreground">Find the right help for you</p>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
              {!showResults ? (
                <div className="space-y-4">
                  {/* Bot Message */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="text-sm">{currentQuestionData?.text}</p>
                    </div>
                  </div>

                  {/* Answer Options */}
                  <div className="grid gap-2 ml-11">
                    {currentQuestionData?.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleAnswer(currentQuestion, option.value, option.nextQuestion)}
                        className="justify-start text-sm h-auto p-3 hover:bg-primary/10"
                      >
                        {currentQuestion === "department" && (
                          <span className="mr-2">
                            {departments.find(d => d.value === option.value)?.icon && 
                              React.createElement(departments.find(d => d.value === option.value)!.icon, { className: "w-4 h-4" })
                            }
                          </span>
                        )}
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Results Header */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg rounded-tl-none">
                      <p className="text-sm">Great! Based on your answers, here are the professors who can help you:</p>
                    </div>
                  </div>

                  {/* Professor Recommendations */}
                  <div className="space-y-3 ml-11">
                    {getRecommendedProfessors().map((prof, index) => (
                      <Card key={index} className="p-3 border border-border/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{prof.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {departments.find(d => d.value === prof.department)?.label}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {prof.specialization.map((spec, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Badge variant={prof.available ? "default" : "secondary"}>
                            {prof.available ? "Available" : "Busy"}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 ml-11">
                    <Button size="sm" className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Contact Professor
                    </Button>
                    <Button size="sm" variant="outline" onClick={resetChat}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border/20 bg-muted/20">
              <p className="text-xs text-muted-foreground text-center">
                Powered by AI • Available 24/7
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};