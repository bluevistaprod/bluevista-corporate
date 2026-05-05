import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { ChevronRight, Check } from "lucide-react";
import { Link } from "wouter";

export default function OfferImmersion() {
  const { language } = useI18n();

  const caseStudies = [
    {
      titleFr: "Visite Virtuelle 360° pour Musée",
      titleEn: "360° Virtual Tour for Museum",
      descFr: "Création d'une visite VR complète d'un musée. 100k utilisateurs, 4.8/5 étoiles, augmentation de 40% des visiteurs physiques.",
      descEn: "Creation of a complete VR museum tour. 100k users, 4.8/5 stars, 40% increase in physical visitors.",
      resultFr: "100k users • 4.8/5 stars • +40% physical visits",
      resultEn: "100k users • 4.8/5 stars • +40% physical visits",
      color: "bg-cyan-50",
      accentColor: "text-cyan-600",
    },
    {
      titleFr: "Expérience AR pour Lancement Produit",
      titleEn: "AR Experience for Product Launch",
      descFr: "Application AR interactive permettant aux clients de visualiser le produit en 3D. 50k téléchargements, 35% conversion.",
      descEn: "Interactive AR application allowing customers to visualize the product in 3D. 50k downloads, 35% conversion.",
      resultFr: "50k downloads • 35% conversion • 4.7/5 rating",
      resultEn: "50k downloads • 35% conversion • 4.7/5 rating",
      color: "bg-cyan-50",
      accentColor: "text-cyan-600",
    },
    {
      titleFr: "Formation Immersive en VR",
      titleEn: "Immersive VR Training",
      descFr: "Plateforme de formation VR pour une entreprise industrielle. 500 utilisateurs, 60% réduction du temps de formation.",
      descEn: "VR training platform for an industrial company. 500 users, 60% reduction in training time.",
      resultFr: "500 users • -60% training time • 95% retention",
      resultEn: "500 users • -60% training time • 95% retention",
      color: "bg-cyan-50",
      accentColor: "text-cyan-600",
    },
  ];

  const packages = [
    {
      nameFr: "Expérience Starter",
      nameEn: "Starter Experience",
      priceFr: "8 000 €",
      priceEn: "$8,700",
      descFr: "Pour débuter avec l'immersion",
      descEn: "To start with immersion",
      servicesFr: [
        "Visite 360° simple",
        "Modélisation 3D basique",
        "Plateforme de distribution",
        "Support 3 mois",
        "Analytics basique",
      ],
      servicesEn: [
        "Simple 360° tour",
        "Basic 3D modeling",
        "Distribution platform",
        "3 months support",
        "Basic analytics",
      ],
      highlighted: false,
    },
    {
      nameFr: "Expérience Pro",
      nameEn: "Pro Experience",
      priceFr: "18 000 €",
      priceEn: "$19,600",
      descFr: "Notre offre la plus populaire",
      descEn: "Our most popular offer",
      servicesFr: [
        "Expérience VR/AR complète",
        "Modélisation 3D avancée",
        "Interactivité personnalisée",
        "Plateforme cloud sécurisée",
        "Analytics détaillé",
        "Support 12 mois",
        "Optimisation continue",
        "Formation utilisateurs",
      ],
      servicesEn: [
        "Complete VR/AR experience",
        "Advanced 3D modeling",
        "Custom interactivity",
        "Secure cloud platform",
        "Detailed analytics",
        "12 months support",
        "Continuous optimization",
        "User training",
      ],
      highlighted: true,
    },
    {
      nameFr: "Expérience Enterprise",
      nameEn: "Enterprise Experience",
      priceFr: "Sur devis",
      priceEn: "Custom",
      descFr: "Solution complète et personnalisée",
      descEn: "Complete and customized solution",
      servicesFr: [
        "Expérience immersive sur mesure",
        "Modélisation 3D photogrammétrie",
        "Intégration multi-plateforme",
        "Plateforme propriétaire",
        "Analytics avancé et BI",
        "Support 24/7",
        "Équipe dédiée",
        "Maintenance et évolutions",
      ],
      servicesEn: [
        "Custom immersive experience",
        "Photogrammetry 3D modeling",
        "Multi-platform integration",
        "Proprietary platform",
        "Advanced analytics and BI",
        "24/7 support",
        "Dedicated team",
        "Maintenance and updates",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-600 to-cyan-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {language === "fr" ? "Immersion" : "Immersion"}
            </h1>
            <p className="text-xl text-cyan-100 mb-8">
              {language === "fr"
                ? "Plongez votre audience dans des mondes sans limites"
                : "Immerse your audience in limitless worlds"}
            </p>
            <Link href="/contact">
              <Button className="bg-white text-cyan-600 hover:bg-gray-100 text-base py-3 px-8">
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
                ? "La réalité virtuelle, augmentée et 360° ne sont plus de la science-fiction. Elles sont des outils puissants pour engager, former et convertir."
                : "Virtual reality, augmented reality and 360° are no longer science fiction. They are powerful tools to engage, train and convert."}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {language === "fr"
                ? "Nous transformons votre vision en expériences immersives qui captent l'attention, marquent les esprits et génèrent des résultats mesurables."
                : "We transform your vision into immersive experiences that capture attention, mark minds and generate measurable results."}
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                numberFr: "50+",
                numberEn: "50+",
                labelFr: "Projets immersifs",
                labelEn: "Immersive projects",
              },
              {
                numberFr: "500k+",
                numberEn: "500k+",
                labelFr: "Utilisateurs engagés",
                labelEn: "Engaged users",
              },
              {
                numberFr: "+40%",
                numberEn: "+40%",
                labelFr: "Augmentation conversion",
                labelEn: "Conversion increase",
              },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="text-4xl font-bold text-cyan-600 mb-2">
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
              <div key={idx} className={`${study.color} rounded-lg p-8 border-l-4 border-cyan-600`}>
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
                titleFr: "Réalité Virtuelle (VR)",
                titleEn: "Virtual Reality (VR)",
                servicesFr: [
                  "Expériences VR immersives",
                  "Visites virtuelles interactives",
                  "Formations en VR",
                  "Environnements 3D personnalisés",
                ],
                servicesEn: [
                  "Immersive VR experiences",
                  "Interactive virtual tours",
                  "VR training",
                  "Custom 3D environments",
                ],
              },
              {
                titleFr: "Réalité Augmentée (AR)",
                titleEn: "Augmented Reality (AR)",
                servicesFr: [
                  "Filtres AR interactifs",
                  "Expériences mobiles AR",
                  "Catalogues 3D interactifs",
                  "Visualisation de produits",
                ],
                servicesEn: [
                  "Interactive AR filters",
                  "Mobile AR experiences",
                  "Interactive 3D catalogs",
                  "Product visualization",
                ],
              },
              {
                titleFr: "Vidéo & Photo 360°",
                titleEn: "360° Video & Photography",
                servicesFr: [
                  "Capture 360° professionnelle",
                  "Streaming 360° en direct",
                  "Visites virtuelles immersives",
                  "Contenu interactif",
                ],
                servicesEn: [
                  "Professional 360° capture",
                  "Live 360° streaming",
                  "Immersive virtual tours",
                  "Interactive content",
                ],
              },
              {
                titleFr: "Modélisation 3D",
                titleEn: "3D Modeling",
                servicesFr: [
                  "Modélisation 3D avancée",
                  "Photogrammétrie",
                  "Animation 3D",
                  "Environnements interactifs",
                ],
                servicesEn: [
                  "Advanced 3D modeling",
                  "Photogrammetry",
                  "3D animation",
                  "Interactive environments",
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
                        <Check size={20} className="text-cyan-600 flex-shrink-0 mt-1" />
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
              ? "Choisissez le package qui correspond à vos besoins"
              : "Choose the package that fits your needs"}
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-lg overflow-hidden transition transform hover:scale-105 ${
                  pkg.highlighted
                    ? "ring-2 ring-cyan-600 shadow-xl md:scale-105"
                    : "shadow-md"
                }`}
              >
                {pkg.highlighted && (
                  <div className="bg-cyan-600 text-white text-center py-3 font-bold">
                    {language === "fr" ? "POPULAIRE" : "POPULAR"}
                  </div>
                )}
                <div className="p-8 bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === "fr" ? pkg.nameFr : pkg.nameEn}
                  </h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-cyan-600 mb-2">
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
                          <Check size={20} className="text-cyan-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700 text-sm">{service}</span>
                        </li>
                      )
                    )}
                  </ul>

                  <Link href="/contact">
                    <Button
                      className={`w-full ${
                        pkg.highlighted
                          ? "bg-cyan-600 text-white hover:bg-cyan-700"
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
                descFr: "Définition de l'expérience",
                descEn: "Experience definition",
              },
              {
                stepFr: "2. Modélisation",
                stepEn: "2. Modeling",
                descFr: "Création 3D et assets",
                descEn: "3D creation and assets",
              },
              {
                stepFr: "3. Développement",
                stepEn: "3. Development",
                descFr: "Intégration et interactivité",
                descEn: "Integration and interactivity",
              },
              {
                stepFr: "4. Déploiement",
                stepEn: "4. Deployment",
                descFr: "Lancement et optimisation",
                descEn: "Launch and optimization",
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
      <section className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === "fr"
              ? "Prêt à créer une expérience immersive ?"
              : "Ready to create an immersive experience?"}
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            {language === "fr"
              ? "Contactez-nous pour discuter de votre projet et recevoir un devis personnalisé."
              : "Contact us to discuss your project and receive a personalized quote."}
          </p>
          <Link href="/contact">
            <Button className="bg-white text-cyan-600 hover:bg-gray-100 text-base py-3 px-8">
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
