import { useI18n } from "@/hooks/useI18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail } from "lucide-react";

export default function About() {
  const { t } = useI18n();

  const locations = [
    {
      city: t("about.lyon"),
      address: "8 rue Jean Élysée Dupuy",
      zipcode: "69410 Champagne-au-Mont-d'Or",
      phone: "+33 (0)4 72 34 51 89",
      email: "lyon@bluevista.com",
      isHeadquarters: true,
    },
    {
      city: t("about.paris"),
      address: "92 Avenue Victor Hugo",
      zipcode: "92100 Boulogne-Billancourt",
      phone: "+33 (0)1 83 64 58 96",
      email: "paris@bluevista.com",
      isHeadquarters: false,
    },
    {
      city: t("about.geneva"),
      address: "Bd Georges-Favon 43",
      zipcode: "1204 Genève, Suisse",
      phone: "+41 (0)22 519 28 48",
      email: "geneva@bluevista.com",
      isHeadquarters: false,
    },
  ];

  const teamRoles = [
    "Cadreurs",
    "Monteurs",
    "Concepteurs",
    "Réalisateurs",
    "Infographistes",
    "Développeurs",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{t("about.title")}</h1>
          <p className="text-xl text-gray-300">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">{t("about.philosophy")}</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {t("about.philosophy_text")}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              {t("about.philosophy_text_2")}
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">{t("about.team")}</h2>

          <div className="max-w-3xl">
            <p className="text-gray-700 text-lg mb-8">
              {t("about.team_description")}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { key: "about.cameraman", label: "cameraman" },
                { key: "about.editor", label: "editor" },
                { key: "about.designer", label: "designer" },
                { key: "about.director", label: "director" },
                { key: "about.graphic_designer", label: "graphic_designer" },
                { key: "about.developer", label: "developer" },
              ].map((role) => (
                <div key={role.label} className="bg-white p-4 rounded-lg shadow-md">
                  <p className="font-bold text-gray-900">{t(role.key)}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-700 text-lg">
              {t("about.team_description_2")}
            </p>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">{t("about.locations")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div key={location.city} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="text-blue-600" size={24} />
                  <h3 className="text-2xl font-bold text-gray-900">{location.city}</h3>
                </div>

                {location.isHeadquarters && (
                  <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {t("about.headquarters")}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 font-medium">{location.address}</p>
                    <p className="text-gray-600">{location.zipcode}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-blue-600 flex-shrink-0" />
                      <a
                        href={`tel:${location.phone}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {location.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-blue-600 flex-shrink-0" />
                      <a
                        href={`mailto:${location.email}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
