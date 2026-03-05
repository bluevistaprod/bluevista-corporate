import { useRoute } from "wouter";
import { useI18n } from "@/hooks/useI18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

const OFFERS = {
  communication: {
    key: "pillars.communication",
    color: "from-blue-500 to-blue-600",
    services: [
      "Audits initiaux",
      "Conseils stratégiques",
      "Snack content",
      "Réseaux sociaux",
      "Podcasts",
      "Capsules motion",
      "Packshot",
      "Interviews",
      "Promo RS",
      "SEO/Optimisation",
      "A/B testing",
      "Paid content",
    ],
  },
  events: {
    key: "pillars.events",
    color: "from-purple-500 to-purple-600",
    services: [
      "Conception",
      "Scénographie",
      "Couverture événement",
      "FOOH",
      "Hybrid interactivité",
      "Multicam",
      "Appli salon",
      "Streaming",
      "Aftermovie",
      "Diffusion multi-canaux",
      "Formation",
      "Capta",
    ],
  },
  immersion: {
    key: "pillars.immersion",
    color: "from-pink-500 to-pink-600",
    services: [
      "Réalité virtuelle",
      "Réalité augmentée",
      "Visite VR",
      "Showroom VR",
      "Salle immersive",
      "Tutoriel formation",
      "Streaming",
      "Film produit",
      "Aftermovie",
      "Mapping",
      "3D",
      "Diffusion et visibilité",
    ],
  },
};

export default function OfferDetail() {
  const [match, params] = useRoute("/offers/:type");
  const { language, isLoaded, t } = useI18n();

  if (!isLoaded || !match) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  const offerType = params?.type as keyof typeof OFFERS;
  const offer = OFFERS[offerType];

  if (!offer) {
    return <div className="min-h-screen flex items-center justify-center">Offre non trouvée</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className={`bg-gradient-to-br ${offer.color} text-white py-20`}>
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{t(`${offer.key}.title`)}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{t(`${offer.key}.promise`)}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Notre approche</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {t(`${offer.key}.description`)}
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">Nos services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offer.services.map((service) => (
              <div
                key={service}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${offer.color} flex-shrink-0`}></div>
                  <div>
                    <h3 className="font-bold text-gray-900">{service}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`bg-gradient-to-r ${offer.color} text-white py-20`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à transformer votre {t(`${offer.key}.title`).toLowerCase()} ?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              Demander un devis
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
