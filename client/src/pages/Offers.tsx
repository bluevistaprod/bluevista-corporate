import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { ChevronRight, Zap, Users, Lightbulb } from "lucide-react";

export default function Offers() {
  const { t } = useI18n();

  const pillars = [
    {
      id: "communication",
      title: "Communication & Marketing",
      icon: "📢",
      description: "Amplifiez votre visibilité et vos ventes grâce à des contenus vidéo percutants",
      services: [
        "Vidéos publicitaires et campagnes marketing",
        "Films institutionnels et corporate",
        "Vidéos produits et e-commerce",
        "Contenus réseaux sociaux et TikTok",
        "Motion design et animations",
        "Testimonials clients et success stories",
      ],
      benefits: [
        "Augmente la visibilité de 30%+",
        "Améliore le taux de conversion",
        "Renforce l'identité de marque",
        "Génère plus d'engagement",
      ],
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "event",
      title: "Événementiel",
      icon: "🎬",
      description: "Captez, diffusez et immortalisez vos événements en haute qualité",
      services: [
        "Captation et diffusion live",
        "Aftermovies et résumés vidéo",
        "Streaming multiplateforme",
        "Reportages événementiels",
        "Vidéomapping et projections",
        "Timelapse et drone footage",
      ],
      benefits: [
        "Audience étendue en direct",
        "Contenu réutilisable long terme",
        "Impact émotionnel maximal",
        "Mémorabilité accrue",
      ],
      color: "from-purple-600 to-purple-400",
    },
    {
      id: "immersion",
      title: "Immersion & Technologie",
      icon: "🌐",
      description: "Explorez les frontières de la création avec la réalité virtuelle et le metaverse",
      services: [
        "Expériences de réalité virtuelle (VR)",
        "Création de metaverse sur mesure",
        "Vidéos 360° immersives",
        "Animation 3D et modélisation",
        "Showrooms virtuels interactifs",
        "Expériences immersives événementielles",
      ],
      benefits: [
        "Expérience client révolutionnaire",
        "Différenciation concurrentielle",
        "Engagement mémoriel",
        "Positionnement innovant",
      ],
      color: "from-green-600 to-green-400",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nos Offres Créatives
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Trois piliers stratégiques pour transformer votre communication en résultats concrets
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${pillar.color} p-8 text-white`}>
                  <div className="text-5xl mb-4">{pillar.icon}</div>
                  <h2 className="text-2xl font-bold">{pillar.title}</h2>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-700 mb-6 font-medium">
                    {pillar.description}
                  </p>

                  {/* Services */}
                  <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Zap size={18} className="text-blue-600" />
                      Services inclus
                    </h3>
                    <ul className="space-y-2">
                      {pillar.services.map((service, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-blue-600 mt-1">✓</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Lightbulb size={18} className="text-green-600" />
                      Bénéfices
                    </h3>
                    <ul className="space-y-2">
                      {pillar.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-600 mt-1">→</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <a href="/contact" className="block">
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                      <span>
                        Demander un devis
                        <ChevronRight className="ml-2" size={18} />
                      </span>
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Notre Processus Créatif
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Conception",
                description: "Nous écoutons, analysons et créons un concept unique adapté à vos objectifs",
              },
              {
                step: "2",
                title: "Pré-production",
                description: "Planning détaillé, casting, repérages et préparation logistique complète",
              },
              {
                step: "3",
                title: "Production",
                description: "Tournage professionnel avec équipes expertes et équipements dernière génération",
              },
              {
                step: "4",
                title: "Post-production",
                description: "Montage, color grading, effets spéciaux et optimisation pour tous les formats",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Pourquoi Choisir Blue Vista ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏆",
                title: "20+ ans d'expertise",
                description: "Depuis 2004, nous créons des contenus vidéo pour les plus grandes marques",
              },
              {
                icon: "🌍",
                title: "Présence multi-régionale",
                description: "Agences à Lyon, Paris et Genève pour vous servir au plus proche",
              },
              {
                icon: "🚀",
                title: "Technologie de pointe",
                description: "Équipements dernière génération et expertise en technologies émergentes",
              },
              {
                icon: "👥",
                title: "Équipe créative",
                description: "Réalisateurs, monteurs, infographistes et développeurs polyvalents",
              },
              {
                icon: "📊",
                title: "Résultats mesurables",
                description: "Nos vidéos génèrent +30% de visibilité et augmentent les conversions",
              },
              {
                icon: "💡",
                title: "Approche personnalisée",
                description: "Chaque projet est unique et reçoit une attention créative particulière",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à transformer votre communication ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet et recevoir un devis personnalisé
          </p>
          <a href="/contact" className="inline-block">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <span>
                Demander un Devis
                <ChevronRight className="ml-2" size={20} />
              </span>
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
