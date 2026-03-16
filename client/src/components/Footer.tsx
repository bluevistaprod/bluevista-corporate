import { useI18n } from "@/hooks/useI18n";
import { Facebook, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const { t } = useI18n();

  const locations = [
    {
      city: t("about.lyon"),
      address: "8 rue Jean Élysée Dupuy, 69410 Champagne-au-Mont-d'Or",
      phone: "+33 (0)4 72 34 51 89",
    },
    {
      city: t("about.paris"),
      address: "92 Avenue Victor Hugo, 92100 Boulogne-Billancourt",
      phone: "+33 (0)1 83 64 58 96",
    },
    {
      city: t("about.geneva"),
      address: "Bd Georges-Favon 43, 1204 Genève, Suisse",
      phone: "+41 (0)22 519 28 48",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/bluevista", label: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com/company/bluevista", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/bluevista", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@bluevista", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405351247/HJdMFahbvq3VamEnwkCWwG/bluevista_logo_round_8ba25f07.png" 
                alt="Blue Vista Logo"
                className="h-12 w-12"
                loading="lazy"
              />
            </div>
            <p className="text-sm text-gray-400">
              Agence de création de contenu com et marketing, événementiel et immersion depuis 2004.
            </p>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-bold text-white mb-4">Nos agences</h3>
            <div className="space-y-4">
              {locations.map((location) => (
                <div key={location.city} className="text-sm">
                  <p className="font-semibold text-white">{location.city}</p>
                  <p className="text-gray-400 text-xs mt-1">{location.address}</p>
                  <p className="text-gray-400 text-xs mt-1">{location.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-400 transition">{t("nav.home")}</a></li>
              <li><a href="/agency" className="hover:text-blue-400 transition">{t("nav.agency")}</a></li>
              <li><a href="/offers" className="hover:text-blue-400 transition">{t("nav.offers")}</a></li>
              <li><a href="/portfolio" className="hover:text-blue-400 transition">{t("nav.portfolio")}</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition">{t("nav.contact")}</a></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">Suivez-nous</h3>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-400" />
                <a href="mailto:contact@bluevistaprod.com" className="hover:text-blue-400 transition">
                  contact@bluevistaprod.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2026 Bluevista Production. {t("footer.rights")}.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/legal" className="hover:text-blue-400 transition">{t("footer.legal")}</a>
            <a href="/privacy" className="hover:text-blue-400 transition">{t("footer.privacy")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
