import { useEffect, useMemo, useState } from "react";
import { Calendar, Clock, MessageSquare, CheckCircle2, XCircle, Link as LinkIcon, User, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingRequestService from "@/services/AdminServices/MeetingRequest";

// ---- Types that match your UI (unchanged UI expects these) ----
type UiStatus = "pending" | "approved" | "rejected";

interface MeetingRequestUI {
  id: string;               // GUID from API
  studentName: string;      // fallback to studentId if name isn't provided by API
  studentId: string;
  date: string;             // "YYYY-MM-DD"
  time: string;             // "HH:mm" (or "HH:mm:ss" shown as-is)
  topic: string;
  description: string;
  status: UiStatus;
  meetingLink?: string | null;
  adminNote?: string | null;
  submittedAt?: string | null;
}

// ---- Types that match your API payload ----
interface MeetingRequestDTO {
  id: string;
  studentId: string;
  requestedDate: string;   // e.g. "2025-10-16T00:00:00"
  requestedTime: string;   // "14:11:00"
  topic: string;
  description: string;
  status: 0 | 1 | 2;       // 0=Pending, 1=Approved, 2=Rejected
  adminNote: string | null;
  meetLink: string | null;
  submittedAt?: string | null; // if your API has it
  studentName?: string | null; // if your API provides it
}

// ---- Helpers ----
const mapStatusToUi = (s: 0 | 1 | 2): UiStatus => (s === 1 ? "approved" : s === 2 ? "rejected" : "pending");

const toUiModel = (dto: MeetingRequestDTO): MeetingRequestUI => {
  // Convert requestedDate (ISO) -> "yyyy-MM-dd" for consistent rendering with your current UI
  const d = new Date(dto.requestedDate);
  // Guard against invalid dates (in case backend sends date-only)
  const yyyy = String(d.getFullYear()).padStart(4, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const dateOnly = `${yyyy}-${mm}-${dd}`;

  return {
    id: dto.id,
    studentId: dto.studentId,
    studentName: dto.studentName || dto.studentId, // fallback if API doesn't return name
    date: dateOnly,
    time: dto.requestedTime, // your UI prints as-is
    topic: dto.topic,
    description: dto.description,
    status: mapStatusToUi(dto.status),
    meetingLink: dto.meetLink,
    adminNote: dto.adminNote,
    submittedAt: dto.submittedAt ?? null,
  };
};

// Reuse your existing color/icon helpers (unchanged)
const getStatusColor = (status: UiStatus) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "";
  }
};

const getStatusIcon = (status: UiStatus) => {
  switch (status) {
    case "approved":
      return <CheckCircle2 className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "rejected":
      return <XCircle className="w-4 h-4" />;
    default:
      return null;
  }
};

export default function MeetingRequestsPage() {
  const { toast } = useToast();

  // data
  const [requests, setRequests] = useState<MeetingRequestUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // dialog-local state (meetingLink/adminNote are per-selected item)
  const [selectedRequest, setSelectedRequest] = useState<MeetingRequestUI | null>(null);
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [adminNote, setAdminNote] = useState<string>("");

  // search
  const [searchQuery, setSearchQuery] = useState<string>("");

  // ---- fetch on mount ----
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // You likely want something like: MeetingRequestService.getAll()
        const dtos: MeetingRequestDTO[] = await MeetingRequestService.getAll();
        setRequests(dtos.map(toUiModel));
      } catch (e) {
        console.error(e);
        toast({ title: "Error", description: "Failed to load meeting requests", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, [toast]);

  // ---- actions ----
  const handleApprove = async (requestId: string) => {
    if (!meetingLink) {
      toast({ title: "Error", description: "Please provide a Google Meet link", variant: "destructive" });
      return;
    }
    try {
      // call your API (adjust method/signature to your backend)
      await MeetingRequestService.approve(requestId, { meetLink: meetingLink });

      // optimistic UI update
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: "approved", meetingLink } : r))
      );

      setMeetingLink("");
      setAdminNote("");
      setSelectedRequest(null);

      toast({ title: "Success", description: "Meeting request approved and link sent to student" });
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Failed to approve request", variant: "destructive" });
    }
  };

 const handleReject = async (requestId: string) => {
  const note = adminNote.trim();
  if (!note) {
    toast({ title: "Error", description: "Please provide a reason for rejection", variant: "destructive" });
    return;
  }
  try {
    await MeetingRequestService.reject(requestId, note); // <-- pass raw string
    setRequests(prev => prev.map(r => (r.id === requestId ? { ...r, status: "rejected", adminNote: note } : r)));
    setMeetingLink("");
    setAdminNote("");
    setSelectedRequest(null);
    toast({ title: "Meeting Rejected", description: "Rejection notification sent to student" });
  } catch (e: any) {
    const msg = e?.response?.data?.title || e?.message || "Failed to reject request";
    toast({ title: "Error", description: msg, variant: "destructive" });
  }
};


  // ---- filtering (unchanged UI) ----
  const filteredRequests = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return requests.filter(
      (req) =>
        req.studentName.toLowerCase().includes(q) ||
        req.studentId.toLowerCase().includes(q) ||
        req.topic.toLowerCase().includes(q)
    );
  }, [requests, searchQuery]);

  const pendingRequests = filteredRequests.filter((r) => r.status === "pending");
  const approvedRequests = filteredRequests.filter((r) => r.status === "approved");
  const rejectedRequests = filteredRequests.filter((r) => r.status === "rejected");

  // ---- render card (UI kept intact; only ids/types changed) ----
  const renderRequestCard = (request: MeetingRequestUI) => (
    <Card
      key={request.id}
      className="border-l-4"
      style={{
        borderLeftColor:
          request.status === "approved" ? "#22c55e" : request.status === "pending" ? "#eab308" : "#ef4444",
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-semibold">{request.studentName}</p>
                <p className="text-xs text-muted-foreground">{request.studentId}</p>
              </div>
            </div>
            <CardTitle className="text-base">{request.topic}</CardTitle>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {format(new Date(request.date), "PPP")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {request.time}
              </span>
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(request.status)}>
            <span className="flex items-center gap-1">
              {getStatusIcon(request.status)}
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium mb-1">Discussion Topic:</p>
          <p className="text-sm text-muted-foreground">{request.description}</p>
        </div>

        {request.status === "approved" && request.meetingLink && (
          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">Meeting Link:</p>
            <a
              href={request.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 dark:text-green-300 hover:underline break-all"
            >
              {request.meetingLink}
            </a>
          </div>
        )}

        {request.status === "rejected" && request.adminNote && (
          <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-1">Rejection Note:</p>
            <p className="text-sm text-red-800 dark:text-red-200">{request.adminNote}</p>
          </div>
        )}

        {request.status === "pending" && (
          <Dialog
            onOpenChange={(open) => {
              if (!open) {
                // clear dialog-local inputs when closing
                setMeetingLink("");
                setAdminNote("");
                setSelectedRequest(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="w-full"
                onClick={() => {
                  setSelectedRequest(request);
                  // Prefill fields if there is existing data
                  setMeetingLink(request.meetingLink ?? "");
                  setAdminNote(request.adminNote ?? "");
                }}
              >
                Review Request
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Review Meeting Request</DialogTitle>
                <DialogDescription>Approve or reject the meeting request from {request.studentName}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Student</p>
                    <p className="text-sm text-muted-foreground">{request.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Student ID</p>
                    <p className="text-sm text-muted-foreground">{request.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(request.date), "PPP")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">{request.time}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Topic</p>
                  <p className="text-sm text-muted-foreground">{request.topic}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Description</p>
                  <p className="text-sm text-muted-foreground">{request.description}</p>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="meetingLink">Google Meet Link (for approval)</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="meetingLink"
                        placeholder="https://meet.google.com/..."
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminNote">Note (for rejection)</Label>
                    <Textarea
                      id="adminNote"
                      placeholder="Provide a reason for rejection..."
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => handleApprove(request.id)} className="flex-1">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve &amp; Send Link
                    </Button>
                    <Button onClick={() => handleReject(request.id)} variant="destructive" className="flex-1">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Meeting Requests</h1>
          <p className="text-muted-foreground">Review and manage student meeting requests</p>
        </div>
        <div className="flex gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{pendingRequests.length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{approvedRequests.length}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by student name, ID, or topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedRequests.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedRequests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {loading ? (
            <Card><CardContent className="py-12 text-center">Loading…</CardContent></Card>
          ) : pendingRequests.length > 0 ? (
            pendingRequests.map(renderRequestCard)
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No pending requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {loading ? (
            <Card><CardContent className="py-12 text-center">Loading…</CardContent></Card>
          ) : approvedRequests.length > 0 ? (
            approvedRequests.map(renderRequestCard)
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No approved requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {loading ? (
            <Card><CardContent className="py-12 text-center">Loading…</CardContent></Card>
          ) : rejectedRequests.length > 0 ? (
            rejectedRequests.map(renderRequestCard)
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No rejected requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}