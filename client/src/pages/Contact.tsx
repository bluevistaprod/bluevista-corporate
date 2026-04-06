import { useState, useEffect } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const { language, domain, isLoaded, t } = useI18n();
  const [activeTab, setActiveTab] = useState<"devis" | "recrutement" | "stage">("devis");

  // Load Podio form script in iframe to isolate it
  useEffect(() => {
    const container = document.getElementById("podio-form-container");
    if (container) {
      container.innerHTML = `
        <script src="https://podio.com/webforms/4233499/330872.js"><\/script>
        <script type="text/javascript">
          if (typeof _podioWebForm !== 'undefined') {
            _podioWebForm.render("330872");
          }
        <\/script>
        <noscript>
          <a href="https://podio.com/webforms/4233499/330872" target="_blank">
            ${language === "fr" ? "Veuillez remplir le formulaire" : "Please fill out the form"}
          </a>
        </noscript>
      `;
    }
  }, [activeTab, language]);

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  const tabs = [
    {
      id: "devis",
      label: language === "fr" ? "Demande de devis" : "Request a quote",
    },
    {
      id: "recrutement",
      label: language === "fr" ? "Recrutement" : "Recruitment",
    },
    {
      id: "stage",
      label: language === "fr" ? "Stage" : "Internship",
    },
  ];

  const locations = [
    {
      name: language === "fr" ? "Lyon (Siège social)" : "Lyon (Headquarters)",
      address: "8 rue Jean Élysée Dupuy",
      city: "69410 Champagne-au-Mont-d'Or",
      phone: "+33 (0)4 72 34 51 89",
      lat: 45.8404,
      lng: 4.8251,
    },
    {
      name: "Paris",
      address: "92 Avenue Victor Hugo",
      city: "92100 Boulogne-Billancourt",
      phone: "+33 (0)1 83 64 58 96",
      lat: 48.8355,
      lng: 2.2399,
    },
    {
      name: "Genève",
      address: "Bd Georges-Favon 43",
      city: "1204 Genève, Suisse",
      phone: "+41 (0)22 519 28 48",
      lat: 46.2044,
      lng: 6.1432,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">
            {language === "fr" ? "Nous contacter" : "Contact Us"}
          </h1>
          <p className="text-xl text-gray-300">
            {language === "fr"
              ? "Nous sommes à votre écoute pour discuter de votre projet"
              : "We're here to discuss your project"}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Form with Tabs */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                {language === "fr" ? "Envoyez-nous un message" : "Send us a message"}
              </h2>

              {/* Tabs */}
              <div className="flex gap-2 mb-8 border-b border-gray-200 flex-wrap">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "devis" | "recrutement" | "stage")}
                    className={`px-4 py-3 font-medium border-b-2 transition text-sm md:text-base ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Podio Form Container */}
              <div className="bg-gray-50 p-6 rounded-lg min-h-96 border border-gray-200">
                <div id="podio-form-container" className="podio-form-wrapper">
                  <p className="text-gray-600 text-center py-8">
                    {language === "fr"
                      ? "Chargement du formulaire..."
                      : "Loading form..."}
                  </p>
                </div>
              </div>

              {/* Alternative: Simple Form Fallback */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">
                  {language === "fr"
                    ? "Si le formulaire ne s'affiche pas, veuillez nous contacter directement par email ou téléphone."
                    : "If the form doesn't display, please contact us directly by email or phone."}
                </p>
              </div>
            </div>

            {/* Right: Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                {language === "fr" ? "Nos coordonnées" : "Our Contact Info"}
              </h2>

              <div className="space-y-8">
                {locations.map((location, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      {location.name}
                    </h3>
                    <p className="text-gray-600 mb-1 ml-7">{location.address}</p>
                    <p className="text-gray-600 mb-2 ml-7">{location.city}</p>
                    <p className="text-gray-600 font-medium ml-7 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      {location.phone}
                    </p>
                  </div>
                ))}

                {/* Email */}
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    {language === "fr" ? "Email" : "Email"}
                  </h3>
                  <a
                    href="mailto:contact@bluevista.com"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    contact@bluevista.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            {language === "fr" ? "Nos bureaux" : "Our Offices"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                {/* Map Iframe */}
                <div className="w-full h-64 bg-gray-200">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDxT0xo8IltNKWB53R-4GewQIHPbXHrz9s&q=${encodeURIComponent(
                      location.address + " " + location.city
                    )}`}
                  ></iframe>
                </div>

                {/* Location Info */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">{location.name}</h3>
                  <p className="text-gray-600 mb-1">{location.address}</p>
                  <p className="text-gray-600 mb-3">{location.city}</p>
                  <a
                    href={`tel:${location.phone.replace(/\s/g, "")}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {location.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Load Podio script at the end to avoid conflicts */}
      <script
        src="https://podio.com/webforms/4233499/330872.js"
        async
        defer
      ></script>
    </div>
  );
}
