import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap, Plus, Trash2, Edit, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FYPTitleSuggestionService from "../../../services/AdminServices/FYPService"
type ProjectType = {
  id: string;
  title: string;
  domain?: string | null;
  description?: string;
  // any other fields from your DTO
};

type DomainType = {
  id: number;
  name: string;
  projectCount: number;
};
export default function FYPDomainPage() {
  const { toast } = useToast();
  const [domains, setDomains] = useState<DomainType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [newProject, setNewProject] = useState<{ domainId: string; title: string; description: string }>({
    domainId: "",
    title: "",
    description: "",
  });
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);

  // Load data on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await FYPTitleSuggestionService.getFYPTitleSuggestions();
      // Here data is expected as an array of your DTOs
      setProjects(data);

      // derive domains from project domains
      const domainNames = Array.from(new Set(data.map((p: any) => p.domain).filter((d) => !!d)));
      const doms: DomainType[] = domainNames.map((dName, idx) => ({
        id: idx + 1,
        name: dName || "",
        projectCount: data.filter((p: any) => p.domain === dName).length,
      }));
      setDomains(doms);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to load FYP title suggestions", variant: "destructive" });
    }
  };

  const handleAddProject = async () => {
    if (!newProject.domainId || !newProject.title.trim() || !newProject.description.trim()) {
      toast({ title: "Error", description: "All fields required", variant: "destructive" });
      return;
    }
    // find domain name by id
    const domain = domains.find((d) => d.id.toString() === newProject.domainId)?.name;
    try {
      await FYPTitleSuggestionService.createFYPTitleSuggestion({
        title: newProject.title,
        domain,
        description: newProject.description,
      });
      toast({ title: "Success", description: "Project added" });
      setIsAddProjectOpen(false);
      // reset
      setNewProject({ domainId: "", title: "", description: "" });
      // reload
      loadProjects();
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not add project", variant: "destructive" });
    }
  };

  const handleEditProject = async () => {
    if (!editingProject) return;
    if (!editingProject.title.trim() || !editingProject.description?.trim()) {
      toast({ title: "Error", description: "Title and description required", variant: "destructive" });
      return;
    }
    try {
      await FYPTitleSuggestionService.updateFYPTitleSuggestion(editingProject.id, {
        title: editingProject.title,
        domain: editingProject.domain,
        description: editingProject.description,
      });
      toast({ title: "Success", description: "Project updated" });
      setIsEditProjectOpen(false);
      setEditingProject(null);
      loadProjects();
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not update project", variant: "destructive" });
    }
  };

  const handleDeleteProject = async (proj: ProjectType) => {
    try {
      await FYPTitleSuggestionService.deleteFYPTitleSuggestionById(proj.id);
      toast({ title: "Success", description: "Project deleted" });
      loadProjects();
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not delete project", variant: "destructive" });
    }
  };

  const getProjectsByDomain = (domainName: string) => {
    return projects.filter((p) => p.domain === domainName);
  };

  // UI rendering (same structure as your original)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">FYP Domains Management</h1>
          <p className="text-muted-foreground">Manage research domains and project ideas</p>
        </div>
        <div className="flex gap-2">
          {/* Add Project Button */}
          <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogDescription>Add a project idea to a domain</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Select Domain</Label>
                  <Select
                    value={newProject.domainId}
                    onValueChange={(value) => setNewProject({ ...newProject, domainId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map((domain) => (
                        <SelectItem key={domain.id} value={domain.id.toString()}>
                          {domain.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Project Title</Label>
                  <Input
                    placeholder="Enter project title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the project objectives and scope"
                    rows={4}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddProject} className="w-full">
                  Add Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Domains</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{domains.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Projects/Domain</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {domains.length > 0 ? (projects.length / domains.length).toFixed(1) : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="domains" className="space-y-4">
        <TabsList>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="projects">All Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="domains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Domains</CardTitle>
              <CardDescription>Manage FYP research domains</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain Name</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {domains.map((domain) => (
                    <TableRow key={domain.id}>
                      <TableCell className="font-medium">{domain.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {getProjectsByDomain(domain.name).length} projects
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {/* You did “delete domain” logic before; you can replicate calling an API if needed */}
                        {/* <Button size="sm" variant="ghost" onClick={() => handleDeleteDomain(domain.id)}> */}
                        {/*  <Trash2 className="w-4 h-4 text-destructive" /> */}
                        {/* </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>View and manage all FYP project ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Title</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.domain}</Badge>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="text-sm text-muted-foreground truncate">
                          {project.description}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingProject({ ...project });
                              setIsEditProjectOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteProject(project)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Project Dialog */}
      <Dialog open={isEditProjectOpen} onOpenChange={setIsEditProjectOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update project details</DialogDescription>
          </DialogHeader>
          {editingProject && (
            <div className="space-y-4">
              <div>
                <Label>Project Title</Label>
                <Input
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={4}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleEditProject} className="w-full">
                Update Project
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}