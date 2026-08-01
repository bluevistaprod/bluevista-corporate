import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";
import { LANGUAGES, pathForLang } from "@shared/urls";

export function Header() {
  const { language, switchLanguage, t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: "nav.agency", href: "/agency" },
    { key: "nav.offers", href: "/offers" },
    { key: "nav.portfolio", href: "/portfolio" },
    { key: "nav.actualites", href: "/actualites" },
    { key: "nav.contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 hover:text-blue-700 transition flex-shrink-0">
            <img 
              src="/media/bluevista_logo_text_07d6ef3d.png" 
              alt="Blue Vista Logo"
              className="h-12 w-auto flex-shrink-0"
              loading="lazy"
              style={{ aspectRatio: '3/1' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & CTA */}
          <div className="flex items-center gap-4">
            {/*
              Le sélecteur se construit depuis LANGUAGES : ajouter une langue
              ne demande aucune modification ici. Ce sont de vrais liens, pas
              seulement des boutons — un moteur doit pouvoir suivre la version
              étrangère d'une page, et l'utilisateur doit pouvoir l'ouvrir dans
              un nouvel onglet.
            */}
            <nav aria-label="Choix de la langue" className="flex gap-2">
              {LANGUAGES.map(lang => (
                <a
                  key={lang}
                  href={pathForLang(window.location.pathname, lang)}
                  hrefLang={lang}
                  onClick={e => {
                    e.preventDefault();
                    switchLanguage(lang);
                  }}
                  aria-current={language === lang ? "true" : undefined}
                  className={`px-3 py-1 text-sm font-medium rounded transition ${
                    language === lang
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {lang.toUpperCase()}
                </a>
              ))}
            </nav>

            <Link href="/contact" className="hidden md:inline-flex">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <span>{t("contact.title")}</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link 
                key={item.key} 
                href={item.href} 
                className="text-gray-700 hover:text-blue-600 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link href="/contact" className="block">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <span>{t("contact.title")}</span>
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
