import { useRoute, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useI18n } from '@/hooks/useI18n';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronLeft, Calendar, Tag, Share2 } from 'lucide-react';

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
  const excerpt = language === 'fr' ? article.excerptFr : article.excerptEn;
  const content = language === 'fr' ? article.contentFr : article.contentEn;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Featured Image Hero */}
      {article.imageUrl && (
        <div className="w-full h-96 md:h-[500px] bg-muted overflow-hidden relative">
          <img
            src={article.imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Article Header Section */}
      <div className="bg-white border-b">
        <div className="container max-w-4xl py-8 md:py-12">
          {/* Breadcrumb & Back Button */}
          <Button
            variant="ghost"
            onClick={() => setLocation('/news')}
            className="mb-6 text-primary hover:text-primary/80"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Retour aux actualités' : 'Back to news'}
          </Button>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold">
                {article.category}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(article.createdAt).toLocaleDateString(
                  language === 'fr' ? 'fr-FR' : 'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </span>
            </div>

            {/* Share Button */}
            <button className="flex items-center gap-2 hover:text-foreground transition">
              <Share2 className="w-4 h-4" />
              <span>{language === 'fr' ? 'Partager' : 'Share'}</span>
            </button>
          </div>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-6 mb-8">
              {excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <div className="prose prose-lg max-w-none">
            {content ? (
              <div
                className="text-foreground leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <p className="text-muted-foreground">
                {language === 'fr' ? 'Contenu non disponible' : 'Content not available'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="bg-muted py-12 md:py-16 border-t">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            {language === 'fr' ? 'Autres actualités' : 'Related articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-muted-foreground py-12">
              <p>
                {language === 'fr'
                  ? 'Autres articles à venir'
                  : 'More articles coming soon'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'fr'
              ? 'Intéressé par nos services ?'
              : 'Interested in our services?'}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {language === 'fr'
              ? 'Contactez-nous pour discuter de votre prochain projet vidéo'
              : 'Contact us to discuss your next video project'}
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setLocation('/contact')}
            className="font-semibold"
          >
            {language === 'fr' ? 'Nous contacter' : 'Contact us'}
          </Button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white py-12 md:py-16 border-t">
        <div className="container max-w-2xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {language === 'fr'
              ? 'Restez informé de nos actualités'
              : 'Stay updated with our news'}
          </h3>
          <p className="text-muted-foreground mb-8">
            {language === 'fr'
              ? 'Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et projets'
              : 'Subscribe to our newsletter to receive our latest news and projects'}
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder={language === 'fr' ? 'Votre email' : 'Your email'}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="font-semibold">
              {language === 'fr' ? 'S\'inscrire' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
