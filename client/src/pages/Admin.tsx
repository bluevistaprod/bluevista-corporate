import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';

// Separate component for the admin content to avoid hook ordering issues
const AdminContent: React.FC = () => {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ [key: number]: number }>({});

  // Fetch all projects including drafts
  const { data: projects = [], isLoading, refetch } = trpc.portfolio.getAllAdmin.useQuery({
    domain: 'com',
    limit: 500,
  });

  const updateMutation = trpc.portfolio.update.useMutation({
    onSuccess: () => {
      refetch();
      setEditingId(null);
    },
  });

  const deleteMutation = trpc.portfolio.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const uploadMutation = trpc.upload.thumbnail.useMutation({
    onSuccess: () => {
      refetch();
      setUploadingId(null);
      setUploadProgress({});
    },
  });

  // Filter projects by search term
  const filteredProjects = useMemo(() => {
    return projects.filter((p: any) =>
      p.titleFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setEditData(project);
  };

  const handleSave = async () => {
    if (!editingId) return;
    await updateMutation.mutateAsync({
      id: editingId,
      ...editData,
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réalisation ?')) {
      await deleteMutation.mutateAsync({ id });
    }
  };

  const handleFileUpload = async (projectId: number, file: File) => {
    if (!file) return;

    setUploadingId(projectId);
    setUploadProgress({ [projectId]: 0 });

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        setUploadProgress({ [projectId]: 50 });

        await uploadMutation.mutateAsync({
          projectId,
          base64,
          fileName: file.name,
        });

        setUploadProgress({ [projectId]: 100 });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadingId(null);
      setUploadProgress({});
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Administration - Réalisations</h1>
          <Button onClick={() => setLocation('/admin/create')}>+ Nouvelle réalisation</Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Input
            placeholder="Rechercher par titre ou client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Projects Table */}
        {isLoading ? (
          <div className="text-center py-8">Chargement...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="text-left p-4">Titre</th>
                  <th className="text-left p-4">Client</th>
                  <th className="text-left p-4">Miniature</th>
                  <th className="text-left p-4">Statut</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project: any) => (
                  <tr key={project.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      {editingId === project.id ? (
                        <Input
                          value={editData.titleFr}
                          onChange={(e) => setEditData({ ...editData, titleFr: e.target.value })}
                          className="w-full"
                        />
                      ) : (
                        project.titleFr
                      )}
                    </td>
                    <td className="p-4">
                      {editingId === project.id ? (
                        <Input
                          value={editData.clientName || ''}
                          onChange={(e) => setEditData({ ...editData, clientName: e.target.value })}
                          className="w-full"
                        />
                      ) : (
                        project.clientName || '-'
                      )}
                    </td>
                    <td className="p-4">
                      {uploadingId === project.id ? (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs">{uploadProgress[project.id] || 0}%</span>
                        </div>
                      ) : project.imageUrl ? (
                        <div className="relative group">
                          <img src={project.imageUrl} alt={project.titleFr} className="h-12 w-12 object-cover rounded" />
                          <label className="absolute inset-0 bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(project.id, file);
                              }}
                            />
                            <span className="text-white text-xs">Changer</span>
                          </label>
                        </div>
                      ) : (
                        <label className="text-muted-foreground text-sm cursor-pointer hover:underline">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(project.id, file);
                            }}
                          />
                          Ajouter image
                        </label>
                      )}
                    </td>
                    <td className="p-4">
                      {editingId === project.id ? (
                        <select
                          value={editData.status || 'published'}
                          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                          className="border rounded px-2 py-1"
                        >
                          <option value="draft">Brouillon</option>
                          <option value="published">Publié</option>
                        </select>
                      ) : (
                        <Badge variant={project.status === 'draft' ? 'secondary' : 'default'}>
                          {project.status === 'draft' ? 'Brouillon' : 'Publié'}
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 space-x-2">
                      {editingId === project.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={updateMutation.isPending}
                          >
                            Enregistrer
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                          >
                            Annuler
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(project)}
                          >
                            Éditer
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(project.id)}
                            disabled={deleteMutation.isPending}
                          >
                            Supprimer
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProjects.length === 0 && !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            Aucune réalisation trouvée
          </div>
        )}
      </div>
    </div>
  );
};

// Main component with auth check
export const Admin: React.FC = () => {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not admin
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connexion requise</h1>
          <p className="text-muted-foreground mb-6">Veuillez vous connecter pour accéder à l'administration.</p>
          <Button onClick={() => setLocation('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground mb-6">Vous n'avez pas les permissions pour accéder à cette page.</p>
          <Button onClick={() => setLocation('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  return <AdminContent />;
};
