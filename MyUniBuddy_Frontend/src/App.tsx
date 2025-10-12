import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/Dashboard";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import { StudentDashboard } from "./components/dashboard/StudentDashboard";
import { TeacherDashboard } from "./components/dashboard/TeacherDashboard";
import { UsersPage } from "./components/dashboard/admin-pages/UsersPage";
import { RolesPage } from "./components/dashboard/admin-pages/RolesPage";
import { PagesPage } from "./components/dashboard/admin-pages/PagesPage";
import { PermissionsPage } from "./components/dashboard/admin-pages/PermissionsPage";
import { BooksManagementPage } from "./components/dashboard/admin-pages/BooksManagementPage";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import { BooksPage } from "./components/dashboard/student-pages/BooksPage";
import { AskQuestionPage } from "./components/dashboard/student-pages/AskQuestionPage";
import { QAMonitoringPage } from "./components/dashboard/admin-pages/QAMonitoringPage";
import { FYPProjectsPage } from "./components/dashboard/admin-pages/FYPProjectsPage";
import ScheduleMeetingPage from "./components/dashboard/student-pages/ScheduleMeetingPage";
import MeetingRequestsPage from "./components/dashboard/admin-pages/meetingRequests";
import  FYPDomainPage from "./components/dashboard/admin-pages/FYPDomainPage";
import { FYPDomainStudioPage } from "./components/dashboard/student-pages/FYPDomainStudioPage";
import AnswerQuestionsPage from "./components/dashboard/admin-pages/AnswerQuestionsPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin" element={<DashboardLayout role="Admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="roles" element={<RolesPage />} />
            <Route path="permissions" element={<PermissionsPage />} />
            <Route path="pages" element={<PagesPage />} />
            <Route path="books-management" element={<BooksManagementPage />} />
            <Route path="qa-monitoring" element={<QAMonitoringPage />} />
              <Route path="qa-as" element={<AnswerQuestionsPage />} />
            <Route path="fyp-domains" element={<FYPDomainPage />} />
              <Route path="meetingRequests" element={<MeetingRequestsPage />} />
          </Route>
        </Route>

        {/* Student */}
        <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
          <Route path="/student" element={<DashboardLayout role="Student" />}>
            <Route path="books" element={<BooksPage />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="fypDomainStudio" element={<FYPDomainStudioPage />} />
             <Route path="ask-question" element={<AskQuestionPage />} />
            <Route path="sceduleMeeting" element={<ScheduleMeetingPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["Teacher"]} />}>
          <Route path="/teacher" element={<DashboardLayout role="teacher" />}>
            <Route path="dashboard" element={<TeacherDashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
