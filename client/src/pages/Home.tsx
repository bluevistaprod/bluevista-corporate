import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { HeroVideo } from "@/components/HeroVideo";
import { trpc } from "@/lib/trpc";
import { ChevronRight, Star, ArrowRight, ChevronLeft } from "lucide-react";

export default function Home() {
  const { language, domain, isLoaded, t } = useI18n();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Récupérer les données
  const { data: metrics = [] } = trpc.metrics.getAll.useQuery(
    { domain: domain as "com" | "ch" },
    { enabled: isLoaded }
  );

  const { data: projects = [] } = trpc.portfolio.getFeatured.useQuery(
    { domain: domain as "com" | "ch", limit: 4 },
    { enabled: isLoaded }
  );

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  // Hardcoded testimonials
  const testimonials = [
    {
      company: "KOESIO",
      quote: "Grâce à Bluevista, notre convention 2024 a été un vrai succès. L'aftermovie et les contenus immersifs ont généré un engagement exceptionnel et nous ont permis de renforcer notre image de marque. Un vrai retour sur investissement.",
      author: "Yanniv Bettane",
      title: "Directeur Marketing"
    },
    {
      company: "IRISOLARIS",
      quote: "Bluevista a su transformer notre communication corporate en véritables expériences. Les vidéos et le contenu immersif ont nettement augmenté notre visibilité et notre attractivité auprès de nos partenaires. Résultat concret : +35% de leads qualifiés.",
      author: "Direction Communication",
      title: "Direction Communication"
    },
    {
      company: "UNIHA",
      quote: "Les vœux 2025 et les vidéos institutionnelles réalisées par Bluevista ont marqué les esprits. Une agence réactive, créative et surtout orientée résultats. Nous travaillons ensemble depuis plusieurs années en toute confiance.",
      author: "Direction Générale",
      title: "Direction Générale"
    }
  ];

  // Solutions with premium images
  const solutions = [
    {
      title: "Communication & Marketing",
      description: "Stratégies de contenu et campagnes marketing qui génèrent des leads qualifiés et fidélisent votre audience.",
      href: "/offers/communication",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
    },
    {
      title: "Événementiel",
      description: "Expériences événementielles mémorables qui renforcent votre marque et créent du buzz authentique.",
      href: "/offers/events",
      image: "https://images.unsplash.com/photo-1519671482677-504be0ffbc9d?w=800&h=600&fit=crop"
    },
    {
      title: "Immersion",
      description: "Expériences immersives (VR/AR) qui transforment vos visiteurs en ambassadeurs de votre marque.",
      href: "/offers/immersion",
      image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600&fit=crop"
    }
  ];

  // Business gains
  const businessGains = [
    {
      metric: "+30%",
      description: "Augmentation moyenne des ventes"
    },
    {
      metric: "200+",
      description: "Clients satisfaits"
    },
    {
      metric: "500+",
      description: "Projets réussis"
    },
    {
      metric: "20+",
      description: "Années d'expertise"
    }
  ];

  // Why us
  const whyUs = [
    {
      title: "Équipe proche",
      description: "Vous travaillez avec des experts passionnés qui comprennent vraiment votre business."
    },
    {
      title: "Processus fluide",
      description: "Une collaboration sans friction, de la conception à la livraison."
    },
    {
      title: "Résultats mesurables",
      description: "Chaque projet est piloté par des KPIs clairs et du reporting transparent."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 1. HERO SECTION - PRESERVED */}
      <section className="relative h-screen overflow-hidden">
        <HeroVideo 
          title="Bluevista - Showreel 2025" 
          videoUrl="https://files.manuscdn.com/user_upload_by_module/session_file/310519663405351247/zLztsxSjfhtBNWAZ.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="max-w-4xl space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Transformez votre communication en résultats
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-light">
              Agence de création de contenu, communication & marketing, événementiel et immersion.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <a href="/contact" className="inline-block">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Discutons de votre projet
                  <ChevronRight className="ml-2" size={20} />
                </Button>
              </a>
              <a href="/portfolio" className="inline-block">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 hover:border-gray-200"
                >
                  Voir nos réalisations
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NOS SOLUTIONS - WITH PREMIUM IMAGES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nos Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trois domaines d'expertise pour transformer votre communication en résultats concrets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, idx) => (
              <a href={solution.href} key={idx} className="group">
                <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                  {/* Premium Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <img 
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                      En savoir plus <ArrowRight className="ml-2" size={20} />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VOS GAINS BUSINESS */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Vos Gains Business</h2>
            <p className="text-xl text-blue-100">
              Les résultats concrets que nos clients obtiennent
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {businessGains.map((gain, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">{gain.metric}</div>
                <p className="text-blue-100">{gain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ILS NOUS ONT FAIT CONFIANCE - TESTIMONIALS */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ils nous ont fait confiance et ont boosté leurs résultats
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez comment nos clients ont transformé leur communication en résultats business concrets.
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
              {testimonials[activeTestimonial] && (
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 mb-8 italic leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="font-bold text-gray-900 text-lg">
                      {testimonials[activeTestimonial].author}
                    </p>
                    <p className="text-gray-600 mb-2">
                      {testimonials[activeTestimonial].title}
                    </p>
                    <p className="text-blue-600 font-semibold">
                      {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-2 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex gap-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === activeTestimonial ? "bg-blue-600 w-8" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-2 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RÉALISATIONS PHARES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Réalisations Phares</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une sélection de nos projets les plus impactants
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.slice(0, 4).map((project, idx) => (
                <a href={`/portfolio/${project.id}`} key={idx} className="group">
                  <div className="relative overflow-hidden rounded-2xl h-80 bg-gradient-to-br from-gray-200 to-gray-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white">{language === 'fr' ? project.titleFr : project.titleEn}</h3>
                      <p className="text-gray-200 mt-2 line-clamp-2">{language === 'fr' ? project.descriptionFr : project.descriptionEn}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Projets à venir...
            </div>
          )}

          <div className="text-center mt-12">
            <a href="/portfolio">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Voir tous les projets
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 6. POURQUOI BLUEVISTA */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pourquoi Bluevista</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Notre approche pour transformer votre communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {whyUs.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CHIFFRES CLÉS */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {metrics.map((metric, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {metric.value}
                </div>
                <p className="text-gray-300">{language === 'fr' ? metric.labelFr : metric.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GRAND CTA FINAL */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Prêt à booster votre impact ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Parlons de votre projet et découvrez comment nous pouvons transformer votre communication en résultats mesurables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold">
                  Démarrer maintenant
                  <ChevronRight className="ml-2" size={20} />
                </Button>
              </a>
              <a href="/portfolio">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold"
                >
                  Voir nos réalisations
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
