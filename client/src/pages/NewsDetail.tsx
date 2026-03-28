import { useRoute, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useI18n } from '@/hooks/useI18n';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function NewsDetail() {
  const [match, params] = useRoute('/news/:slug');
  const [, setLocation] = useLocation();
  const { language } = useI18n();

  if (!match || !params?.slug) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container">
          <p className="text-muted-foreground">Article non trouvé</p>
        </div>
      </div>
    );
  }

  // Fetch news by slug
  const newsQuery = trpc.news.getBySlug.useQuery({
    slug: params.slug as string,
    language: language as 'fr' | 'en',
  });

  if (newsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  const article = newsQuery.data;

  if (!article) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
            <p className="text-muted-foreground mb-6">
              L'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button onClick={() => setLocation('/news')}>
              Retour aux actualités
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const title = language === 'fr' ? article.titleFr : article.titleEn;
  const content = language === 'fr' ? article.contentFr : article.contentEn;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted py-8 border-b">
        <div className="container">
          <Button
            variant="ghost"
            onClick={() => setLocation('/news')}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Retour aux actualités
          </Button>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span>{new Date(article.createdAt).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {article.imageUrl && (
        <div className="w-full h-96 bg-muted overflow-hidden">
          <img
            src={article.imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="py-12">
        <div className="container max-w-3xl">
          <div className="prose prose-sm max-w-none">
            {content ? (
              <div
                className="text-foreground leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <p className="text-muted-foreground">
                Contenu non disponible
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-muted py-12 border-t">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Autres actualités</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder for related articles */}
            <div className="text-center text-muted-foreground py-8">
              <p>Autres articles à venir</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Intéressé par nos services ?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Contactez-nous pour discuter de votre prochain projet
          </p>
          <Button
            variant="secondary"
            onClick={() => setLocation('/contact')}
          >
            Nous contacter
          </Button>
        </div>
      </div>
    </div>
  );
}
