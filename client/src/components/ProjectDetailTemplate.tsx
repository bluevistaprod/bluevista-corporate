import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Streamdown } from 'streamdown';
import { useI18n } from '@/hooks/useI18n';
import { useLocation } from 'wouter';

interface ProjectData {
  id: number;
  titleFr: string;
  titleEn: string;
  descriptionFr: string | null;
  descriptionEn: string | null;
  clientName: string | null;
  clientUrl: string | null;
  videoUrl: string | null;
  sector: string;
  projectType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProjectDetailTemplateProps {
  project: ProjectData;
  isLoading?: boolean;
}

/**
 * Composant réutilisable pour afficher les détails d'une réalisation
 * Centralise la mise en page - un changement ici s'applique à toutes les réalisations
 * 
 * Utilisation :
 * <ProjectDetailTemplate project={projectData} />
 * 
 * Structure :
 * - Video player (Vimeo iframe)
 * - Title
 * - Description avec parsing Client
 * - Sidebar avec infos (Client, Sector, Type, Year)
 */
export const ProjectDetailTemplate: React.FC<ProjectDetailTemplateProps> = ({
  project,
  isLoading = false,
}) => {
  const { language } = useI18n();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return <div className="animate-pulse">Chargement...</div>;
  }

  // Sélectionner la langue appropriée
  const title = language === 'en' ? project.titleEn : project.titleFr;
  const description = language === 'en' ? project.descriptionEn : project.descriptionFr;

  // Parser la description pour extraire : début / client / suite
  const parseDescription = (fullDesc: string | null) => {
    if (!fullDesc) return { descStart: '', clientUrl: '', descEnd: '' };
    const clientPattern = /Client\s*:\s*(https?:\/\/[^\s]+)/i;
    const match = fullDesc.match(clientPattern);

    if (match) {
      const clientUrl = match[1];
      const parts = fullDesc.split(clientPattern);
      const descStart = parts[0].trim();
      const descEnd = parts[2]?.trim() || '';

      return { descStart, clientUrl, descEnd };
    }

    return { descStart: fullDesc, clientUrl: '', descEnd: '' };
  };

  const { descStart, clientUrl, descEnd } = parseDescription(description);

  // Extraire l'ID Vimeo ou YouTube de l'URL
  const extractVideoInfo = (url: string) => {
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return {
        type: 'vimeo',
        id: vimeoMatch[1],
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`
      };
    }
    
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (youtubeMatch) {
      return {
        type: 'youtube',
        id: youtubeMatch[1],
        embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`
      };
    }
    
    return null;
  };

  const videoInfo = project.videoUrl ? extractVideoInfo(project.videoUrl) : null;

  // Formater l'année depuis createdAt
  const year = project.createdAt
    ? new Date(project.createdAt).getFullYear()
    : new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Bouton Retour en haut */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
            onClick={() => setLocation('/portfolio')}
          >
            ← {language === 'en' ? 'Back to Portfolio' : 'Retour aux réalisations'}
          </Button>
        </div>

        {/* Titre */}
        <h1 className="text-4xl font-bold mb-8 text-foreground">{title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            {videoInfo && (
              <div className="mb-8 aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={videoInfo.embedUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}

            {/* Description */}
            <div className="space-y-6 text-foreground">
              {/* Début de la description */}
              {descStart && (
                <p className="text-lg leading-relaxed">{descStart}</p>
              )}

              {/* Client avec lien */}
              {project.clientName && (
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {language === 'en' ? 'Client' : 'Client'}
                  </p>
                  {clientUrl ? (
                    <a
                      href={clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline text-lg"
                    >
                      {project.clientName} ↗
                    </a>
                  ) : (
                    <p className="font-semibold text-lg">{project.clientName}</p>
                  )}
                </div>
              )}

              {/* Suite de la description */}
              {descEnd && (
                <div className="prose dark:prose-invert max-w-none">
                  <Streamdown>{descEnd}</Streamdown>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-sm font-semibold text-card-foreground mb-4 uppercase tracking-wide">
                {language === 'en' ? 'Project Details' : 'Détails du projet'}
              </h3>

              <div className="space-y-6">
                {/* Client */}
                {project.clientName && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 uppercase">
                      {language === 'en' ? 'Client' : 'Client'}
                    </p>
                    {clientUrl ? (
                      <a
                        href={clientUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {project.clientName}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-card-foreground">
                        {project.clientName}
                      </p>
                    )}
                  </div>
                )}

                {/* Sector */}
                {project.sector && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 uppercase">
                      {language === 'en' ? 'Sector' : 'Secteur'}
                    </p>
                    <Badge variant="secondary">{project.sector}</Badge>
                  </div>
                )}

                {/* Project Type */}
                {project.projectType && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 uppercase">
                      {language === 'en' ? 'Type' : 'Type'}
                    </p>
                    <Badge variant="outline">{project.projectType}</Badge>
                  </div>
                )}


              </div>

              {/* Back Button */}
              <Button
                variant="outline"
                className="w-full mt-8"
                onClick={() => setLocation('/portfolio')}
              >
                {language === 'en' ? '← Back to Portfolio' : '← Retour au Portfolio'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
