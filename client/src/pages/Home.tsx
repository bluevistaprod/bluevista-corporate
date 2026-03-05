import { useEffect, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ChevronRight, Play } from "lucide-react";

export default function Home() {
  const { language, domain, isLoaded, t } = useI18n();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Récupérer les données
  const { data: metrics = [] } = trpc.metrics.getAll.useQuery(
    { domain: domain as "com" | "ch" },
    { enabled: isLoaded }
  );

  const { data: testimonials = [] } = trpc.testimonials.getFeatured.useQuery(
    { domain: domain as "com" | "ch", limit: 5 },
    { enabled: isLoaded }
  );

  const { data: projects = [] } = trpc.portfolio.getFeatured.useQuery(
    { domain: domain as "com" | "ch", limit: 6 },
    { enabled: isLoaded }
  );

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  const pillars = [
    {
      key: "pillars.communication",
      href: "/offers/communication",
      color: "from-blue-500 to-blue-600",
    },
    {
      key: "pillars.events",
      href: "/offers/events",
      color: "from-purple-500 to-purple-600",
    },
    {
      key: "pillars.immersion",
      href: "/offers/immersion",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Background video effect */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t("home.hero_baseline")}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Agence de communication, événementiel et immersion depuis plus de 20 ans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/offers">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  {t("home.hero_cta")}
                  <ChevronRight className="ml-2" size={20} />
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                <Play size={20} className="mr-2" />
                Voir le Showreel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 PILLARS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            {t("home.pillars_title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.key}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {/* Gradient header */}
                <div className={`h-40 bg-gradient-to-br ${pillar.color}`}></div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {t(`${pillar.key}.title`)}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t(`${pillar.key}.promise`)}
                  </p>
                  <a href={pillar.href}>
                    <Button variant="outline" className="w-full">
                      {t("home.learn_more")}
                      <ChevronRight className="ml-2" size={16} />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY METRICS SECTION */}
      {metrics.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
              {t("home.key_metrics")}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {metrics.map((metric) => (
                <div key={metric.id} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                    {metric.value}
                  </div>
                  <p className="text-gray-600">
                    {language === "fr" ? metric.labelFr : metric.labelEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS SECTION */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
              {t("home.testimonials")}
            </h2>

            <div className="max-w-3xl mx-auto">
              {/* Testimonial card */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  {testimonials[activeTestimonial]?.imageUrl && (
                    <img
                      src={testimonials[activeTestimonial].imageUrl}
                      alt={testimonials[activeTestimonial].clientName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonials[activeTestimonial]?.clientName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonials[activeTestimonial]?.clientCompany}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-6 italic">
                  "{language === "fr"
                    ? testimonials[activeTestimonial]?.contentFr
                    : testimonials[activeTestimonial]?.contentEn}"
                </p>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[activeTestimonial]?.rating || 5 }).map(
                    (_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Carousel dots */}
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      index === activeTestimonial ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LATEST PROJECTS SECTION */}
      {projects.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
              {t("home.latest_projects")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  {project.imageUrl && (
                    <div className="h-64 overflow-hidden bg-gray-200">
                      <img
                        src={project.imageUrl}
                        alt={language === "fr" ? project.titleFr : project.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 bg-white">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {language === "fr" ? project.titleFr : project.titleEn}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {project.sector} • {project.projectType}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {language === "fr" ? project.descriptionFr : project.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a href="/portfolio">
                <Button size="lg" variant="outline">
                  {t("home.learn_more")}
                  <ChevronRight className="ml-2" size={20} />
                </Button>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à transformer votre communication ?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider.
          </p>
          <a href="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {t("home.quote_cta")}
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
