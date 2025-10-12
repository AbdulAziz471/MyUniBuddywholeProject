import { useState, useEffect, useCallback } from "react";
import { Shield, Plus, Edit, Trash2, Users, Lock, Loader2, AlertTriangle } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import RoleService from '../../../services/AdminServices/RoleService';
import RolePageService from '../../../services/AdminServices/RolePageService';
import PagePermissionService from '../../../services/AdminServices/PagePermission';
import { usePermissionStore } from '../../../store/permissionStore';

export function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [permissionsState, setPermissionsState] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleToDeleteId, setRoleToDeleteId] = useState(null);
  const [roleToDeleteName, setRoleToDeleteName] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [isLoadingPermissions, setIsLoadingPermissions] = useState(false);
  const [isSavingPermissions, setIsSavingPermissions] = useState(false);
  const [isSavingRole, setIsSavingRole] = useState(false);
  const [rolePermissionsCount, setRolePermissionsCount] = useState({});
  const hasPermission = usePermissionStore((state) => state.hasPermission);
  const canViewRole = hasPermission('role', 'List');
  const canAddRole = hasPermission('role', 'Add');
  const canUpdateRole = hasPermission('role', 'Edit');
  const canDeleteRole = hasPermission('role', 'Delete');

  const { toast } = useToast();

  const createInitialPermissionsState = useCallback((allPages) => {
    const initialState = {};
    allPages.forEach(page => {
      initialState[page.id] = {};
      (page.permissions || []).forEach(perm => {
        initialState[page.id][perm.id] = false;
      });
    });
    return initialState;
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      setIsLoadingInitialData(true);
      try {
        const rolesData = await RoleService.getRoles();
        const mappedRoles = rolesData.map(role => ({
          id: role.id,
          name: role.name || role.title,
          description: role.description || '',
          userCount: role.userCount || 0,
          color: getRoleColor(role.name)
        }));
        setRoles(mappedRoles);

        const pagesWithPermissionsData = await PagePermissionService.getPageWithAllPermission();
        setPages(pagesWithPermissionsData);

        setPermissionsState(createInitialPermissionsState(pagesWithPermissionsData));

        toast({
          title: "Data Loaded",
          description: "Roles and permissions data has been successfully fetched.",
        });
      } catch (error) {
        console.error("Initialization error:", error);
        toast({
          title: "Error",
          description: "Failed to load initial data. Please check console for details.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingInitialData(false);
      }
    };
    initializeData();
  }, [createInitialPermissionsState]);

  const getRoleColor = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case 'super admin':
        return 'bg-red-100 text-red-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'teacher':
        return 'bg-blue-100 text-blue-800';
      case 'student':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRoleChange = useCallback(async (role) => {
    setIsLoadingPermissions(true);
    setSelectedRoleId(role.id);

    const newPermsState = createInitialPermissionsState(pages);

    try {
      const rolePermissionsData = await RolePageService.getRolePermissionById(role.id);
      let totalAssignedPermissions = 0;

      rolePermissionsData.forEach(({ pageId, permissions }) => {
        if (newPermsState[pageId]) {
          permissions.forEach((permId) => {
            if (newPermsState[pageId][permId] !== undefined) {
              newPermsState[pageId][permId] = true;
              totalAssignedPermissions++;
            }
          });
        }
      });
      setPermissionsState(newPermsState);
      setRolePermissionsCount(prev => ({ ...prev, [role.id]: totalAssignedPermissions }));

      toast({
        title: "Role Selected",
        description: `Permissions for role "${role.name}" loaded.`,
      });
    } catch (err) {
      console.error("Permission fetch error for role:", err);
      toast({
        title: "Error",
        description: "Failed to load permissions for the selected role.",
        variant: "destructive",
      });
      setPermissionsState(createInitialPermissionsState(pages));
    } finally {
      setIsLoadingPermissions(false);
    }
  }, [pages, createInitialPermissionsState]);

  const togglePermission = (pageId, permissionId, checked) => {
    if (!selectedRoleId) {
      toast({
        title: "Warning",
        description: "Please select a role first.",
       
      });
      return;
    }
    setPermissionsState((prev) => ({
      ...prev,
      [pageId]: { ...prev[pageId], [permissionId]: checked },
    }));
  };

  const savePermissions = async () => {
    if (!selectedRoleId) {
      toast({
        title: "Warning",
        description: "Select a role first to save permissions.",
       
      });
      return;
    }

    setIsSavingPermissions(true);

    const payloadPagePermissions = Object.entries(permissionsState)
      .map(([pageId, perms]) => ({
        pageId: pageId,
        permissions: Object.entries(perms)
          .filter(([_, isChecked]) => isChecked)
          .map(([permissionId]) => permissionId)
      }))
      .filter(p => p.permissions.length > 0);

    const payload = {
      roleId: selectedRoleId,
      pagePermissions: payloadPagePermissions,
    };

    try {
      await RolePageService.UpdateRolePermissionById(payload);
      toast({
        title: "Success",
        description: "Permissions updated successfully.",
      });
      const totalAssignedPermissions = payloadPagePermissions.reduce((acc, curr) => acc + curr.permissions.length, 0);
      setRolePermissionsCount(prev => ({ ...prev, [selectedRoleId]: totalAssignedPermissions }));
    } catch (err) {
      console.error("Save permissions error:", err);
      toast({
        title: "Error",
        description: `There was an issue saving permissions: ${err.message || 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsSavingPermissions(false);
    }
  };

  const handleAddRole = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '' });
    setDialogOpen(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
    });
    setDialogOpen(true);
  };

  const handleSaveRole = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Role name cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setIsSavingRole(true);
    try {
      if (editingRole) {
        await RoleService.updateRole(editingRole.id, {
          name: formData.name.trim(),
          description: formData.description.trim(),
        });
        toast({
          title: "Role Updated",
          description: "Role has been updated successfully.",
        });
      } else {
        await RoleService.createRole({
          name: formData.name.trim(),
          description: formData.description.trim(),
        });
        toast({
          title: "Role Created",
          description: "New role has been created successfully.",
        });
      }
      setDialogOpen(false);
      const updatedRoles = await RoleService.getRoles();
      const mappedRoles = updatedRoles.map(role => ({
        id: role.id,
        name: role.name || role.title,
        description: role.description || '',
        userCount: role.userCount || 0,
        color: getRoleColor(role.name || role.title)
      }));
      setRoles(mappedRoles);
    } catch (error) {
      console.error("Error saving role:", error);
      toast({
        title: "Error",
        description: `Failed to save role: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsSavingRole(false);
    }
  };

  const openDeleteConfirmDialog = (id, name) => {
    setRoleToDeleteId(id);
    setRoleToDeleteName(name);
    setDeleteConfirmDialogOpen(true);
  };

  const confirmDeleteRole = async () => {
    setDeleteConfirmDialogOpen(false);
    if (!roleToDeleteId) return;

    try {
      await RoleService.deleteRole(roleToDeleteId);
      toast({
        title: "Role Deleted",
        description: `Role "${roleToDeleteName}" has been removed successfully.`,
      });
      const updatedRoles = await RoleService.getRoles();
      const mappedRoles = updatedRoles.map(role => ({
        id: role.id,
        name: role.name || role.title,
        description: role.description || '',
        userCount: role.userCount || 0,
        color: getRoleColor(role.name || role.title)
      }));
      setRoles(mappedRoles);
      if (selectedRoleId === roleToDeleteId) {
        setSelectedRoleId(null);
        setPermissionsState(createInitialPermissionsState(pages));
      }
      setRoleToDeleteId(null);
      setRoleToDeleteName('');
    } catch (error) {
      console.error("Error deleting role:", error);
      toast({
        title: "Error",
        description: `Failed to delete role "${roleToDeleteName}": ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Role Management</h1>
          <p className="text-muted-foreground">Manage system roles and their permissions</p>
        </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2" onClick={handleAddRole}>
                <Plus className="w-4 h-4" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingRole ? 'Edit Role' : 'Create New Role'}</DialogTitle>
                <DialogDescription>
                  {editingRole ? 'Edit the details of the role.' : 'Fill in the details for a new role.'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="roleName">Role Name</Label>
                  <Input
                    id="roleName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter role name"
                  />
                </div>
                <div>
                  <Label htmlFor="roleDescription">Description</Label>
                  <Textarea
                    id="roleDescription"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter role description"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={isSavingRole}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveRole} disabled={isSavingRole}>
                    {isSavingRole ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (editingRole ? 'Update Role' : 'Create Role')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
      </div>

        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{roles.length}</div>
                <p className="text-xs text-muted-foreground">System-wide roles</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {roles.reduce((sum, role) => sum + (role.userCount || 0), 0)}
                </div>
                <p className="text-xs text-muted-foreground">Across all roles</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Permissions</CardTitle>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {pages.reduce((acc, page) => acc + (page.permissions?.length || 0), 0)}
                </div>
                <p className="text-xs text-muted-foreground">Available permissions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{roles.filter(r => !['Super Admin', 'Admin', 'Teacher', 'Student'].includes(r.name)).length}</div>
                <p className="text-xs text-muted-foreground">Beyond default roles</p>
              </CardContent>
            </Card>
          </div>

          {/* Roles Table */}
          <Card>
            <CardHeader>
              <CardTitle>System Roles</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingInitialData ? (
                <div className="text-center py-8 text-muted-foreground flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading roles...
                </div>
              ) : roles.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id} onClick={() => handleRoleChange(role)} className={selectedRoleId === role.id ? "bg-blue-50" : "cursor-pointer hover:bg-gray-50"}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Shield className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{role.name}</p>
                                <Badge className={role.color}>{role.name}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{role.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{role.userCount || 0} users</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(permissionsState)
                              .filter(([pageId]) => pages.find(p => p.id === pageId)?.permissions?.some(perm => permissionsState[pageId]?.[perm.id]))
                              .slice(0, 2)
                              .map(([pageId]) =>
                                pages
                                  .find(p => p.id === pageId)
                                  ?.permissions?.filter(perm => permissionsState[pageId]?.[perm.id])
                                  .map(perm => (
                                    <Badge key={perm.id} variant="outline" className="text-xs">
                                      {perm.title || perm.name}
                                    </Badge>
                                  ))
                              )}
                            {rolePermissionsCount[role.id] > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{rolePermissionsCount[role.id] - 2} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {canUpdateRole && (
                              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleEditRole(role); }}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                            {canDeleteRole && (
                              <Button variant="ghost" size="sm" className="text-destructive" onClick={(e) => { e.stopPropagation(); openDeleteConfirmDialog(role.id, role.name); }}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No roles found.</div>
              )}
            </CardContent>
          </Card>

          {/* Permissions Section */}
          <Card>
            <CardHeader>
              <CardTitle>Permissions for {roles.find(r => r.id === selectedRoleId)?.name || 'Selected Role'}</CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedRoleId ? (
                <div className="text-center py-8 text-muted-foreground">
                  Select a role from above to manage its permissions.
                </div>
              ) : isLoadingPermissions ? (
                <div className="text-center py-8 text-muted-foreground flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading permissions...
                </div>
              ) : pages.length > 0 ? (
                <>
                  <div className="flex justify-end mb-4">
                    <Button
                      onClick={savePermissions}
                      disabled={!selectedRoleId || isSavingPermissions}
                    >
                      {isSavingPermissions ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Permissions'}
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {pages.map((page) => (
                      <div key={page.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={`page-${page.id}`}
                          checked={page.permissions?.length > 0 && Object.values(permissionsState[page.id] || {}).every(Boolean)}
                          onCheckedChange={(checked) => {
                            if (!selectedRoleId) {
                              toast({
                                title: "Warning",
                                description: "Please select a role first.",
                               
                              });
                              return;
                            }
                            setPermissionsState((prev) => ({
                              ...prev,
                              [page.id]: Object.fromEntries(
                                (page.permissions || []).map((perm) => [perm.id, checked])
                              ),
                            }));
                          }}
                          disabled={!selectedRoleId}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={`page-${page.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {page.title}
                          </label>
                          {page.permissions?.map((perm) => (
                            <div key={perm.id} className="flex items-start space-x-2 mt-2">
                              <Checkbox
                                id={perm.id}
                                checked={permissionsState[page.id]?.[perm.id] || false}
                                onCheckedChange={(checked) => togglePermission(page.id, perm.id, checked)}
                                disabled={!selectedRoleId}
                              />
                              <div className="grid gap-1.5 leading-none">
                                <label
                                  htmlFor={perm.id}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {perm.title || perm.name}
                                </label>
                                <p className="text-xs text-muted-foreground">
                                  {perm.description || 'No description available'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No permissions found.</div>
              )}
            </CardContent>
          </Card>
        </>


      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmDialogOpen} onOpenChange={setDeleteConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-500" /> Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the role "<strong>{roleToDeleteName}</strong>"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteRole}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}