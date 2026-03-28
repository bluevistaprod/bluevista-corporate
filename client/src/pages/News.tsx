import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useI18n } from "@/hooks/useI18n";

export default function News() {
  const { t, language } = useI18n();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch news from database
  const newsQuery = trpc.news.getAll.useQuery({
    domain: "com",
    limit: 100,
  });

  const articles = newsQuery.data || [];


  const categories = [
    "all",
    "Motion Design",
    "Corporate",
    "Animation 3D",
    "Vidéo 360 / VR",
    "Vidéomapping",
    "Reportage",
    "Publicité",
  ];

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t("news.title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            {t("news.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600"
                }`}
              >
                {category === "all" ? t("news.all_articles") : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48 bg-gray-200">
                  <img
                    src={article.imageUrl || 'https://via.placeholder.com/400x225'}
                    alt={language === 'fr' ? article.titleFr : article.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{new Date(article.createdAt).toLocaleDateString('fr-FR')}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {language === 'fr' ? article.titleFr : article.titleEn}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">{language === 'fr' ? (article.excerptFr || article.contentFr?.substring(0, 150)) : (article.excerptEn || article.contentEn?.substring(0, 150))}</p>

                  <button
                    onClick={() => setLocation(`/news/${language === 'fr' ? article.slugFr : article.slugEn}`)}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    {t("news.read_more")}
                    <ChevronRight size={18} className="ml-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {t("news.no_articles")}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t("news.project_in_mind")}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t("news.contact_us_news")}
          </p>
          <a href="/contact" className="inline-block">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              {t("news.contact_button")}
              <ChevronRight size={20} />
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
