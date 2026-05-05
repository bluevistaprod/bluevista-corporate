import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { ChevronRight, Check } from "lucide-react";
import { Link } from "wouter";

export default function OfferEvents() {
  const { language } = useI18n();

  const caseStudies = [
    {
      titleFr: "Conférence Technologique 500 Personnes",
      titleEn: "Technology Conference 500 People",
      descFr: "Conception, scénographie, couverture professionnelle et streaming en direct pour une conférence B2B. 50k vues en ligne.",
      descEn: "Design, scenography, professional coverage and live streaming for a B2B conference. 50k online views.",
      resultFr: "500 attendees • 50k vues online • 95% satisfaction",
      resultEn: "500 attendees • 50k online views • 95% satisfaction",
      color: "bg-purple-50",
      accentColor: "text-purple-600",
    },
    {
      titleFr: "Lancement Produit Immersif",
      titleEn: "Immersive Product Launch",
      descFr: "Événement hybride avec vidéomapping, réalité augmentée et streaming multi-plateforme. 200 attendees + 100k viewers.",
      descEn: "Hybrid event with videomapping, augmented reality and multi-platform streaming. 200 attendees + 100k viewers.",
      resultFr: "200 attendees • 100k viewers • 35% conversion",
      resultEn: "200 attendees • 100k viewers • 35% conversion",
      color: "bg-purple-50",
      accentColor: "text-purple-600",
    },
    {
      titleFr: "Salon Professionnel 3 Jours",
      titleEn: "Professional Trade Show 3 Days",
      descFr: "Production complète, coordination, aftermovie et contenu social. 2000 visiteurs, 500 leads qualifiés.",
      descEn: "Complete production, coordination, aftermovie and social content. 2000 visitors, 500 qualified leads.",
      resultFr: "2000 visitors • 500 leads • 25% ROI",
      resultEn: "2000 visitors • 500 leads • 25% ROI",
      color: "bg-purple-50",
      accentColor: "text-purple-600",
    },
  ];

  const packages = [
    {
      nameFr: "Événement Petit",
      nameEn: "Small Event",
      priceFr: "5 000 €",
      priceEn: "$5,400",
      descFr: "Pour les événements jusqu'à 100 personnes",
      descEn: "For events up to 100 people",
      servicesFr: [
        "Conception et scénographie basique",
        "Couverture photo et vidéo",
        "Montage vidéo (highlights)",
        "Contenu social (5 posts)",
        "Rapport d'événement",
      ],
      servicesEn: [
        "Basic design and scenography",
        "Photo and video coverage",
        "Video editing (highlights)",
        "Social content (5 posts)",
        "Event report",
      ],
      highlighted: false,
    },
    {
      nameFr: "Événement Moyen",
      nameEn: "Medium Event",
      priceFr: "12 500 €",
      priceEn: "$13,600",
      descFr: "Notre offre la plus populaire",
      descEn: "Our most popular offer",
      servicesFr: [
        "Conception et scénographie complète",
        "Couverture multi-caméras",
        "Streaming en direct HD",
        "Montage vidéo complet",
        "Contenu social illimité",
        "Aftermovie professionnel",
        "Rapport détaillé",
        "Support sur site",
      ],
      servicesEn: [
        "Complete design and scenography",
        "Multi-camera coverage",
        "HD live streaming",
        "Complete video editing",
        "Unlimited social content",
        "Professional aftermovie",
        "Detailed report",
        "On-site support",
      ],
      highlighted: true,
    },
    {
      nameFr: "Événement Grand",
      nameEn: "Large Event",
      priceFr: "Sur devis",
      priceEn: "Custom",
      descFr: "Solution complète et personnalisée",
      descEn: "Complete and customized solution",
      servicesFr: [
        "Conception créative sur mesure",
        "Scénographie et installations immersives",
        "Couverture professionnelle complète",
        "Streaming multi-plateforme",
        "Vidéomapping et projections",
        "Équipe dédiée sur site",
        "Production d'un documentaire",
        "Campagne marketing intégrée",
      ],
      servicesEn: [
        "Custom creative design",
        "Scenography and immersive installations",
        "Complete professional coverage",
        "Multi-platform streaming",
        "Videomapping and projections",
        "Dedicated on-site team",
        "Documentary production",
        "Integrated marketing campaign",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {language === "fr" ? "Événementiel" : "Events"}
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              {language === "fr"
                ? "Créez des événements inoubliables qui marquent les esprits"
                : "Create unforgettable events that make a lasting impression"}
            </p>
            <Link href="/contact">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 text-base py-3 px-8">
                {language === "fr" ? "Demander un devis" : "Request a Quote"}
                <ChevronRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {language === "fr" ? "Notre Approche" : "Our Approach"}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {language === "fr"
                ? "Un événement réussi, c'est bien plus que de la logistique. C'est une expérience mémorable qui renforce votre marque et génère du buzz."
                : "A successful event is much more than logistics. It's a memorable experience that strengthens your brand and generates buzz."}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {language === "fr"
                ? "De la conception créative à la couverture professionnelle, nous transformons votre vision en réalité et maximisons votre ROI."
                : "From creative design to professional coverage, we transform your vision into reality and maximize your ROI."}
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                numberFr: "500+",
                numberEn: "500+",
                labelFr: "Événements réalisés",
                labelEn: "Events completed",
              },
              {
                numberFr: "95%",
                numberEn: "95%",
                labelFr: "Satisfaction clients",
                labelEn: "Client satisfaction",
              },
              {
                numberFr: "+25%",
                numberEn: "+25%",
                labelFr: "ROI moyen",
                labelEn: "Average ROI",
              },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {language === "fr" ? stat.numberFr : stat.numberEn}
                </div>
                <p className="text-gray-700">
                  {language === "fr" ? stat.labelFr : stat.labelEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            {language === "fr" ? "Nos Cas d'Études" : "Our Case Studies"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, idx) => (
              <div key={idx} className={`${study.color} rounded-lg p-8 border-l-4 border-purple-600`}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {language === "fr" ? study.titleFr : study.titleEn}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {language === "fr" ? study.descFr : study.descEn}
                </p>
                <div className={`${study.accentColor} font-bold text-sm`}>
                  {language === "fr" ? study.resultFr : study.resultEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            {language === "fr" ? "Nos Services" : "Our Services"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                titleFr: "Conception & Scénographie",
                titleEn: "Design & Scenography",
                servicesFr: [
                  "Design créatif sur mesure",
                  "Agencement spatial optimisé",
                  "Ambiance visuelle immersive",
                  "Installations interactives",
                ],
                servicesEn: [
                  "Custom creative design",
                  "Optimized spatial layout",
                  "Immersive visual atmosphere",
                  "Interactive installations",
                ],
              },
              {
                titleFr: "Couverture Professionnelle",
                titleEn: "Professional Coverage",
                servicesFr: [
                  "Photographie d'événement",
                  "Vidéo multi-caméras",
                  "Streaming en direct HD",
                  "Drone et perspectives aériennes",
                ],
                servicesEn: [
                  "Event photography",
                  "Multi-camera video",
                  "HD live streaming",
                  "Drone and aerial perspectives",
                ],
              },
              {
                titleFr: "Production & Coordination",
                titleEn: "Production & Coordination",
                servicesFr: [
                  "Gestion complète de l'événement",
                  "Timing et coordination",
                  "Logistique créative",
                  "Support technique sur site",
                ],
                servicesEn: [
                  "Complete event management",
                  "Timing and coordination",
                  "Creative logistics",
                  "On-site technical support",
                ],
              },
              {
                titleFr: "Contenu Post-Événement",
                titleEn: "Post-Event Content",
                servicesFr: [
                  "Montage highlights",
                  "Aftermovie professionnel",
                  "Contenu social illimité",
                  "Reportage complet",
                ],
                servicesEn: [
                  "Highlights editing",
                  "Professional aftermovie",
                  "Unlimited social content",
                  "Complete report",
                ],
              },
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {language === "fr" ? service.titleFr : service.titleEn}
                </h3>
                <ul className="space-y-3">
                  {(language === "fr" ? service.servicesFr : service.servicesEn).map(
                    (item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <Check size={20} className="text-purple-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            {language === "fr" ? "Nos Tarifs" : "Our Pricing"}
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            {language === "fr"
              ? "Choisissez le package qui correspond à votre événement"
              : "Choose the package that fits your event"}
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-lg overflow-hidden transition transform hover:scale-105 ${
                  pkg.highlighted
                    ? "ring-2 ring-purple-600 shadow-xl md:scale-105"
                    : "shadow-md"
                }`}
              >
                {pkg.highlighted && (
                  <div className="bg-purple-600 text-white text-center py-3 font-bold">
                    {language === "fr" ? "POPULAIRE" : "POPULAR"}
                  </div>
                )}
                <div className="p-8 bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === "fr" ? pkg.nameFr : pkg.nameEn}
                  </h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {language === "fr" ? pkg.priceFr : pkg.priceEn}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {language === "fr" ? pkg.descFr : pkg.descEn}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {(language === "fr" ? pkg.servicesFr : pkg.servicesEn).map(
                      (service, serviceIdx) => (
                        <li key={serviceIdx} className="flex items-start gap-3">
                          <Check size={20} className="text-purple-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700 text-sm">{service}</span>
                        </li>
                      )
                    )}
                  </ul>

                  <Link href="/contact">
                    <Button
                      className={`w-full ${
                        pkg.highlighted
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {language === "fr" ? "Demander un devis" : "Request a Quote"}
                      <ChevronRight className="ml-2" size={18} />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            {language === "fr" ? "Notre Processus" : "Our Process"}
          </h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                stepFr: "1. Conception",
                stepEn: "1. Design",
                descFr: "Création d'une vision créative",
                descEn: "Creation of a creative vision",
              },
              {
                stepFr: "2. Planification",
                stepEn: "2. Planning",
                descFr: "Coordination et logistique",
                descEn: "Coordination and logistics",
              },
              {
                stepFr: "3. Exécution",
                stepEn: "3. Execution",
                descFr: "Production et réalisation",
                descEn: "Production and execution",
              },
              {
                stepFr: "4. Amplification",
                stepEn: "4. Amplification",
                descFr: "Contenu et promotion",
                descEn: "Content and promotion",
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-md text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {language === "fr" ? step.stepFr : step.stepEn}
                </h3>
                <p className="text-gray-700 text-sm">
                  {language === "fr" ? step.descFr : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === "fr"
              ? "Prêt à créer un événement mémorable ?"
              : "Ready to create a memorable event?"}
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            {language === "fr"
              ? "Contactez-nous pour discuter de votre projet et recevoir un devis personnalisé."
              : "Contact us to discuss your project and receive a personalized quote."}
          </p>
          <Link href="/contact">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 text-base py-3 px-8">
              {language === "fr" ? "Demander un devis" : "Request a Quote"}
              <ChevronRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
