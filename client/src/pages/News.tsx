import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/hooks/useI18n";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function News() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const articles = [
    {
      id: 1,
      title: "bluevista - Le motion design, c'est quoi ?",
      category: "Motion Design",
      date: "Février 2024",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2024/02/motion-renard-768x432.png",
      excerpt: "Découvrez les secrets du motion design et comment il peut transformer votre communication",
    },
    {
      id: 2,
      title: "STANN. - Application de gestion d'entreprise",
      category: "Corporate",
      date: "Octobre 2023",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2023/10/Stan-1-768x432.png",
      excerpt: "Un projet innovant pour simplifier la gestion d'entreprise avec une vidéo explicative percutante",
    },
    {
      id: 3,
      title: "BARPI : Prévention d'accidents industriels",
      category: "Corporate",
      date: "Octobre 2023",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2023/10/BARPI_9-768x432.jpg",
      excerpt: "Sensibilisation aux risques industriels à travers une vidéo de prévention engageante",
    },
    {
      id: 4,
      title: "MASE Rhône Alpes : Motions pédagogiques",
      category: "Animation 3D",
      date: "Octobre 2023",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2023/10/MASE-MAD-1-768x432.png",
      excerpt: "Série de motions design pour l'apprentissage de normes de sécurité industrielles",
    },
    {
      id: 5,
      title: "Le Métaverse bluevista : le blueverse",
      category: "Vidéo 360 / VR",
      date: "Octobre 2023",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2023/10/blueverse-7-768x432.png",
      excerpt: "Plongez dans notre univers métaverse immersif et interactif",
    },
    {
      id: 6,
      title: "Showroom Virtuel GF Machining Solutions",
      category: "Vidéo 360 / VR",
      date: "Octobre 2023",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2023/10/Showroom–GF_Machining.png",
      excerpt: "Expérience immersive pour découvrir les solutions de GF Machining en réalité virtuelle",
    },
    {
      id: 7,
      title: "Artcurial : Mapping 20ans",
      category: "Vidéomapping",
      date: "Janvier 2024",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2024/01/EDAC0BE9-5BEF-45B0-A4.png",
      excerpt: "Projection vidéomapping spectaculaire pour célébrer 20 ans d'Artcurial",
    },
    {
      id: 8,
      title: "Mécénat : Club Lyon La Duchère",
      category: "Reportage",
      date: "Octobre 2023",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2023/10/LaDuchere-1-768x575.png",
      excerpt: "Reportage vidéo sur les actions sociales du Club Lyon La Duchère",
    },
    {
      id: 9,
      title: "Equita Lyon : Dailynews",
      category: "Reportage",
      date: "Octobre 2023",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2023/10/Equita-6-768x432.png",
      excerpt: "Couverture quotidienne vidéo du salon Equita Lyon",
    },
    {
      id: 10,
      title: "VERCORS : LES CHEMINS DE LA LIBERTE",
      category: "Reportage",
      date: "Octobre 2023",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2023/10/230929-PNR-VERCORS.png",
      excerpt: "Documentaire vidéo sur les chemins historiques du Vercors",
    },
    {
      id: 11,
      title: "Bluevista vidéo Showreel 2023",
      category: "Motion Design",
      date: "Octobre 2023",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2023/10/230221-BV-Showreel2023.png",
      excerpt: "Découvrez nos meilleures réalisations de l'année 2023",
    },
    {
      id: 12,
      title: "SANTOS I-GRIND : Le Moulin à Café",
      category: "Publicité",
      date: "Octobre 2023",
      image: "https://www.bluevistaprod.com/wp-content/uploads/2023/10/231010-REVEALGrinderS.png",
      excerpt: "Campagne publicitaire innovante pour le moulin à café Santos",
    },
  ];

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
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">{article.excerpt}</p>

                  <a
                    href="#"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    {t("news.read_more")}
                    <ChevronRight size={18} className="ml-1" />
                  </a>
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
