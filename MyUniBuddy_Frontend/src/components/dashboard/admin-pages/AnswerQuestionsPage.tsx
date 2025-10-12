import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Clock, BookOpen, Send } from "lucide-react";
import QuestionService from "../../../services/AdminServices/QuestionService";
import useAuthStore from "../../../store/authStore"; // assumes you keep user in zustand
import { useToast } from "@/hooks/use-toast";

type Answer = {
  id?: string;
  body: string;
  adminId?: string;
  isOfficial?: boolean;
  createdAt?: string;
  adminName?: string;
};

type Question = {
  id: string;
  title: string;
  body: string;
  category: string;
  status: number;
  createdAt: string;
  updatedAt?: string | null;
  studentId: string;
  studentName: string;
  answers: Answer[];
};

const formatWhen = (iso: string | undefined) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const AnswerQuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [isOfficial, setIsOfficial] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();
  const user = useAuthStore((s) => s.user); // expect { id, name, role, ... }
  const adminId = user?.id ?? "";

  const pendingQuestions = useMemo(
    () => questions.filter((q) => !q.answers || q.answers.length === 0),
    [questions]
  );
  const answeredQuestions = useMemo(
    () => questions.filter((q) => q.answers && q.answers.length > 0),
    [questions]
  );

  // Fetch all questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response: Question[] = await QuestionService.getAll({});
        setQuestions(response || []);
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmitAnswer = async () => {
    if (!selectedQuestionId) return;
    const trimmed = answerText.trim();
    if (!trimmed) {
      toast({ variant: "destructive", title: "Answer is empty", description: "Please type your answer." });
      return;
    }
    if (!adminId) {
      toast({ variant: "destructive", title: "Admin not recognized", description: "Please re-login as admin." });
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // API requires: { body, adminId, isOfficial }
      await QuestionService.addAnswer(selectedQuestionId, {
        body: trimmed,
        adminId,
        isOfficial,
      });

      // Re-fetch to reflect the new answer
      const refreshed: Question[] = await QuestionService.getAll({});
      setQuestions(refreshed || []);

      // Reset UI
      setAnswerText("");
      setSelectedQuestionId(null);

      toast({ title: "Answer submitted", description: "Your response has been recorded." });
    } catch (err) {
      setError("Failed to submit your answer.");
      toast({ variant: "destructive", title: "Submit failed", description: "Could not send your answer." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Answer Questions</h1>
        <p className="text-muted-foreground mt-2">
          Help students by answering their questions and providing guidance.
        </p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">
            Pending Questions ({pendingQuestions.length})
          </TabsTrigger>
          <TabsTrigger value="answered">Answered Questions ({answeredQuestions.length})</TabsTrigger>
        </TabsList>

        {/* Pending */}
        <TabsContent value="pending" className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : pendingQuestions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending questions 🎉</p>
          ) : (
            pendingQuestions.map((q) => (
              <Card key={q.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {/* If you ever add student avatars: <AvatarImage src={q.studentAvatar} /> */}
                        <AvatarFallback>
                          {q.studentName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{q.studentName}</h3>
                          <Badge variant="outline">{q.category}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <BookOpen className="h-3 w-3" />
                          <span className="truncate max-w-[220px]" title={q.title}>
                            {q.title}
                          </span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{formatWhen(q.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {q.body}
                  </div>

                  {selectedQuestionId === q.id ? (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Type your answer here..."
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        className="min-h-[120px]"
                      />
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={isOfficial}
                            onChange={(e) => setIsOfficial(e.target.checked)}
                          />
                          Mark as official
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSubmitAnswer} disabled={submitting} className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          {submitting ? "Submitting..." : "Submit Answer"}
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedQuestionId(null)} disabled={submitting}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedQuestionId(q.id)}
                        className="flex items-center gap-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Answer Question
                      </Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Answered */}
        <TabsContent value="answered" className="space-y-4">
          {answeredQuestions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No answered questions yet.</p>
          ) : (
            answeredQuestions.map((q) => (
              <Card key={q.id} className="hover:shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {q.studentName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{q.studentName}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <BookOpen className="h-3 w-3" />
                          <span className="truncate max-w-[220px]" title={q.title}>
                            {q.title}
                          </span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{formatWhen(q.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{q.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Question:</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{q.body}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Answers ({q.answers?.length ?? 0}):</p>
                    <div className="space-y-3">
                      {(q.answers ?? []).map((a, idx) => (
                        <div key={a.id ?? idx} className="rounded-md border p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {a.adminName ? `By ${a.adminName}` : "By Admin"} • {formatWhen(a.createdAt)}
                            </span>
                            {a.isOfficial && <Badge className="h-5" variant="default">Official</Badge>}
                          </div>
                          <p className="text-sm mt-2 whitespace-pre-wrap">{a.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnswerQuestionsPage;
