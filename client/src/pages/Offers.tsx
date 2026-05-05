import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function Offers() {
  const { t, language } = useI18n();

  // Image URLs for each offer
  const offerImages = {
    communication: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405351247/HJdMFahbvq3VamEnwkCWwG/offre-communication-marketing-iDsDxBYRZC7y4BrrJwnv8a.webp",
    event: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405351247/HJdMFahbvq3VamEnwkCWwG/offre-evenementiel-49kyautDAAq2aNjhepiGnu.webp",
    immersion: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405351247/HJdMFahbvq3VamEnwkCWwG/offre-immersion-LEXLDZaBYdRoZMvB677U2g.webp",
  };

  const offers = [
    {
      id: "communication",
      titleFr: "Amplifiez votre présence et convertissez votre audience en clients",
      titleEn: "Amplify your presence and convert your audience into customers",
      problemFr: "Vous avez un message puissant, mais il se perd dans le bruit. Votre audience ne vous trouve pas, ne vous comprend pas, ou ne passe pas à l'action. Vos concurrents captent l'attention que vous méritez.",
      problemEn: "You have a powerful message, but it gets lost in the noise. Your audience doesn't find you, doesn't understand you, or doesn't take action. Your competitors capture the attention you deserve.",
      benefitFr: "Transformez votre communication en moteur de croissance. Nous créons une stratégie cohérente qui positionne votre marque, engage votre audience et génère des résultats mesurables.",
      benefitEn: "Transform your communication into a growth engine. We create a coherent strategy that positions your brand, engages your audience and generates measurable results.",
      servicesFr: [
        "Podcasts & Audio : Production complète, montage, distribution",
        "Réseaux sociaux : Contenus optimisés par plateforme, stratégie de publication",
        "Motion design & Animation : Explainers, intros dynamiques, infographies",
        "Documentaires & Reportages : Contenus longs-formes avec impact",
        "Vidéomapping & Expériences : Créations immersives pour événements",
        "Optimisation & Testing : A/B testing, variantes, amélioration continue",
      ],
      servicesEn: [
        "Podcasts & Audio: Complete production, editing, distribution",
        "Social Media: Platform-optimized content, publishing strategy",
        "Motion Design & Animation: Explainers, dynamic intros, infographics",
        "Documentaries & Reports: Long-form impactful content",
        "Videomapping & Experiences: Immersive creations for events",
        "Optimization & Testing: A/B testing, variants, continuous improvement",
      ],
      image: offerImages.communication,
      color: "from-blue-600 to-blue-400",
      accentColor: "bg-blue-600",
    },
    {
      id: "event",
      titleFr: "Créez des événements inoubliables qui marquent les esprits",
      titleEn: "Create unforgettable events that make a lasting impression",
      problemFr: "Organiser un événement impactant demande une coordination complexe entre logistique, créativité et technologie. Vous risquez que votre événement soit oublié dès le lendemain, ou qu'il ne génère pas le ROI attendu.",
      problemEn: "Organizing an impactful event requires complex coordination between logistics, creativity and technology. Your event risks being forgotten the next day, or failing to generate the expected ROI.",
      benefitFr: "Transformez votre événement en expérience mémorable. De la conception créative à la couverture professionnelle, nous créons des moments qui renforcent votre marque, génèrent du buzz et maximisent votre ROI.",
      benefitEn: "Transform your event into a memorable experience. From creative design to professional coverage, we create moments that strengthen your brand, generate buzz and maximize your ROI.",
      servicesFr: [
        "Conception & Scénographie : Design créatif, agencement spatial, ambiance visuelle",
        "Couverture professionnelle : Photographie, vidéo d'événement, streaming en direct",
        "Vidéomapping & Projections : Installations immersives, mapping architectural",
        "Événementiel virtuel & Hybride : Streaming de qualité, interaction digitale",
        "Production & Coordination : Gestion complète, timing précis, logistique créative",
        "Contenu post-événement : Montage highlights, reels sociaux, reportage complet",
      ],
      servicesEn: [
        "Design & Scenography: Creative design, spatial layout, visual atmosphere",
        "Professional Coverage: Photography, event video, live streaming",
        "Videomapping & Projections: Immersive installations, architectural mapping",
        "Virtual & Hybrid Events: Quality streaming, digital interaction",
        "Production & Coordination: Complete management, precise timing, creative logistics",
        "Post-Event Content: Highlights editing, social reels, complete report",
      ],
      image: offerImages.event,
      color: "from-purple-600 to-purple-400",
      accentColor: "bg-purple-600",
    },
    {
      id: "immersion",
      titleFr: "Plongez votre audience dans des mondes sans limites",
      titleEn: "Immerse your audience in limitless worlds",
      problemFr: "Vos clients veulent des expériences, pas juste du contenu. La réalité virtuelle et augmentée semblent complexes et coûteuses. Vous ne savez pas comment les utiliser pour créer un vrai différenciel compétitif.",
      problemEn: "Your customers want experiences, not just content. Virtual and augmented reality seem complex and expensive. You don't know how to use them to create real competitive advantage.",
      benefitFr: "Offrez à votre audience une expérience immersive qui la captive et la marque à jamais. Nous transformons votre vision en réalité virtuelle, augmentée ou 360°, créant des moments inoubliables et des résultats mesurables.",
      benefitEn: "Offer your audience an immersive experience that captivates and marks them forever. We transform your vision into virtual reality, augmented reality or 360°, creating unforgettable moments and measurable results.",
      servicesFr: [
        "Réalité virtuelle (VR) : Expériences immersives interactives, visites virtuelles",
        "Réalité augmentée (AR) : Filtres interactifs, expériences mobiles, catalogues 3D",
        "Vidéo & Photographie 360° : Capture immersive, streaming 360°, visite virtuelle",
        "Modélisation 3D & Animation : Environnements 3D, modèles interactifs",
        "Expériences mixtes : Combinaison VR/AR/360° pour résultats maximaux",
        "Plateforme & Distribution : Hébergement sécurisé, accès contrôlé, analytics",
      ],
      servicesEn: [
        "Virtual Reality (VR): Interactive immersive experiences, virtual tours",
        "Augmented Reality (AR): Interactive filters, mobile experiences, 3D catalogs",
        "360° Video & Photography: Immersive capture, 360° streaming, virtual tour",
        "3D Modeling & Animation: 3D environments, interactive models",
        "Mixed Experiences: Combination of VR/AR/360° for maximum results",
        "Platform & Distribution: Secure hosting, controlled access, analytics",
      ],
      image: offerImages.immersion,
      color: "from-cyan-600 to-cyan-400",
      accentColor: "bg-cyan-600",
    },
  ];

  const processSteps = [
    {
      stepFr: "ÉCOUTE",
      stepEn: "LISTEN",
      descFr: "Nous écoutons vraiment. Vos objectifs, votre audience, vos contraintes - tout compte. C'est la fondation de chaque projet réussi.",
      descEn: "We really listen. Your goals, your audience, your constraints - everything matters. This is the foundation of every successful project.",
    },
    {
      stepFr: "STRATÉGIE",
      stepEn: "STRATEGY",
      descFr: "Nous définissons l'approche créative et technique optimale. Pas de prise de tête - juste une stratégie claire et actionnable.",
      descEn: "We define the optimal creative and technical approach. No headaches - just clear and actionable strategy.",
    },
    {
      stepFr: "CRÉATION",
      stepEn: "CREATE",
      descFr: "Notre équipe produit du contenu de haut niveau. Vidéos, podcasts, expériences immersives - tout avec excellence et passion.",
      descEn: "Our team produces high-level content. Videos, podcasts, immersive experiences - all with excellence and passion.",
    },
    {
      stepFr: "OPTIMISATION",
      stepEn: "OPTIMIZE",
      descFr: "Nous testons, mesurons et améliorons continuellement. Les données guident nos décisions créatives.",
      descEn: "We test, measure and continuously improve. Data guides our creative decisions.",
    },
    {
      stepFr: "IMPACT",
      stepEn: "IMPACT",
      descFr: "Nous mesurons les résultats réels. Vous voyez le ROI, pas juste les beaux chiffres - la vraie croissance.",
      descEn: "We measure real results. You see the ROI, not just pretty numbers - real growth.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {language === "fr"
                ? "Trois offres créatives pour transformer votre communication"
                : "Three creative services to transform your communication"}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {language === "fr"
                ? "De la stratégie à la réalisation, nous créons des expériences qui convertissent."
                : "From strategy to execution, we create experiences that convert."}
            </p>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          {offers.map((offer, index) => (
            <div key={offer.id} className="mb-48 last:mb-0">
              {/* Section Title */}
              <h2 className="text-5xl font-bold text-gray-900 mb-20 leading-tight">
                {offer.id === "communication"
                  ? language === "fr"
                    ? "Communication & Marketing"
                    : "Communication & Marketing"
                  : offer.id === "event"
                    ? language === "fr"
                      ? "Événementiel"
                      : "Events"
                    : language === "fr"
                      ? "Immersion"
                      : "Immersion"}
              </h2>

              {/* Alternating layout with proper alignment */}
              <div
                className={`grid md:grid-cols-2 gap-20 items-start ${
                  index % 2 === 1 ? "md:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                  <div className="rounded-lg overflow-hidden shadow-2xl">
                    <img
                      src={offer.image}
                      alt={language === "fr" ? offer.titleFr : offer.titleEn}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                  {/* Problem Section */}
                  <div className="mb-12">
                    <div className={`inline-block ${offer.accentColor} text-white px-4 py-2 rounded-full text-sm font-semibold mb-6`}>
                      {language === "fr" ? "LE DÉFI" : "THE CHALLENGE"}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {language === "fr" ? offer.problemFr : offer.problemEn}
                    </p>
                  </div>

                  {/* Benefit Section */}
                  <div className="mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {language === "fr" ? offer.titleFr : offer.titleEn}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {language === "fr" ? offer.benefitFr : offer.benefitEn}
                    </p>
                  </div>

                  {/* Services */}
                  <div className="mb-12">
                    <h4 className="text-xl font-bold text-gray-900 mb-6">
                      {language === "fr" ? "Nos services" : "Our services"}
                    </h4>
                    <ul className="space-y-4">
                      {(language === "fr" ? offer.servicesFr : offer.servicesEn).map(
                        (service, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <ArrowRight
                              size={20}
                              className={`${offer.accentColor.replace("bg-", "text-")} flex-shrink-0 mt-1`}
                            />
                            <span className="text-gray-700 leading-relaxed">{service}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-4">
                    <a href={`/offers/${offer.id === 'communication' ? 'communication' : offer.id === 'event' ? 'events' : 'immersion'}`} className="inline-block">
                      <Button className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-base py-3 px-8">
                        {language === "fr" ? "En savoir plus" : "Learn More"}
                        <ChevronRight className="ml-2" size={18} />
                      </Button>
                    </a>
                    <a href="/contact" className="inline-block">
                      <Button className={`${offer.accentColor} hover:opacity-90 text-white text-base py-3 px-8`}>
                        {language === "fr" ? "Demander un devis" : "Request a Quote"}
                        <ChevronRight className="ml-2" size={18} />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Process Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {language === "fr"
                ? "Notre Processus Créatif"
                : "Our Creative Process"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === "fr"
                ? "Les 5 étapes qui transforment votre vision en réalité"
                : "The 5 steps that transform your vision into reality"}
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Connector line */}
                {idx < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-1 bg-gradient-to-r from-blue-400 to-transparent"></div>
                )}

                {/* Card */}
                <div className="relative bg-white border-2 border-blue-600 rounded-lg p-8 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {language === "fr" ? step.stepFr : step.stepEn}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {language === "fr" ? step.descFr : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-20 text-gray-900 leading-tight">
            {language === "fr"
              ? "Pourquoi Choisir Blue Vista ?"
              : "Why Choose Blue Vista?"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                titleFr: "20+ ans d'expertise",
                titleEn: "20+ years of expertise",
                descFr:
                  "Depuis 2004, nous créons des contenus vidéo pour les plus grandes marques et agences.",
                descEn:
                  "Since 2004, we have created video content for the biggest brands and agencies.",
              },
              {
                titleFr: "Équipe créative polyvalente",
                titleEn: "Versatile creative team",
                descFr:
                  "Réalisateurs, monteurs, infographistes, développeurs - une boîte de prod complète et réactive.",
                descEn:
                  "Directors, editors, graphic designers, developers - a complete and reactive production company.",
              },
              {
                titleFr: "Présence multi-régionale",
                titleEn: "Multi-regional presence",
                descFr:
                  "Agences à Lyon, Paris et Genève pour vous servir au plus proche de vos besoins.",
                descEn:
                  "Offices in Lyon, Paris and Geneva to serve you as close as possible to your needs.",
              },
              {
                titleFr: "Technologie de pointe",
                titleEn: "Cutting-edge technology",
                descFr:
                  "Équipements dernière génération et expertise en technologies émergentes (VR, AR, 360°).",
                descEn:
                  "State-of-the-art equipment and expertise in emerging technologies (VR, AR, 360°).",
              },
              {
                titleFr: "Résultats mesurables",
                titleEn: "Measurable results",
                descFr:
                  "Nos vidéos génèrent +30% de visibilité et augmentent les conversions de manière significative.",
                descEn:
                  "Our videos generate +30% visibility and significantly increase conversions.",
              },
              {
                titleFr: "Approche personnalisée",
                titleEn: "Personalized approach",
                descFr:
                  "Chaque projet est unique et reçoit une attention créative et stratégique particulière.",
                descEn:
                  "Each project is unique and receives special creative and strategic attention.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {language === "fr" ? item.titleFr : item.titleEn}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === "fr" ? item.descFr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === "fr"
              ? "Prêt à transformer votre communication ?"
              : "Ready to transform your communication?"}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {language === "fr"
              ? "Contactez-nous pour discuter de votre projet et recevoir un devis personnalisé."
              : "Contact us to discuss your project and receive a personalized quote."}
          </p>
          <a href="/contact" className="inline-block">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-base py-3 px-8">
              {language === "fr" ? "Demander un devis" : "Request a Quote"}
              <ChevronRight className="ml-2" size={18} />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
