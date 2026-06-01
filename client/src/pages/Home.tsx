import { useState, useEffect } from "react";
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
  const [parallaxY, setParallaxY] = useState(0);

  // Handle parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Solutions with V1 images
  const solutions = [
    {
      title: "Communication & Marketing",
      description: "Stratégies de contenu et campagnes marketing qui génèrent des leads qualifiés et fidélisent votre audience.",
      href: "/offers/communication",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405351247/HJdMFahbvq3VamEnwkCWwG/pillar-communication-MLKhhyunx5HRZFZ7oWQMpF.webp"
    },
    {
      title: "Événementiel",
      description: "Expériences événementielles mémorables qui renforcent votre marque et créent du buzz authentique.",
      href: "/offers/events",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405351247/HJdMFahbvq3VamEnwkCWwG/pillar-events-efU3kzLkQaoZFh4Y9Me8Um.webp"
    },
    {
      title: "Immersion",
      description: "Expériences immersives (VR/AR) qui transforment vos visiteurs en ambassadeurs de votre marque.",
      href: "/offers/immersion",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405351247/HJdMFahbvq3VamEnwkCWwG/pillar-immersion-iYDRR2kvYFMnQqVirentKB.webp"
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

      {/* 2. NOS SOLUTIONS - WITH PARALLAX BACKGROUND IMAGE */}
      <section className="relative py-32 overflow-hidden">
        {/* PARALLAX BACKGROUND - VRAIE IMAGE VISIBLE */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `translateY(${parallaxY}px)`,
            opacity: 0.15
          }}
        ></div>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/98 via-white/95 to-white/98 z-0"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Nos Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Trois domaines d'expertise pour transformer votre communication en résultats concrets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {solutions.map((solution, idx) => (
              <a href={solution.href} key={idx} className="group h-full">
                <div className="h-full bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 flex flex-col">
                  {/* IMAGE FROM V1 - VISIBLE */}
                  <div className="relative h-80 overflow-hidden bg-gray-300">
                    <img 
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{solution.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed text-base">{solution.description}</p>
                    </div>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      En savoir plus <ArrowRight className="ml-2" size={20} />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ILS NOUS ONT FAIT CONFIANCE - TESTIMONIALS */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ils nous ont fait confiance et ont boosté leurs résultats
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Découvrez comment nos clients ont transformé leur communication en résultats business concrets.
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-2xl border border-white/20">
              {testimonials[activeTestimonial] && (
                <div className="text-center">
                  <div className="flex justify-center mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={28} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-white mb-10 italic leading-relaxed font-light">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div className="border-t border-white/20 pt-8">
                    <p className="font-bold text-white text-lg">
                      {testimonials[activeTestimonial].author}
                    </p>
                    <p className="text-gray-300 mb-2">
                      {testimonials[activeTestimonial].title}
                    </p>
                    <p className="text-blue-400 font-semibold text-lg">
                      {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-8 mt-12">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-3 rounded-full border-2 border-white/40 text-white hover:bg-white/20 hover:border-white transition-all duration-300"
              >
                <ChevronLeft size={28} />
              </button>
              <div className="flex gap-4">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      idx === activeTestimonial 
                        ? "bg-blue-500 w-10 h-3" 
                        : "bg-white/30 w-3 h-3 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-3 rounded-full border-2 border-white/40 text-white hover:bg-white/20 hover:border-white transition-all duration-300"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RÉALISATIONS PHARES - WITH PARALLAX BACKGROUND */}
      <section className="relative py-32 overflow-hidden">
        {/* PARALLAX BACKGROUND - VRAIE IMAGE VISIBLE */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178f50002c4b?w=1920&h=1080&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `translateY(${parallaxY * 0.3}px)`,
            opacity: 0.2
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/98 via-white/95 to-white/98 z-0"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Réalisations Phares</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Une sélection de nos projets les plus impactants
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects.slice(0, 4).map((project, idx) => (
                <a href={`/portfolio/${project.id}`} key={idx} className="group">
                  <div className="relative overflow-hidden rounded-3xl h-96 bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl hover:shadow-3xl transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 group-hover:from-black/90 transition-all duration-500">
                      <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-y-0 translate-y-2 transition-transform duration-500">{language === 'fr' ? project.titleFr : project.titleEn}</h3>
                      <p className="text-gray-200 line-clamp-2 group-hover:text-gray-100 transition-colors">{language === 'fr' ? project.descriptionFr : project.descriptionEn}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 text-lg">
              Projets à venir...
            </div>
          )}

          <div className="text-center mt-16">
            <a href="/portfolio">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
                Voir tous les projets
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 5. POURQUOI BLUEVISTA */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Pourquoi Bluevista</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Notre approche pour transformer votre communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {whyUs.map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl text-white font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CHIFFRES CLÉS */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {metrics.map((metric, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                  {metric.value}
                </div>
                <p className="text-blue-100 text-lg font-medium">{language === 'fr' ? metric.labelFr : metric.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GRAND CTA FINAL */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Prêt à booster votre impact ?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Parlons de votre projet et découvrez comment nous pouvons transformer votre communication en résultats mesurables.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Démarrer maintenant
                  <ChevronRight className="ml-2" size={20} />
                </Button>
              </a>
              <a href="/portfolio">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg font-semibold rounded-lg transition-all duration-300"
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
