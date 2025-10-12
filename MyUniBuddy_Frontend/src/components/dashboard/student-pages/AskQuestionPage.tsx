import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import QuestionService from "../../../services/AdminServices/QuestionService";
import useAuthStore from "@/store/authStore";
import {
  MessageSquare,
  Plus,
  Search,
  Filter,
  ThumbsUp,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye
} from "lucide-react";
type AnswerDto = {
  id: string;
  body: string;
  adminId: string;
  adminName?: string;
  isOfficial?: boolean;
  createdAt?: string;
};

type QuestionDto = {
  id: string;
  title: string;
  body: string;
  category?: string | null;
  studentId: string;
  status: number;        // 0 = Pending, 1 = Answered, 2 = Closed (example)
  createdAt: string;
  updatedAt?: string | null;

  // (Optional convenience fields returned by API)
  authorName?: string;
  answersCount?: number;
  views?: number;
  upvotes?: number;
  timeAgo?: string;
  answers?: AnswerDto[];
};

const statusBadge = (status: number) => {
  const isAnswered = status === 1;
  return (
    <Badge variant={isAnswered ? "default" : "secondary"}>
      {isAnswered ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
      {isAnswered ? "answered" : "pending"}
    </Badge>
  );
};

const categoriesPreset = [
  "All",
  "Computer Science",
  "Web Development",
  "Mobile Development",
  "Database",
  "AI/ML",
  "Data Structures",
  "Software Engineering",
];

export const AskQuestionPage = () => {
  const { toast } = useToast();

  // Load questions
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const studentId = useAuthStore((state) => state.user?.id as string | undefined);
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Ask dialog
  const [askOpen, setAskOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCategory, setNewCategory] = useState<string>("");

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await QuestionService.getAll(); // GET /api/question
      setQuestions(Array.isArray(data) ? data : []);
    } catch (e) {
      setLoadError("Failed to load questions.");
      toast({
        title: "Error",
        description: "Could not fetch questions from the server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const filtered = useMemo(() => {
    return questions.filter(q => {
      const matchCategory =
        selectedCategory === "All" ||
        (q.category || "").toLowerCase() === selectedCategory.toLowerCase();
      const sq = searchQuery.trim().toLowerCase();
      const matchSearch =
        !sq ||
        q.title.toLowerCase().includes(sq) ||
        q.body.toLowerCase().includes(sq) ||
        (q.category || "").toLowerCase().includes(sq);
      return matchCategory && matchSearch;
    });
  }, [questions, selectedCategory, searchQuery]);

  const resetAskForm = () => {
    setNewTitle("");
    setNewBody("");
    setNewCategory("");
  };

  const handleAsk = async () => {
    if (!newTitle.trim() || !newBody.trim()) {
      toast({
        title: "Missing fields",
        description: "Please provide both a title and a description.",
        variant: "destructive",
      });
      return;
    }

    try {
      await QuestionService.create({
        studentId: studentId,
        title: newTitle.trim(),
        body: newBody.trim(),
        category: newCategory || null,
      });
      toast({ title: "Question posted", description: "Your question has been submitted." });
      resetAskForm();
      setAskOpen(false);
      fetchQuestions();
    } catch {
      toast({
        title: "Error",
        description: "Could not post your question.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Q&A Community</h1>
          <p className="text-muted-foreground">Ask questions and get help from peers and admins</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setAskOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Ask Question
        </Button>
      </div>

      {/* Search & Category */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search questions, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md text-sm"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categoriesPreset.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* List */}
      {loading ? (
        <Card className="p-8 text-center">Loading questions...</Card>
      ) : loadError ? (
        <Card className="p-8 text-center text-red-500">{loadError}</Card>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">No questions found.</Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((q) => (
            <Card key={q.id} className=" hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                        {q.title}
                      </h3>
                      {statusBadge(q.status)}
                    </div>

                    <p className="text-muted-foreground mb-3 line-clamp-2">{q.body}</p>
                    {/* Answers preview */}
                    {(q.answers?.length ?? 0) > 0 && (
                      <div className="mb-3 space-y-2">
                        {q.answers!.slice(0, 1).map((a) => (
                          <div key={a.id} className="rounded-md border p-3 bg-muted/30">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {a.adminName ? `Answered by ${a.adminName}` : "Answered by Admin"}
                                {a.createdAt ? ` • ${new Date(a.createdAt).toLocaleString()}` : ""}
                              </span>
                              {a.isOfficial && <Badge className="h-5">Official</Badge>}
                            </div>
                            <p className="text-sm mt-1 whitespace-pre-wrap">{a.body}</p>
                          </div>
                        ))}
                        {(q.answers!.length > 1) && (
                          <div className="text-xs text-muted-foreground">
                            + {q.answers!.length - 1} more answer{q.answers!.length - 1 > 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {(q.authorName || "User")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {q.authorName || "Student"}
                        </span>
                        {q.category && (
                          <Badge variant="outline" className="text-xs">
                            {q.category}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {q.timeAgo || new Date(q.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Ask Question Modal */}
      <Dialog open={askOpen} onOpenChange={setAskOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Ask a Question</DialogTitle>
            <DialogDescription>Provide a clear title and detailed description.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="e.g., What is the difference between BFS and DFS?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category (optional)</label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoriesPreset
                    .filter((c) => c !== "All")
                    .map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                rows={6}
                placeholder="Describe your problem in detail. Include what you've tried and any error messages."
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAsk}>Post Question</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
