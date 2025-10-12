import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Lightbulb, ChevronRight, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FYPTitleSuggestionService from "../../../services/AdminServices/FYPService"
const DOMAINS = [
  {
    id: 1,
    name: "Sustainable & Green Process Engineering",
    icon: "🌱",
    color: "bg-green-500/10 text-green-700 border-green-200",
  },
  {
    id: 2,
    name: "Waste-to-Energy & Circular Economy",
    icon: "♻️",
    color: "bg-blue-500/10 text-blue-700 border-blue-200",
  },
  {
    id: 3,
    name: "Environmental Engineering",
    icon: "🌍",
    color: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  {
    id: 4,
    name: "Process Simulation, AI & Digitalization",
    icon: "🤖",
    color: "bg-purple-500/10 text-purple-700 border-purple-200",
  },
  {
    id: 5,
    name: "Renewable Energy & Hydrogen Economy",
    icon: "⚡",
    color: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
  },
];

type FYPDto = {
  id: string;
  title: string;
  domain?: string | null;
  description?: string | null;
  // plus any other fields from your DTO
};
export const FYPDomainStudioPage = () => {
  const { toast } = useToast();

  const [domains, setDomains] = useState<typeof DOMAINS>(DOMAINS);
  const [projectsByDomain, setProjectsByDomain] = useState<
    Record<string, FYPDto[]>
  >({});
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<FYPDto | null>(null);
  const [selectedDomainId, setSelectedDomainId] = useState<number | null>(null);
  
  const [activeTab, setActiveTab] = useState<"browse" | "all-projects">(
    "browse"
  );

  useEffect(() => {
    loadAllProjects();
  }, []);

  const loadAllProjects = async () => {
    try {
      const all = await FYPTitleSuggestionService.getFYPTitleSuggestions();
      // all is array of FYPDto
      // Group by domain name
      const grouped: Record<string, FYPDto[]> = {};
      for (const p of all) {
        const dom = p.domain || "Unknown Domain";
        if (!grouped[dom]) grouped[dom] = [];
        grouped[dom].push(p);
      }
      setProjectsByDomain(grouped);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to load FYP titles",
        variant: "destructive",
      });
    }
  };

  const handleDomainClick = (domainId: number) => {
    setSelectedDomainId(domainId);
  };
  const handleProjectClick = (project: FYPDto) => {
    setSelectedProject(project);
    setIsProjectDialogOpen(true);
  };

  const getProjectCount = (domainName: string) => {
    return projectsByDomain[domainName]?.length || 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">FYP Domains</h1>
          <p className="text-muted-foreground">
            Explore research domains and find project ideas
          </p>
        </div>
        <Badge variant="outline" className="text-lg py-2 px-4">
          <GraduationCap className="w-5 h-5 mr-2" />
          {domains.length} Domains
        </Badge>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as any)}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="browse">Browse Domains</TabsTrigger>
          <TabsTrigger value="all-projects">All Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain) => (
              <Card
                key={domain.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleDomainClick(domain.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{domain.icon}</div>
                      <div>
                        <CardTitle className="text-lg">
                          {domain.name}
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge className={domain.color}>
                      {getProjectCount(domain.name)} Projects
                    </Badge>
                    <Button size="sm" variant="ghost">
                      View <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedDomainId !== null && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  {
                    domains.find((d) => d.id === selectedDomainId)
                      ?.name
                  }{" "}
                  - Projects
                </CardTitle>
                <CardDescription>Ideas in this domain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectsByDomain[
                  domains.find((d) => d.id === selectedDomainId)?.name || ""
                ]?.map((project) => (
                  <Card
                    key={project.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleProjectClick(project)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <BookOpen className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all-projects" className="space-y-4">
          {domains.map((domain) => {
            const domName = domain.name;
            const domainProjects = projectsByDomain[domName] || [];
            if (domainProjects.length === 0) return null;

            return (
              <Card key={domain.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{domain.icon}</span>
                    <div>
                      <CardTitle>{domName}</CardTitle>
                      <CardDescription>
                        {domainProjects.length} projects available
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {domainProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => handleProjectClick(project)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {project.description}
                            </p>
                          </div>
                          <Button size="sm" variant="ghost">
                            <BookOpen className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>

      <Dialog
        open={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription>
              <Badge variant="outline" className="mt-2">
                {selectedProject?.domain}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProject?.description && (
              <div>
                <h4 className="font-semibold mb-2">Project Description</h4>
                <p className="text-muted-foreground">
                  {selectedProject.description}
                </p>
              </div>
            )}
            <div className="bg-accent/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Interested in this project?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                You can use this as inspiration for your FYP or discuss with your supervisor about pursuing this topic.
              </p>
              <div className="flex gap-2">
                <Button size="sm">Save to My Ideas</Button>
                <Button size="sm" variant="outline">
                  Share with Supervisor
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};