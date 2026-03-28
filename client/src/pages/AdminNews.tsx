import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

type Language = 'fr' | 'en';

export default function AdminNews() {
  const [, setLocation] = useLocation();
  const [language, setLanguage] = useState<Language>('fr');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Record<string, any>>({});
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  // Note: Protection admin gérée via AdminLogin page

  // Fetch all news
  const newsQuery = trpc.news.getAllAdmin.useQuery({ domain: 'com' });
  const updateNewsMutation = trpc.news.update.useMutation();
  const deleteNewsMutation = trpc.news.delete.useMutation();
  const uploadImageMutation = trpc.upload.thumbnail.useMutation();

  const allNews = newsQuery.data || [];

  // Filter by search term
  const filteredNews = allNews.filter((article) => {
    const titleField = language === 'fr' ? 'titleFr' : 'titleEn';
    return article[titleField].toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setEditingData({
      titleFr: article.titleFr,
      titleEn: article.titleEn,
      slugFr: article.slugFr,
      slugEn: article.slugEn,
      contentFr: article.contentFr,
      contentEn: article.contentEn,
      excerptFr: article.excerptFr,
      excerptEn: article.excerptEn,
      category: article.category,
      status: article.status,
      visibleFr: article.visibleFr,
      visibleEn: article.visibleEn,
      featured: article.featured,
    });
  };

  const handleSave = async () => {
    if (!editingId) return;

    try {
      await updateNewsMutation.mutateAsync({
        id: editingId,
        ...editingData,
      });
      setEditingId(null);
      setEditingData({});
      newsQuery.refetch();
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      try {
        await deleteNewsMutation.mutateAsync({ id });
        newsQuery.refetch();
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  const handleImageUpload = async (id: number, file: File) => {
    try {
      setUploadingId(id);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        await uploadImageMutation.mutateAsync({
          projectId: id,
          base64,
          fileName: file.name,
        });
        newsQuery.refetch();
        setUploadingId(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadingId(null);
    }
  };

  if (newsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container">
          <p className="text-muted-foreground">Chargement des actualités...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestion des Actualités</h1>
            <p className="text-muted-foreground">Créez, modifiez et gérez vos actualités</p>
          </div>
          <Button onClick={() => setLocation('/admin/news/new')} className="gap-2">
            <Plus className="w-4 h-4" />
            Nouvelle actualité
          </Button>
        </div>

        {/* Language Switch */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={language === 'fr' ? 'default' : 'outline'}
            onClick={() => setLanguage('fr')}
          >
            🇫🇷 Français
          </Button>
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            onClick={() => setLanguage('en')}
          >
            🇬🇧 English
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder={`Rechercher une actualité (${language === 'fr' ? 'FR' : 'EN'})...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* News Table */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune actualité trouvée</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNews.map((article) => (
              <Card key={article.id} className="p-4">
                {editingId === article.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Titre {language === 'fr' ? 'FR' : 'EN'}</label>
                        <Input
                          value={editingData[language === 'fr' ? 'titleFr' : 'titleEn'] || ''}
                          onChange={(e) =>
                            setEditingData({
                              ...editingData,
                              [language === 'fr' ? 'titleFr' : 'titleEn']: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Slug {language === 'fr' ? 'FR' : 'EN'}</label>
                        <Input
                          value={editingData[language === 'fr' ? 'slugFr' : 'slugEn'] || ''}
                          onChange={(e) =>
                            setEditingData({
                              ...editingData,
                              [language === 'fr' ? 'slugFr' : 'slugEn']: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Extrait {language === 'fr' ? 'FR' : 'EN'}</label>
                      <textarea
                        value={editingData[language === 'fr' ? 'excerptFr' : 'excerptEn'] || ''}
                        onChange={(e) =>
                          setEditingData({
                            ...editingData,
                            [language === 'fr' ? 'excerptFr' : 'excerptEn']: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded text-sm"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Contenu {language === 'fr' ? 'FR' : 'EN'}</label>
                      <textarea
                        value={editingData[language === 'fr' ? 'contentFr' : 'contentEn'] || ''}
                        onChange={(e) =>
                          setEditingData({
                            ...editingData,
                            [language === 'fr' ? 'contentFr' : 'contentEn']: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded text-sm"
                        rows={6}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">Catégorie</label>
                        <Input
                          value={editingData.category || ''}
                          onChange={(e) =>
                            setEditingData({ ...editingData, category: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Statut</label>
                        <select
                          value={editingData.status || 'published'}
                          onChange={(e) =>
                            setEditingData({ ...editingData, status: e.target.value })
                          }
                          className="w-full p-2 border rounded text-sm"
                        >
                          <option value="draft">Brouillon</option>
                          <option value="published">Publié</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Visible</label>
                        <div className="flex gap-4 mt-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={editingData[language === 'fr' ? 'visibleFr' : 'visibleEn'] === 1}
                              onChange={(e) =>
                                setEditingData({
                                  ...editingData,
                                  [language === 'fr' ? 'visibleFr' : 'visibleEn']: e.target.checked ? 1 : 0,
                                })
                              }
                            />
                            {language === 'fr' ? 'FR' : 'EN'}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSave} variant="default">
                        Enregistrer
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingId(null);
                          setEditingData({});
                        }}
                        variant="outline"
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {article.imageUrl && (
                          <img
                            src={article.imageUrl}
                            alt={language === 'fr' ? article.titleFr : article.titleEn}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold">
                            {language === 'fr' ? article.titleFr : article.titleEn}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {article.category} • {article.status === 'draft' ? '🔒 Brouillon' : '✓ Publié'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(article.id, file);
                          }}
                          className="hidden"
                          disabled={uploadingId === article.id}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={uploadingId === article.id}
                          asChild
                        >
                          <span className="gap-2">
                            <ImageIcon className="w-4 h-4" />
                            {uploadingId === article.id ? 'Upload...' : 'Image'}
                          </span>
                        </Button>
                      </label>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(article)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(article.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
