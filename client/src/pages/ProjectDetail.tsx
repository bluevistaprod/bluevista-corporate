import { useParams, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProjectDetailTemplate } from '@/components/ProjectDetailTemplate';
import { Button } from '@/components/ui/button';

/**
 * Page de détail pour une réalisation
 * Utilise le composant ProjectDetailTemplate pour la mise en page centralisée
 * 
 * Avantages :
 * - Un changement de mise en page s'applique à TOUTES les réalisations
 * - Facile à étendre avec un back-office d'administration
 * - Pas de code en dur - tout vient de la base de données
 */
export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  // Fetch project details
  const { data: project, isLoading, error } = trpc.portfolio.getById.useQuery(
    { id: id || '' },
    { enabled: !!id }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-96 bg-muted rounded mb-8"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Projet non trouvé</h1>
            <Button onClick={() => navigate('/portfolio')} variant="default">
              ← Retour au Portfolio
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Utilise le composant réutilisable pour la mise en page */}
      <ProjectDetailTemplate project={project} isLoading={isLoading} />
      
      <Footer />
    </div>
  );
}
