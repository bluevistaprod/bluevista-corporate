import { useParams, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useI18n } from '@/hooks/useI18n';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

/**
 * Page de détail pour une réalisation
 * Affiche la vidéo, description et contexte du projet
 */
export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useI18n();
  const [, navigate] = useLocation();

  // Fetch project details
  const { data: project, isLoading, error } = trpc.portfolio.getById.useQuery(
    { id: id || '' },
    { enabled: !!id }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{t('project.notFound')}</h1>
            <Button onClick={() => navigate('/portfolio')} variant="default">
              {t('common.backToPortfolio')}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get the correct title and description based on language
  const title = language === 'fr' ? project.titleFr : project.titleEn;
  const description = language === 'fr' ? project.descriptionFr : project.descriptionEn;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Back button */}
      <div className="container mx-auto px-4 pt-8">
        <button
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          {t('common.backToPortfolio')}
        </button>
      </div>

      {/* Project detail */}
      <main className="container mx-auto px-4 pb-20">
        {/* Project title */}
        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        {/* Project metadata */}
        <div className="flex flex-wrap gap-4 mb-8">
          {project.sector && (
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {project.sector}
            </span>
          )}
          {project.projectType && (
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              {project.projectType}
            </span>
          )}
        </div>

        {/* Video section */}
        {project.videoUrl && (
          <div className="mb-12">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
              <video
                autoPlay
                controls
                className="w-full h-full"
                style={{ objectFit: 'cover' }}
              >
                <source src={project.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {/* Project image fallback */}
        {!project.videoUrl && project.imageUrl && (
          <div className="mb-12">
            <img
              src={project.imageUrl}
              alt={title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Project description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">{t('project.about')}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {description || 'Aucune description disponible'}
            </p>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">{t('project.details')}</h3>

              {project.sector && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">{t('project.sector')}</p>
                  <p className="font-semibold">{project.sector}</p>
                </div>
              )}

              {project.projectType && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">{t('project.type')}</p>
                  <p className="font-semibold">{project.projectType}</p>
                </div>
              )}

              {project.createdAt && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">{t('project.year')}</p>
                  <p className="font-semibold">{new Date(project.createdAt).getFullYear()}</p>
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 pt-6 border-t">
                <Button
                  onClick={() => navigate('/contact')}
                  className="w-full"
                  variant="default"
                >
                  {t('common.contactUs')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
