import {
  BookOpen,
  MessageSquare,
  Target,
  Calendar1,
  Home,
  GraduationCap,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/student/dashboard", icon: Home },
  { title: "Find Books", url: "/student/sceduleMeeting", icon: BookOpen },
  { title: "Schedule", url: "/student/sceduleMeeting", icon: Calendar1 },
  { title: "FYP Studio", url: "/student/fypDomainStudio", icon: Target },
  { title: "Ask Question", url: "/student/ask-question", icon: MessageSquare },
];

export function StudentSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const isActive = (path: string) => currentPath === path;

  // Unified styles (same as Admin)
  const getNavCls = ({ isActive }: { isActive: boolean }) => {
    const base = "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors";
    const active = "bg-primary text-primary-foreground";
    const inactive = "text-muted-foreground hover:bg-accent hover:text-accent-foreground";
    return `${base} ${isActive ? active : inactive}`;
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="border-r">
        {/* Header (mirrors Admin) */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-primary" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-sm">Student Portal</h2>
              </div>
            )}
          </div>
        </div>

        {/* Flat list (functionality unchanged) */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) => getNavCls({ isActive })}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
