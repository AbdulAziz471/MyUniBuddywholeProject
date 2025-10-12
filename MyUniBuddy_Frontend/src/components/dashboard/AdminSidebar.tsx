import { Home, Users, BookOpen, GraduationCap, MessageCircle, Calendar1Icon, GraduationCap as Grad, ShieldQuestion } from "lucide-react";
import { useSearchParams, NavLink } from "react-router-dom";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

const adminMenuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  {
    title: "Account Management",
    items: [{ title: "Users", url: "/admin/users", icon: Users }],
  },
  {
    title: "Academic Management",
    items: [
      { title: "Books & Library", url: "/admin/books-management", icon: BookOpen },
      { title: "FYP Projects", url: "/admin/fyp-domains", icon: GraduationCap },
      { title: "Q&A Monitoring", url: "/admin/qa-monitoring", icon: MessageCircle },
      { title: "Auestons & Answers", url: "/admin/qa-as", icon: ShieldQuestion },
      { title: "Meeting Requests", url: "/admin/meetingRequests", icon: Calendar1Icon },
    ],
  },
];

export function AdminSidebar() {
  const { collapsed } = useSidebar();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "dashboard";

  // Unified styles (same as Student)
  const getNavCls = ({ isActive }: { isActive: boolean }) => {
    const base = "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors";
    const active = "bg-primary text-primary-foreground";
    const inactive = "text-muted-foreground hover:bg-accent hover:text-accent-foreground";
    return `${base} ${isActive ? active : inactive}`;
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent className="border-r">
        {/* Header (mirrors Student) */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Grad className="w-4 h-4 text-primary" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-sm">Admin Portal</h2>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            {/* Top-level Dashboard link (unchanged functionality) */}
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={adminMenuItems[0].url}
                    className={({ isActive }) => getNavCls({ isActive })}
                  >
                    <Home className="w-4 h-4" />
                    {!collapsed && <span>{adminMenuItems[0].title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Accordion sections (unchanged functionality) */}
        <ScrollArea className="flex-1 px-2">
          {!collapsed ? (
            <Accordion
              type="multiple"
              defaultValue={["Account Management", "Academic Management"]}
              className="w-full space-y-2"
            >
              {adminMenuItems.slice(1).map((section, index) => (
                <AccordionItem
                  key={index}
                  value={section.title}
                  className="border border-border/30 rounded-lg bg-card/30"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50 rounded-lg">
                    <span className="text-sm font-medium text-foreground">{section.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <SidebarMenu className="space-y-1">
                      {section.items?.map((item, itemIndex) => (
                        <SidebarMenuItem key={itemIndex}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              className={({ isActive }) => getNavCls({ isActive })}
                            >
                              <item.icon className="w-4 h-4" />
                              {!collapsed && <span>{item.title}</span>}
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            // Collapsed: icon-only items (unchanged)
            <div className="space-y-2">
              {adminMenuItems.map((section, index) => (
                <div key={index} className="space-y-1">
                  {section.items?.map((item, itemIndex) => (
                    <SidebarMenuItem key={itemIndex}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) => getNavCls({ isActive })}
                        >
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
