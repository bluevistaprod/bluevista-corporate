import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { useState } from "react";
import { ChevronRight, Star, Check } from "lucide-react";

export default function Testimonials() {
  const { language } = useI18n();
  const [formData, setFormData] = useState({
    clientName: "",
    clientTitle: "",
    companyName: "",
    companyWebsite: "",
    sector: "communication",
    projectType: "",
    problem: "",
    solution: "",
    result: "",
    rating: 5,
    email: "",
    phone: "",
    allowWebsite: false,
    allowGoogle: false,
    allowTrustpilot: false,
    allowSocial: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Intégrer l'API de soumission
      console.log("Form data:", formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const sectors = [
    {
      valueFr: "communication",
      valueEn: "communication",
      labelFr: "Communication & Marketing",
      labelEn: "Communication & Marketing",
    },
    {
      valueFr: "events",
      valueEn: "events",
      labelFr: "Événementiel",
      labelEn: "Events",
    },
    {
      valueFr: "immersion",
      valueEn: "immersion",
      labelFr: "Immersion",
      labelEn: "Immersion",
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
              {language === "fr" ? "Partagez votre expérience" : "Share Your Experience"}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {language === "fr"
                ? "Votre témoignage aide les autres à découvrir comment Blue Vista peut transformer leurs projets"
                : "Your testimonial helps others discover how Blue Vista can transform their projects"}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            {language === "fr" ? "Pourquoi partager votre avis ?" : "Why share your feedback?"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                titleFr: "Aidez la communauté",
                titleEn: "Help the community",
                descFr: "Vos retours aident les autres clients à faire le bon choix",
                descEn: "Your feedback helps other clients make the right choice",
              },
              {
                titleFr: "Gagnez une réduction",
                titleEn: "Get a discount",
                descFr: "10% de réduction sur votre prochain projet",
                descEn: "10% discount on your next project",
              },
              {
                titleFr: "Soyez mis en avant",
                titleEn: "Get featured",
                descFr: "Votre témoignage sera partagé sur nos réseaux et site",
                descEn: "Your testimonial will be featured on our networks and site",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <Check size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === "fr" ? benefit.titleFr : benefit.titleEn}
                </h3>
                <p className="text-gray-700">
                  {language === "fr" ? benefit.descFr : benefit.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            {language === "fr" ? "Formulaire de Témoignage" : "Testimonial Form"}
          </h2>

          {submitted && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold">
                {language === "fr"
                  ? "✓ Merci ! Votre témoignage a été reçu et sera modéré avant publication."
                  : "✓ Thank you! Your testimonial has been received and will be moderated before publication."}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Client Info */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {language === "fr" ? "Vos Informations" : "Your Information"}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr" ? "Nom complet *" : "Full name *"}
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={language === "fr" ? "Jean Dupont" : "John Doe"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr" ? "Titre/Fonction *" : "Title/Position *"}
                  </label>
                  <input
                    type="text"
                    name="clientTitle"
                    value={formData.clientTitle}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={language === "fr" ? "Directeur Marketing" : "Marketing Director"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr" ? "Entreprise *" : "Company *"}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={language === "fr" ? "Acme Inc." : "Acme Inc."}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr" ? "Site web (optionnel)" : "Website (optional)"}
                  </label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr" ? "Email *" : "Email *"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="jean@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr" ? "Téléphone (optionnel)" : "Phone (optional)"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {language === "fr" ? "À Propos de Votre Projet" : "About Your Project"}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr" ? "Secteur *" : "Sector *"}
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    {sectors.map((sector) => (
                      <option key={sector.valueFr} value={sector.valueFr}>
                        {language === "fr" ? sector.labelFr : sector.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr" ? "Type de projet *" : "Project type *"}
                  </label>
                  <input
                    type="text"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={language === "fr" ? "Ex: Campagne vidéo" : "Ex: Video campaign"}
                  />
                </div>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {language === "fr" ? "Votre Témoignage" : "Your Testimonial"}
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr"
                      ? "Quel était votre défi/problème ? *"
                      : "What was your challenge/problem? *"}
                  </label>
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={
                      language === "fr"
                        ? "Décrivez le problème que vous aviez..."
                        : "Describe the problem you had..."
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr"
                      ? "Comment Blue Vista a résolu ce problème ? *"
                      : "How did Blue Vista solve this problem? *"}
                  </label>
                  <textarea
                    name="solution"
                    value={formData.solution}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={
                      language === "fr"
                        ? "Expliquez la solution apportée..."
                        : "Explain the solution provided..."
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr"
                      ? "Quel résultat avez-vous obtenu ? (quantifié si possible) *"
                      : "What results did you achieve? (quantified if possible) *"}
                  </label>
                  <textarea
                    name="result"
                    value={formData.result}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={
                      language === "fr"
                        ? "Ex: +50% d'engagement, 100k vues..."
                        : "Ex: +50% engagement, 100k views..."
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "fr" ? "Note globale *" : "Overall rating *"}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                        className={`p-2 rounded-lg transition ${
                          formData.rating >= star
                            ? "bg-yellow-400 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        <Star size={24} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {language === "fr" ? "Autorisations *" : "Permissions *"}
              </h3>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="allowWebsite"
                    checked={formData.allowWebsite}
                    onChange={handleChange}
                    required
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-gray-700">
                    {language === "fr"
                      ? "J'autorise la publication de mon témoignage sur le site Blue Vista *"
                      : "I authorize the publication of my testimonial on the Blue Vista website *"}
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="allowGoogle"
                    checked={formData.allowGoogle}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-gray-700">
                    {language === "fr"
                      ? "J'autorise le partage sur Google My Business"
                      : "I authorize sharing on Google My Business"}
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="allowTrustpilot"
                    checked={formData.allowTrustpilot}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-gray-700">
                    {language === "fr"
                      ? "J'autorise le partage sur Trustpilot"
                      : "I authorize sharing on Trustpilot"}
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="allowSocial"
                    checked={formData.allowSocial}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-gray-700">
                    {language === "fr"
                      ? "J'autorise le partage sur les réseaux sociaux (LinkedIn, Facebook, Instagram)"
                      : "I authorize sharing on social networks (LinkedIn, Facebook, Instagram)"}
                  </span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700 text-base py-3 px-8"
              >
                {loading
                  ? language === "fr"
                    ? "Envoi en cours..."
                    : "Submitting..."
                  : language === "fr"
                    ? "Envoyer mon témoignage"
                    : "Submit my testimonial"}
                <ChevronRight className="ml-2" size={18} />
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            {language === "fr" ? "Questions Fréquentes" : "Frequently Asked Questions"}
          </h2>

          <div className="space-y-6">
            {[
              {
                qFr: "Mes données seront-elles confidentielles ?",
                qEn: "Will my data be kept confidential?",
                aFr: "Oui, vos données personnelles ne seront jamais partagées sans votre consentement explicite.",
                aEn: "Yes, your personal data will never be shared without your explicit consent.",
              },
              {
                qFr: "Puis-je modifier mon témoignage après l'envoi ?",
                qEn: "Can I modify my testimonial after submission?",
                aFr: "Oui, contactez-nous dans les 7 jours suivant l'envoi pour toute modification.",
                aEn: "Yes, contact us within 7 days of submission for any changes.",
              },
              {
                qFr: "Quand mon témoignage sera-t-il publié ?",
                qEn: "When will my testimonial be published?",
                aFr: "Après modération (1-3 jours), vous recevrez une notification de publication.",
                aEn: "After moderation (1-3 days), you will receive a publication notification.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {language === "fr" ? faq.qFr : faq.qEn}
                </h3>
                <p className="text-gray-700">{language === "fr" ? faq.aFr : faq.aEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
