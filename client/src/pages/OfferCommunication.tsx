import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { ChevronRight, Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function OfferCommunication() {
  const { language } = useI18n();

  const caseStudies = [
    {
      titleFr: "Stratégie Social Media pour Marque B2B",
      titleEn: "Social Media Strategy for B2B Brand",
      descFr: "Augmentation de 150% de l'engagement en 6 mois grâce à une stratégie de contenu cohérente et des campagnes ciblées.",
      descEn: "150% increase in engagement in 6 months through consistent content strategy and targeted campaigns.",
      resultFr: "+150% engagement • +45% followers • +200% leads",
      resultEn: "+150% engagement • +45% followers • +200% leads",
      color: "bg-blue-50",
      accentColor: "text-blue-600",
    },
    {
      titleFr: "Série Podcast Professionnel",
      titleEn: "Professional Podcast Series",
      descFr: "Production et distribution d'une série de 12 podcasts pour une agence de consulting. 50k écoutes en 3 mois.",
      descEn: "Production and distribution of a 12-episode podcast series for a consulting firm. 50k listens in 3 months.",
      resultFr: "50k écoutes • 2.5k abonnés • 30% conversion",
      resultEn: "50k listens • 2.5k subscribers • 30% conversion",
      color: "bg-blue-50",
      accentColor: "text-blue-600",
    },
    {
      titleFr: "Campagne Motion Design",
      titleEn: "Motion Design Campaign",
      descFr: "5 vidéos explicatives pour une plateforme SaaS. 2M vues, 15% CTR, 8% conversion.",
      descEn: "5 explainer videos for a SaaS platform. 2M views, 15% CTR, 8% conversion.",
      resultFr: "2M vues • 15% CTR • 8% conversion",
      resultEn: "2M views • 15% CTR • 8% conversion",
      color: "bg-blue-50",
      accentColor: "text-blue-600",
    },
  ];

  const packages = [
    {
      nameFr: "Starter",
      nameEn: "Starter",
      priceFr: "2 500 €",
      priceEn: "$2,700",
      descFr: "Parfait pour débuter votre stratégie digitale",
      descEn: "Perfect to start your digital strategy",
      servicesFr: [
        "Audit et stratégie initial",
        "4 mois de gestion réseaux sociaux",
        "12 posts optimisés par mois",
        "1 vidéo courte par mois",
        "Reporting mensuel",
      ],
      servicesEn: [
        "Initial audit and strategy",
        "4 months of social media management",
        "12 optimized posts per month",
        "1 short video per month",
        "Monthly reporting",
      ],
      highlighted: false,
    },
    {
      nameFr: "Pro",
      nameEn: "Pro",
      priceFr: "6 500 €",
      priceEn: "$7,100",
      descFr: "Notre offre la plus populaire",
      descEn: "Our most popular offer",
      servicesFr: [
        "Audit et stratégie complet",
        "Gestion réseaux sociaux complète",
        "24 posts optimisés par mois",
        "2 vidéos courtes par mois",
        "1 podcast par mois (4 épisodes)",
        "A/B testing et optimisation",
        "Reporting bi-mensuel",
        "Support prioritaire",
      ],
      servicesEn: [
        "Complete audit and strategy",
        "Full social media management",
        "24 optimized posts per month",
        "2 short videos per month",
        "1 podcast per month (4 episodes)",
        "A/B testing and optimization",
        "Bi-monthly reporting",
        "Priority support",
      ],
      highlighted: true,
    },
    {
      nameFr: "Enterprise",
      nameEn: "Enterprise",
      priceFr: "Sur devis",
      priceEn: "Custom",
      descFr: "Solution complète et personnalisée",
      descEn: "Complete and customized solution",
      servicesFr: [
        "Stratégie digitale sur mesure",
        "Gestion complète multi-canaux",
        "Contenu illimité (vidéos, podcasts, posts)",
        "Équipe dédiée",
        "Optimisation et testing avancé",
        "Intégration CRM/Analytics",
        "Reporting hebdomadaire",
        "Réunions stratégiques mensuelles",
      ],
      servicesEn: [
        "Custom digital strategy",
        "Complete multi-channel management",
        "Unlimited content (videos, podcasts, posts)",
        "Dedicated team",
        "Advanced optimization and testing",
        "CRM/Analytics integration",
        "Weekly reporting",
        "Monthly strategy meetings",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {language === "fr"
                ? "Communication & Marketing"
                : "Communication & Marketing"}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {language === "fr"
                ? "Amplifiez votre présence et convertissez votre audience en clients"
                : "Amplify your presence and convert your audience into customers"}
            </p>
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 text-base py-3 px-8">
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
                ? "Dans un monde saturé de contenu, votre message doit se démarquer. Nous combinons stratégie, créativité et data pour créer une présence digitale qui convertit."
                : "In a saturated content world, your message must stand out. We combine strategy, creativity and data to create a digital presence that converts."}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {language === "fr"
                ? "De l'audit initial à l'optimisation continue, nous guidons chaque étape de votre transformation digitale."
                : "From initial audit to continuous optimization, we guide every step of your digital transformation."}
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                numberFr: "+30%",
                numberEn: "+30%",
                labelFr: "Visibilité moyenne",
                labelEn: "Average visibility",
              },
              {
                numberFr: "+45%",
                numberEn: "+45%",
                labelFr: "Croissance followers",
                labelEn: "Follower growth",
              },
              {
                numberFr: "+200%",
                numberEn: "+200%",
                labelFr: "Leads générés",
                labelEn: "Leads generated",
              },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
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
              <div key={idx} className={`${study.color} rounded-lg p-8 border-l-4 border-blue-600`}>
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
                titleFr: "Stratégie & Audit",
                titleEn: "Strategy & Audit",
                servicesFr: [
                  "Audit complet de présence digitale",
                  "Analyse concurrentielle",
                  "Définition de la stratégie",
                  "Planification annuelle",
                ],
                servicesEn: [
                  "Complete digital presence audit",
                  "Competitive analysis",
                  "Strategy definition",
                  "Annual planning",
                ],
              },
              {
                titleFr: "Contenu & Production",
                titleEn: "Content & Production",
                servicesFr: [
                  "Création de contenu optimisé",
                  "Production vidéo",
                  "Podcasts professionnels",
                  "Motion design",
                ],
                servicesEn: [
                  "Optimized content creation",
                  "Video production",
                  "Professional podcasts",
                  "Motion design",
                ],
              },
              {
                titleFr: "Gestion & Optimisation",
                titleEn: "Management & Optimization",
                servicesFr: [
                  "Gestion réseaux sociaux",
                  "Planification éditoriale",
                  "Community management",
                  "A/B testing",
                ],
                servicesEn: [
                  "Social media management",
                  "Editorial planning",
                  "Community management",
                  "A/B testing",
                ],
              },
              {
                titleFr: "Analyse & Reporting",
                titleEn: "Analytics & Reporting",
                servicesFr: [
                  "Suivi KPIs",
                  "Reporting détaillé",
                  "Optimisation continue",
                  "Recommandations stratégiques",
                ],
                servicesEn: [
                  "KPI tracking",
                  "Detailed reporting",
                  "Continuous optimization",
                  "Strategic recommendations",
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
                        <Check size={20} className="text-blue-600 flex-shrink-0 mt-1" />
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
                    ? "ring-2 ring-blue-600 shadow-xl md:scale-105"
                    : "shadow-md"
                }`}
              >
                {pkg.highlighted && (
                  <div className="bg-blue-600 text-white text-center py-3 font-bold">
                    {language === "fr" ? "POPULAIRE" : "POPULAR"}
                  </div>
                )}
                <div className="p-8 bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === "fr" ? pkg.nameFr : pkg.nameEn}
                  </h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
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
                          <Check size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700 text-sm">{service}</span>
                        </li>
                      )
                    )}
                  </ul>

                  <Link href="/contact">
                    <Button
                      className={`w-full ${
                        pkg.highlighted
                          ? "bg-blue-600 text-white hover:bg-blue-700"
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
                stepFr: "1. Audit",
                stepEn: "1. Audit",
                descFr: "Analyse complète de votre présence actuelle",
                descEn: "Complete analysis of your current presence",
              },
              {
                stepFr: "2. Stratégie",
                stepEn: "2. Strategy",
                descFr: "Définition d'une stratégie personnalisée",
                descEn: "Definition of a customized strategy",
              },
              {
                stepFr: "3. Exécution",
                stepEn: "3. Execution",
                descFr: "Production et mise en place",
                descEn: "Production and implementation",
              },
              {
                stepFr: "4. Optimisation",
                stepEn: "4. Optimization",
                descFr: "Mesure et amélioration continue",
                descEn: "Measurement and continuous improvement",
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === "fr"
              ? "Prêt à amplifier votre communication ?"
              : "Ready to amplify your communication?"}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {language === "fr"
              ? "Contactez-nous pour discuter de votre projet et recevoir un devis personnalisé."
              : "Contact us to discuss your project and receive a personalized quote."}
          </p>
          <Link href="/contact">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-base py-3 px-8">
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
