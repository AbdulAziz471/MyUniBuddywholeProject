import { useState, useEffect, useCallback } from "react";
import { FileText, Plus, Edit, Trash2, Search, Loader2, AlertTriangle, Globe, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import PageService from '../../../services/AdminServices/PageService';
import PermissionService from '../../../services/AdminServices/PermissionService';
import PagePermissionService from '../../../services/AdminServices/PagePermission';

export function PagesPage() {
  const [pages, setPages] = useState([]);
  const [filteredPages, setFilteredPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState(new Set());
  const [allPermissions, setAllPermissions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoadingPages, setIsLoadingPages] = useState(true);
  const [isLoadingPermissions, setIsLoadingPermissions] = useState(false);
  const [isSavingPage, setIsSavingPage] = useState(false);
  const [isSavingPagePermissions, setIsSavingPagePermissions] = useState(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [pageToDeleteId, setPageToDeleteId] = useState(null);
  const [pageToDeleteTitle, setPageToDeleteTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    key: '',
    pageUrl: null,
    description: '',
    visibility: 'Private',
    preferenceOrder: '',
  });

  useEffect(() => {
    const initializeData = async () => {
      setIsLoadingPages(true);
      try {
        await fetchPages();
        const permissionsData = await PermissionService.getPermissions();
        setAllPermissions(permissionsData);
      } catch (error) {
        console.error("Initialization error:", error);
        toast({
          title: "Error",
          description: "Failed to load initial data.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingPages(false);
      }
    };
    initializeData();
  }, []);

  const fetchPages = async () => {
    try {
      const data = await PageService.getPages();
      setPages(data);
      setFilteredPages(data);
    } catch (error) {
      console.error("Error fetching pages:", error);
      toast({
        title: "Error",
        description: "Failed to fetch pages.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const query = searchTerm.toLowerCase();
    const filtered = pages.filter(page =>
      (page.title && page.title.toLowerCase().includes(query)) ||
      (page.pageUrl && page.pageUrl.toLowerCase().includes(query)) ||
      (page.description && page.description.toLowerCase().includes(query))
    );
    setFilteredPages(filtered);
    setCurrentPage(1);
  }, [pages, searchTerm]);

  const handleAddPage = () => {
    setEditMode(false);
    setFormData({
      id: '',
      title: '',
      key: '',
      pageUrl: null,
      description: '',
      visibility: 'Private',
      preferenceOrder: '',
    });
    setDialogOpen(true);
  };

  const handleEditPage = (page) => {
    setEditMode(true);
    setFormData({
      id: page.id,
      title: page.title || '',
      key: page.key || generateKeyFromTitle(page.title || ''),
      pageUrl: page.pageUrl,
      description: page.description || '',
      visibility: page.visibility || 'Private',
      preferenceOrder: page.preferenceOrder !== null ? String(page.preferenceOrder) : '',
    });
    setDialogOpen(true);
  };

  const handleSavePage = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and Description are required.",
        variant: "destructive",
      });
      return;
    }

    if (formData.preferenceOrder === '' || isNaN(Number(formData.preferenceOrder))) {
      toast({
        title: "Validation Error",
        description: "Preference Order must be a valid number.",
        variant: "destructive",
      });
      return;
    }

    setIsSavingPage(true);
    try {
      const payload = {
        ...formData,
        preferenceOrder: Number(formData.preferenceOrder),
        key: generateKeyFromTitle(formData.title),
      };

      if (editMode) {
        await PageService.updatePage(formData.id, payload);
        toast({
          title: "Page Updated",
          description: "Page has been updated successfully.",
        });
      } else {
        await PageService.createPage(payload);
        toast({
          title: "Page Created",
          description: "New page has been created successfully.",
        });
      }
      setDialogOpen(false);
      fetchPages();
    } catch (error) {
      console.error("Error saving page:", error);
      toast({
        title: "Error",
        description: `Failed to save page: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsSavingPage(false);
    }
  };

  const openDeleteConfirmDialog = (id, title) => {
    setPageToDeleteId(id);
    setPageToDeleteTitle(title);
    setDeleteConfirmDialogOpen(true);
  };

  const confirmDeletePage = async () => {
    setDeleteConfirmDialogOpen(false);
    if (!pageToDeleteId) return;

    try {
      await PageService.DeletePage(pageToDeleteId);
      toast({
        title: "Page Deleted",
        description: `Page "${pageToDeleteTitle}" has been removed successfully.`,
      });
      fetchPages();
      if (selectedPageId === pageToDeleteId) {
        setSelectedPageId(null);
        setSelectedPermissions(new Set());
      }
      setPageToDeleteId(null);
      setPageToDeleteTitle('');
    } catch (error) {
      console.error("Error deleting page:", error);
      toast({
        title: "Error",
        description: `Failed to delete page "${pageToDeleteTitle}": ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const onPageClick = useCallback(async (page) => {
    setSelectedPageId(page.id);
    setIsLoadingPermissions(true);
    try {
      const data = await PagePermissionService.getPagePermissionById(page.id);
      const permissionsSet = new Set(data.map((perm) => perm.permissionId));
      setSelectedPermissions(permissionsSet);
      toast({
        title: "Page Selected",
        description: `Permissions for page "${page.title}" loaded.`,
      });
    } catch (error) {
      console.error("Error fetching page permissions:", error);
      toast({
        title: "Error",
        description: "Failed to load permissions for the selected page.",
        variant: "destructive",
      });
      setSelectedPermissions(new Set());
    } finally {
      setIsLoadingPermissions(false);
    }
  }, []);

  const togglePermission = (permissionId) => {
    if (!selectedPageId) {
      toast({
        title: "Warning",
        description: "Please select a page first to assign permissions.",
        
      });
      return;
    }
    const newPermissions = new Set(selectedPermissions);
    if (newPermissions.has(permissionId)) {
      newPermissions.delete(permissionId);
    } else {
      newPermissions.add(permissionId);
    }
    setSelectedPermissions(newPermissions);
  };

  const updatePermissions = async () => {
    if (!selectedPageId) {
      toast({
        title: "Warning",
        description: "No page selected to save permissions.",
        
      });
      return;
    }

    setIsSavingPagePermissions(true);
    const permissionIdsArray = Array.from(selectedPermissions);
    const payload = {
      pageId: selectedPageId,
      permissionIds: permissionIdsArray,
    };

    try {
      await PagePermissionService.UpdatePagePermissionById(payload);
      toast({
        title: "Success",
        description: "Permissions updated successfully.",
      });
    } catch (error) {
      console.error("Error updating permissions:", error);
      toast({
        title: "Error",
        description: `Failed to update permissions: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsSavingPagePermissions(false);
    }
  };

  const generateKeyFromTitle = (title) => {
    return title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    return visibility === "Public" ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Page Management</h1>
          <p className="text-muted-foreground">Manage system pages and their access controls</p>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleAddPage} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Page
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add Page</TooltipContent>
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Pages</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[60vh] overflow-y-auto">
            <div className="relative flex-1 max-w-sm mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {isLoadingPages ? (
              <div className="text-center py-8 text-muted-foreground flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading pages...
              </div>
            ) : filteredPages.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((page) => (
                      <TableRow
                        key={page.id}
                        className={`cursor-pointer ${selectedPageId === page.id ? "bg-accent" : ""}`}
                        onClick={() => onPageClick(page)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{page.title}</p>
                              <p className="text-sm text-muted-foreground">{page.pageUrl || 'N/A'}</p>
                              <p className="text-xs text-muted-foreground">{page.description}</p>
                            </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(page.status)}>
                              {page.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getVisibilityIcon(page.visibility)}
                              <span className="text-sm">{page.visibility}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => { e.stopPropagation(); handleEditPage(page); }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit Page</TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive"
                                    onClick={(e) => { e.stopPropagation(); openDeleteConfirmDialog(page.id, page.title); }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Delete Page</TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2"
                      >
                        Previous
                      </Button>
                      <span className="flex items-center">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-2"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No pages found.</div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Permissions for Page</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[60vh] overflow-y-auto space-y-4">
              <Button
                size="sm"
                onClick={updatePermissions}
                disabled={!selectedPageId || isSavingPagePermissions}
                className="w-full"
              >
                {isSavingPagePermissions ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Page Permissions"}
              </Button>
              {isLoadingPermissions ? (
                <div className="text-center py-8 text-muted-foreground flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading permissions...
                </div>
              ) : (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-2 pl-6 border-l border-gray-200">
                    {allPermissions.length > 0 ? (
                      allPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`perm-${permission.id}`}
                            checked={selectedPermissions.has(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                            disabled={!selectedPageId}
                          />
                          <Label htmlFor={`perm-${permission.id}`} className="flex-1 cursor-pointer">
                            <span className="font-medium">{permission.title}</span>
                          </Label>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">No permissions available.</div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editMode ? 'Edit Page' : 'Add New Page'}</DialogTitle>
              <DialogDescription>{editMode ? 'Edit the details of the page.' : 'Fill in the details for a new page.'}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., User Dashboard"
                  />
                </div>
                <div>
                  <Label htmlFor="pageUrl">URL Slug</Label>
                  <Input
                    id="pageUrl"
                    value={formData.pageUrl}
                    onChange={(e) => setFormData({ ...formData, pageUrl: e.target.value })}
                    placeholder="e.g., /dashboard"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the purpose of this page"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={formData.visibility}
                    onValueChange={(value) => setFormData({ ...formData, visibility: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferenceOrder">Preference Order</Label>
                  <Input
                    id="preferenceOrder"
                    type="number"
                    value={formData.preferenceOrder}
                    onChange={(e) => setFormData({ ...formData, preferenceOrder: e.target.value })}
                    placeholder="e.g., 1, 2, 3"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePage} disabled={isSavingPage}>
                {isSavingPage ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (editMode ? 'Update Page' : 'Create Page')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteConfirmDialogOpen} onOpenChange={setDeleteConfirmDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" /> Confirm Deletion
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the page "<strong>{pageToDeleteTitle}</strong>"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDeleteConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeletePage}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
}