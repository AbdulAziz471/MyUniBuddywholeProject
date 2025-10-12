// QAMonitoringPage.tsx
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle, CheckCircle, Clock, AlertTriangle, ThumbsUp, Eye, Flag } from "lucide-react";
import QuestionService, { QuestionDto } from "@/services/AdminServices/QuestionService";
import { useToast } from "@/hooks/use-toast";

export function QAMonitoringPage() {
  const { toast } = useToast();

  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all"); // kept for UI; defaulted later

  const statuses = ["Pending", "Answered", "Closed"];
 

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await QuestionService.getAll();
        setQuestions(data);
      } catch (e) {
        setError("Failed to load questions.");
        toast({
          title: "Error",
          description: "Failed to fetch questions from the server.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [toast]);

  // Small helpers to keep your original UI mapping happy
  const norm = (v: any) => (v ?? "").toString();
  const statusText = (s: QuestionDto["status"]) =>
    typeof s === "number" ? (s === 0 ? "Pending" : s === 1 ? "Answered" : "Closed") : (s || "Pending");

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const s = searchTerm.toLowerCase();
      const author = norm(q.authorName);
      const subject = norm(q.subject) || norm(q.category);
      const matchesSearch =
        norm(q.title).toLowerCase().includes(s) ||
        norm(q.body).toLowerCase().includes(s) ||
        author.toLowerCase().includes(s) ||
        subject.toLowerCase().includes(s);

      const sText = statusText(q.status);
      const matchesStatus = selectedStatus === "all" || sText === selectedStatus;

      // priority is not in backend yet — keep UI filter functional by letting all pass unless you add it later
      const matchesPriority = selectedPriority === "all" || true;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [questions, searchTerm, selectedStatus, selectedPriority]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Answered": return "bg-green-500/10 text-green-700 border-green-200";
      case "Pending": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "Closed": return "bg-gray-500/10 text-gray-700 border-gray-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Answered": return <CheckCircle className="w-4 h-4" />;
      case "Pending": return <Clock className="w-4 h-4" />;
      case "Closed": return <AlertTriangle className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const totalQuestions = questions.length;
  const pendingQuestions = questions.filter((q) => statusText(q.status) === "Pending").length;
  const answeredQuestions = questions.filter((q) => statusText(q.status) === "Answered").length;
  const avgResponseTime = "—"; // placeholder until you add metrics

  if (loading) return <div className="p-6 text-center">Loading questions…</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Q&A Monitoring</h1>
          <p className="text-muted-foreground">Monitor and moderate questions and answers platform</p>
        </div>
        <Button className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuestions}</div>
            <p className="text-xs text-muted-foreground">All time questions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingQuestions}</div>
            <p className="text-xs text-muted-foreground">Awaiting answers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Answered</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{answeredQuestions}</div>
            <p className="text-xs text-muted-foreground">Successfully answered</p>
          </CardContent>
        </Card>

      </div>

      {/* Filters + Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Questions</CardTitle>
          <CardDescription>Monitor and manage student questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions by title, content, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.map((q) => {
                  const sText = statusText(q.status);
                  const author = norm(q.authorName) || "Student";
                  const initials = author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                  const subject = norm(q.subject) || norm(q.category) || "—";
                  return (
                    <TableRow key={q.id}>
                      <TableCell>
                        <div className="max-w-md">
                          <div className="font-medium">{q.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {q.body}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{author}</div>
                            <div className="text-xs text-muted-foreground">{norm(q.department)}</div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline">{subject}</Badge>
                      </TableCell>

                      <TableCell>
                        <Badge className={getStatusColor(sText)}>
                          {getStatusIcon(sText)}
                          <span className="ml-1">{sText}</span>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {filteredQuestions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No questions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
