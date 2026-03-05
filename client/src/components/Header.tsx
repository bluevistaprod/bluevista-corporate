import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

export function Header() {
  const { language, switchLanguage, t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: "nav.home", href: "/" },
    { key: "nav.agency", href: "/agency" },
    { key: "nav.offers", href: "/offers" },
    { key: "nav.portfolio", href: "/portfolio" },
    { key: "nav.blog", href: "/blog" },
    { key: "nav.contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 hover:text-blue-700 transition">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              BV
            </div>
            <span>Blue Vista</span>
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
            <div className="flex gap-2">
              <button
                onClick={() => switchLanguage("fr")}
                className={`px-3 py-1 text-sm font-medium rounded transition ${
                  language === "fr"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => switchLanguage("en")}
                className={`px-3 py-1 text-sm font-medium rounded transition ${
                  language === "en"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                EN
              </button>
            </div>

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
