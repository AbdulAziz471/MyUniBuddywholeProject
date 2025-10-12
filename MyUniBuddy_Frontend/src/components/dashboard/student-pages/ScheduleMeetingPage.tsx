import { useEffect, useState } from "react";
import { Calendar, Clock, MessageSquare, Send, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import MeetingRequestService from "../../../services/AdminServices/MeetingRequest";
import useAuthStore from "@/store/authStore";
interface MeetingRequest {
  id: string;
  studentId: string;
  requestedDate: string;   // ISO datetime
  requestedTime: string;   // "HH:mm:ss"
  topic: string;
  description: string;
  status: 0 | 1 | 2;       // 0=Pending, 1=Approved, 2=Rejected
  meetLink?: string | null;
  adminNote?: string | null;
}

type StatusCode = 0 | 1 | 2;
export default function ScheduleMeetingPage() {
  const { toast } = useToast();
  const studentId = useAuthStore((state) => state.user?.id as string | undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [requests, setRequests] = useState<MeetingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const statusLabel = (s: StatusCode | string) => {
    if (typeof s === "number") {
      return s === 1 ? "Approved" : s === 2 ? "Rejected" : "Pending";
    }
    return s; // already a string label
  };
  // Load requests when component mounts or studentId changes
  useEffect(() => {
    if (studentId) fetchRequests();
  }, [studentId]);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const data = await MeetingRequestService.getByStudentId(studentId);
      // Assuming your API returns array of DTOs matching MeetingRequest shape (or close)
      setRequests(data);
    } catch (err) {
      console.error("Error loading meeting requests:", err);
      toast({ title: "Error", description: "Failed to load meeting requests", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitRequest = async () => {
    if (!studentId || !selectedDate || !selectedTime || !topic || !description) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    // Normalize time string to include seconds
    let timeStr = selectedTime;
    // If input is something like "14:00", append ":00"
    if (/^\d{1,2}:\d{2}$/.test(selectedTime)) {
      timeStr = selectedTime + ":00";
    }

    const dto = {
      studentId,
      requestedDate: format(selectedDate, "yyyy-MM-dd"),
      requestedTime: timeStr,  // e.g. "14:00:00"
      topic,
      description,
    };

    try {
      await MeetingRequestService.createRequest(dto);
      toast({
        title: "Success",
        description: "Meeting request submitted successfully!",
      });
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime("");
      setTopic("");
      setDescription("");
      // Reload
      fetchRequests();
    } catch (err) {
      console.error("Error submitting meeting request:", err);
      toast({ title: "Error", description: "Failed to submit meeting request", variant: "destructive" });
    }
  };


  const getStatusColor = (s: StatusCode | string) => {
    const label = statusLabel(s);
    switch (label) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "";
    }
  };

  const getStatusIcon = (s: StatusCode | string) => {
    const label = statusLabel(s);
    switch (label) {
      case "Approved":
        return <CheckCircle2 className="w-4 h-4" />;
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // optional: a border color helper
  const statusBorderColor = (s: StatusCode | string) => {
    const label = statusLabel(s);
    return label === "Approved" ? "#22c55e" : label === "Pending" ? "#eab308" : "#ef4444";
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Schedule Meeting</h1>
        <p className="text-muted-foreground">
          Request a meeting with administration and track your meeting requests
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Request Meeting Form */}
        <Card>
          <CardHeader>
            <CardTitle>Request New Meeting</CardTitle>
            <CardDescription>Fill in the details to schedule a meeting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Select Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Meeting Topic</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="topic"
                  placeholder="e.g., FYP Project Discussion"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">What do you want to discuss?</Label>
              <Textarea
                id="description"
                placeholder="Provide details about what you'd like to discuss in the meeting..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <Button onClick={handleSubmitRequest} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </CardContent>
        </Card>

        {/* My Meeting Requests */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Meeting Requests</CardTitle>
              <CardDescription>Track your meeting request status</CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-4">Loading …</div>
            ) : (
              requests.map((request) => {
                const label = statusLabel(request.status as any);
                return (
                  <Card
                    key={request.id}
                    className="border-l-4"
                    style={{ borderLeftColor: statusBorderColor(request.status as any) }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-base">{request.topic}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(request.requestedDate), "PPP")}
                            <Clock className="w-3 h-3 ml-2" />
                            {request.requestedTime}
                          </div>
                        </div>

                        <Badge variant="outline" className={getStatusColor(request.status as any)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(request.status as any)}
                            {label}
                          </span>
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{request.description}</p>

                      {label === "Approved" && request.meetLink && (
                        <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
                            Meeting Approved!
                          </p>
                          <Button size="sm" asChild className="w-full">
                            <a href={request.meetLink} target="_blank" rel="noopener noreferrer">
                              Join Meeting
                            </a>
                          </Button>
                        </div>
                      )}

                      {label === "Rejected" && request.adminNote && (
                        <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                          <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-1">Admin Note:</p>
                          <p className="text-sm text-red-800 dark:text-red-200">{request.adminNote}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

        </div>
      </div>
    </div>
  );
}