import { Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { TeacherSidebar } from "@/components/dashboard/TeacherSidebar";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { LogOut, Home } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ role }: { role: "Admin" | "Student" | "teacher" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const SidebarComponent =
    role === "Student" ? StudentSidebar : role === "teacher" ? TeacherSidebar : AdminSidebar;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-accent/5">
        <SidebarComponent />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SidebarTrigger />
                  <div>
                    <h1 className="text-2xl font-bold capitalize">{role} Panel</h1>
                    <p className="text-sm text-muted-foreground">
                      {role === "Admin"
                        ? "System administration and oversight"
                        : role === "teacher"
                        ? "Manage classes, students, and resources"
                        : "Track your academic progress"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <Button
                    onClick={handleGoHome}
                    variant="ghost"
                    className="flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
