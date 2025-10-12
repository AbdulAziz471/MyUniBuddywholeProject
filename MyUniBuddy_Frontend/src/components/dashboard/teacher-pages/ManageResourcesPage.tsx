import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Plus, Edit, Trash2, Download, Eye, Upload } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Data Structures and Algorithms - Complete Guide",
    type: "PDF",
    course: "Data Structures",
    description: "Comprehensive guide covering arrays, linked lists, trees, and graphs",
    downloads: 156,
    uploadDate: "2024-01-15",
    size: "2.4 MB"
  },
  {
    id: 2,
    title: "React.js Best Practices",
    type: "Document",
    course: "Web Development", 
    description: "Essential patterns and practices for modern React development",
    downloads: 89,
    uploadDate: "2024-01-20",
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "SQL Query Optimization Tutorial",
    type: "Video",
    course: "Database Systems",
    description: "Step-by-step guide to optimizing database queries",
    downloads: 234,
    uploadDate: "2024-01-10",
    size: "45.2 MB"
  }
];

const courses = ["Data Structures", "Web Development", "Database Systems", "Machine Learning", "Software Engineering"];

export function ManageResourcesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    type: "",
    course: "",
    description: "",
    file: null as File | null
  });

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf": return "destructive";
      case "video": return "default";
      case "document": return "secondary";
      default: return "outline";
    }
  };

  const handleAddResource = () => {
    console.log("Adding resource:", newResource);
    setNewResource({ title: "", type: "", course: "", description: "", file: null });
    setIsAddDialogOpen(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewResource({ ...newResource, file });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Manage Resources</h1>
          <p className="text-muted-foreground mt-2">
            Upload and manage educational resources for your students
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Resource title"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={newResource.type} onValueChange={(value) => setNewResource({ ...newResource, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Document">Document</SelectItem>
                      <SelectItem value="Presentation">Presentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select value={newResource.course} onValueChange={(value) => setNewResource({ ...newResource, course: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the resource"
                  value={newResource.description}
                  onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddResource}>
                  Add Resource
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Resources ({resources.length})</TabsTrigger>
          <TabsTrigger value="pdf">PDFs</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{resource.title}</h3>
                          <Badge variant={getTypeColor(resource.type)}>
                            {resource.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Course: {resource.course}</span>
                          <span>Size: {resource.size}</span>
                          <span>Downloads: {resource.downloads}</span>
                          <span>Uploaded: {resource.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2 text-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Similar TabsContent for other types with filtered resources */}
        <TabsContent value="pdf">
          <div className="text-center py-8 text-muted-foreground">
            PDF resources will be shown here
          </div>
        </TabsContent>
        
        <TabsContent value="video">
          <div className="text-center py-8 text-muted-foreground">
            Video resources will be shown here
          </div>
        </TabsContent>
        
        <TabsContent value="document">
          <div className="text-center py-8 text-muted-foreground">
            Document resources will be shown here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}