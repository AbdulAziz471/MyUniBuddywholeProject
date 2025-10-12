import { useState, useEffect } from "react";
import { Shield, Lock, Plus, Edit, Trash2, Search, Filter, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import PermissionService from '../../../services/AdminServices/PermissionService';

export function PermissionsPage() {
  const [permissions, setPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [permissionToDeleteId, setPermissionToDeleteId] = useState(null);
  const [permissionToDeleteName, setPermissionToDeleteName] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    resourceType: '',
    createdBy: 'Admin'
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    setIsLoading(true);
    try {
      const data = await PermissionService.getPermissions();
      const mappedData = data.map(p => ({
        id: p.id,
        name: p.name || p.title.toLowerCase().replace(/\s+/g, '_'),
        displayName: p.title,
        description: p.description || '',
        actions: p.actions || [],
        createdBy: p.createdBy || 'Admin'
      }));
      setPermissions(mappedData);
      toast({
        title: "Permissions Loaded",
        description: "Permissions data has been successfully fetched.",
      });
    } catch (error) {
      console.error("Error fetching permissions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch permissions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPermission = () => {
    setEditingPermission(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      resourceType: '',
      createdBy: 'Admin'
    });
    setDialogOpen(true);
  };

  const handleEditPermission = (permission) => {
    setEditingPermission(permission);
    setFormData({
      title: permission.displayName,
      description: permission.description || '',
      category: permission.category,
      resourceType: permission.resourceType,
      createdBy: permission.createdBy || 'Admin'
    });
    setDialogOpen(true);
  };

  const handleSavePermission = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Permission title cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        resourceType: formData.resourceType,
        createdBy: formData.createdBy
      };

      if (editingPermission) {
        await PermissionService.updatePermission(editingPermission.id, payload);
        toast({
          title: "Permission Updated",
          description: "Permission has been updated successfully.",
        });
      } else {
        await PermissionService.createPermission(payload);
        toast({
          title: "Permission Added",
          description: "New permission has been created successfully.",
        });
      }
      setDialogOpen(false);
      fetchPermissions();
    } catch (error) {
      console.error("Error saving permission:", error);
      toast({
        title: "Error",
        description: `Failed to save permission: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const openDeleteConfirmDialog = (id, name) => {
    setPermissionToDeleteId(id);
    setPermissionToDeleteName(name);
    setDeleteConfirmDialogOpen(true);
  };

  const confirmDeletePermission = async () => {
    setDeleteConfirmDialogOpen(false);
    if (!permissionToDeleteId) return;

    try {
      await PermissionService.deletePermissionById(permissionToDeleteId);
      toast({
        title: "Permission Deleted",
        description: `Permission "${permissionToDeleteName}" has been removed successfully.`,
      });
      fetchPermissions();
      setPermissionToDeleteId(null);
      setPermissionToDeleteName('');
    } catch (error) {
      console.error("Error deleting permission:", error);
      toast({
        title: "Error",
        description: `Failed to delete permission "${permissionToDeleteName}": ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = 
      (permission.displayName && permission.displayName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (permission.description && permission.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || permission.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

 
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Permission Management</h1>
          <p className="text-muted-foreground">Manage system permissions and access controls</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={handleAddPermission}>
              <Plus className="w-4 h-4" />
              Add Permission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPermission ? 'Edit Permission' : 'Create New Permission'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="permissionName">Permission Name</Label>
                <Input
                  id="permissionName"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Create Users"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what this permission allows"
                />
              </div>
             
              {editingPermission && (
                <div>
                  <Label htmlFor="createdBy">Created By</Label>
                  <Input
                    id="createdBy"
                    value={formData.createdBy}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSavePermission}>
                  {editingPermission ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

    
      <Card>
        <CardHeader>
          <CardTitle>System Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
           
          </div>

          {/* Permissions Table */}
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading permissions...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPermissions.length > 0 ? (
                  filteredPermissions.map((permission) => (
                    <TableRow key={permission.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Lock className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{permission.displayName}</p>
                            <p className="text-sm text-muted-foreground">{permission.description}</p>
                            <p className="text-xs text-muted-foreground font-mono">{permission.name}</p>
                          </div>
                        </div>
                      </TableCell>
                     
                     
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditPermission(permission)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => openDeleteConfirmDialog(permission.id, permission.displayName)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-4">
                      No permissions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmDialogOpen} onOpenChange={setDeleteConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-500" /> Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the permission "<strong>{permissionToDeleteName}</strong>"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeletePermission}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}