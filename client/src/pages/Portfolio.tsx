import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

const SECTORS = ["industrie", "bancaire", "pharmaceutique", "tourisme"];

export default function Portfolio() {
  const { language, domain, isLoaded, t } = useI18n();
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const { data: allProjects = [] } = trpc.portfolio.getAll.useQuery(
    { domain: domain as "com" | "ch", limit: 100 },
    { enabled: isLoaded }
  );

  const filteredProjects = activeSector
    ? allProjects.filter((p) => p.sector === activeSector)
    : allProjects;

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{t("portfolio.title")}</h1>
          <p className="text-xl text-gray-300">
            Découvrez nos derniers projets et réalisations
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => setActiveSector(null)}
              variant={activeSector === null ? "default" : "outline"}
              className={activeSector === null ? "bg-blue-600" : ""}
            >
              {t("portfolio.filter_all")}
            </Button>

            {SECTORS.map((sector) => (
              <Button
                key={sector}
                onClick={() => setActiveSector(sector)}
                variant={activeSector === sector ? "default" : "outline"}
                className={activeSector === sector ? "bg-blue-600" : ""}
              >
                {t(`portfolio.filter_${sector}`)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <a
                  key={project.id}
                  href={`/portfolio/${project.id}`}
                  className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition block cursor-pointer"
                >
                  {/* Thumbnail with play button for videos */}
                  <div className="h-64 overflow-hidden bg-gray-200 relative">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={language === "fr" ? project.titleFr : project.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <span className="text-white text-sm">Projet</span>
                      </div>
                    )}
                    
                    {/* Play button overlay for videos */}
                    {project.videoUrl && (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project info */}
                  <div className="p-6 bg-white">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      {language === "fr" ? project.titleFr : project.titleEn}
                    </h3>
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {project.sector}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {project.projectType}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {language === "fr" ? project.descriptionFr : project.descriptionEn}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Aucun projet trouvé pour ce secteur.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
