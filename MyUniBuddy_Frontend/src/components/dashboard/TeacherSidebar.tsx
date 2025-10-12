import { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { 
  MessageSquare, 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3, 
  FileText, 
  Settings, 
  Clock,
  GraduationCap,
  Star
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const teacherMenuItems = [
  {
    title: "Dashboard",
    url: "?role=teacher&page=dashboard",
    icon: BarChart3,
  },
  {
    title: "Answer Questions",
    url: "?role=teacher&page=answer-questions",
    icon: MessageSquare,
  },
  {
    title: "Manage Resources",
    url: "?role=teacher&page=manage-resources", 
    icon: BookOpen,
  },
  {
    title: "FYP Supervision",
    url: "?role=teacher&page=fyp-supervision",
    icon: GraduationCap,
  },
  {
    title: "Student Progress",
    url: "?role=teacher&page=student-progress",
    icon: Users,
  },
  {
    title: "Course Management",
    url: "?role=teacher&page=course-management",
    icon: FileText,
  },
  {
    title: "Office Hours",
    url: "?role=teacher&page=office-hours",
    icon: Clock,
  },
  {
    title: "Assignments",
    url: "?role=teacher&page=assignments",
    icon: Star,
  },
  {
    title: "Schedule",
    url: "?role=teacher&page=schedule",
    icon: Calendar,
  },
];

export function TeacherSidebar() {
  const { state } = useSidebar();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "dashboard";

  const isActive = (url: string) => {
    const params = new URLSearchParams(url.split("?")[1]);
    return params.get("page") === currentPage;
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            Teacher Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teacherMenuItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={`/dashboard${item.url}`}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent ${
                            active
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:text-accent-foreground"
                          }`
                        }
                      >
                        <>
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                        </>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}