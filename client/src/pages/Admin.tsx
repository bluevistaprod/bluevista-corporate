'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLocation } from 'wouter';

type Language = 'fr' | 'en';

export default function AdminPage() {
  const [, setLocation] = useLocation();
  const [language, setLanguage] = useState<Language>('fr');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [translatingId, setTranslatingId] = useState<number | null>(null);

  const projectsQuery = trpc.portfolio.getAllAdmin.useQuery({ domain: 'com', limit: 500 });
  const updateMutation = trpc.portfolio.update.useMutation();
  const deleteMutation = trpc.portfolio.delete.useMutation();
  const uploadMutation = trpc.upload.thumbnail.useMutation();
  const translateMutation = trpc.translate.project.useMutation();

  const projects = projectsQuery.data || [];
  const filteredProjects = projects.filter(p => {
    const titleField = language === 'fr' ? p.titleFr : p.titleEn;
    return (
      (titleField?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (p.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
    );
  });

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setEditData({
      titleFr: project.titleFr,
      titleEn: project.titleEn,
      descriptionFr: project.descriptionFr,
      descriptionEn: project.descriptionEn,
      description2Fr: project.description2Fr,
      description2En: project.description2En,
      clientName: project.clientName,
      clientUrl: project.clientUrl,
      status: project.status,
      visibleFr: project.visibleFr,
      visibleEn: project.visibleEn,
    });
  };

  const handleSave = async () => {
    if (!editingId) return;
    try {
      // Convert null values to undefined for optional fields
      const cleanData = Object.fromEntries(
        Object.entries(editData).map(([key, value]) => [
          key,
          value === null || value === '' ? undefined : value,
        ])
      );
      await updateMutation.mutateAsync({
        id: editingId,
        ...cleanData,
      });
      setEditingId(null);
      projectsQuery.refetch();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteMutation.mutateAsync({ id });
        projectsQuery.refetch();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleTranslate = async (projectId: number) => {
    try {
      setTranslatingId(projectId);
      await translateMutation.mutateAsync({ projectId });
      projectsQuery.refetch();
    } catch (error) {
      console.error('Error translating project:', error);
    } finally {
      setTranslatingId(null);
    }
  };

  const handleImageUpload = async (projectId: number, file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        await uploadMutation.mutateAsync({
          projectId,
          base64,
          fileName: file.name,
        });
        projectsQuery.refetch();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  if (!projectsQuery.data) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Administration - Réalisations</h1>
          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <div className="flex gap-2 bg-white rounded-lg p-2 border">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-4 py-2 rounded font-medium transition ${
                  language === 'fr'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded font-medium transition ${
                  language === 'en'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Rechercher par titre ou client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {language === 'fr' ? 'Titre' : 'Title'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Client</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">URL Client</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {language === 'fr' ? 'Description' : 'Description'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {language === 'fr' ? 'Miniature' : 'Thumbnail'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {language === 'fr' ? 'Visible' : 'Visible'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {language === 'fr' ? 'Statut' : 'Status'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {language === 'fr' ? 'Actions' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b hover:bg-gray-50">
                  {editingId === project.id ? (
                    <>
                      <td className="px-6 py-4">
                        <Input
                          value={language === 'fr' ? editData.titleFr : editData.titleEn}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              [language === 'fr' ? 'titleFr' : 'titleEn']: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Input
                          value={editData.clientName}
                          onChange={(e) =>
                            setEditData({ ...editData, clientName: e.target.value })
                          }
                          className="w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Input
                          value={editData.clientUrl}
                          onChange={(e) =>
                            setEditData({ ...editData, clientUrl: e.target.value })
                          }
                          className="w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Textarea
                          value={language === 'fr' ? editData.descriptionFr : editData.descriptionEn}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              [language === 'fr' ? 'descriptionFr' : 'descriptionEn']: e.target.value,
                            })
                          }
                          className="w-full text-sm"
                          rows={2}
                        />
                      </td>
                      <td className="px-6 py-4">
                        {project.imageUrl ? (
                          <img src={project.imageUrl} alt="Thumbnail" className="h-12 w-12 object-cover rounded" />
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={language === 'fr' ? editData.visibleFr : editData.visibleEn}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              [language === 'fr' ? 'visibleFr' : 'visibleEn']: e.target.checked ? 1 : 0,
                            })
                          }
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={editData.status}
                          onChange={(e) =>
                            setEditData({ ...editData, status: e.target.value })
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option value="draft">Brouillon</option>
                          <option value="published">Publié</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSave}
                          className="bg-green-500 hover:bg-green-600"
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
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-sm font-medium">
                        {language === 'fr' ? project.titleFr : project.titleEn}
                      </td>
                      <td className="px-6 py-4 text-sm">{project.clientName}</td>
                      <td className="px-6 py-4 text-sm">
                        {project.clientUrl && (
                          <a href={project.clientUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Lien
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {language === 'fr'
                          ? project.descriptionFr?.substring(0, 50) + '...'
                          : project.descriptionEn?.substring(0, 50) + '...'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {project.imageUrl && (
                            <img src={project.imageUrl} alt="Thumbnail" className="h-12 w-12 object-cover rounded" />
                          )}
                          <label className="cursor-pointer inline-block">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleImageUpload(project.id, e.target.files[0]);
                                }
                              }}
                              className="hidden"
                            />
                            <span className="text-blue-500 hover:underline">{project.imageUrl ? 'Changer' : 'Ajouter'}</span>
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="text-xs">
                          {language === 'fr' ? project.visibleFr ? '✓ FR' : '✗ FR' : project.visibleEn ? '✓ EN' : '✗ EN'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          project.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status === 'published' ? 'Publié' : 'Brouillon'}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEdit(project)}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Éditer
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleTranslate(project.id)}
                          className="bg-purple-500 hover:bg-purple-600"
                          disabled={translatingId === project.id}
                        >
                          {translatingId === project.id ? 'Traduction...' : 'Traduire'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(project.id)}
                        >
                          Supprimer
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
