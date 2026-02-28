import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.portfolio"), href: "#portfolio" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container-narrow flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <span className={`font-heading text-2xl md:text-3xl font-semibold ${
            isScrolled ? "text-foreground" : "text-ivory"
          }`}>
            Apex<span className="text-gradient-gold">Paving</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors uppercase tracking-wider ${
                isScrolled 
                  ? "text-muted-foreground hover:text-gold" 
                  : "text-ivory/90 hover:text-gold"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA & Language */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="tel:+14165551234"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isScrolled
                ? "text-muted-foreground hover:text-gold"
                : "text-gold hover:text-gold-light"
            }`}
          >
            <Phone className="w-4 h-4" />
            (416) 555-1234
          </a>
          <Button variant="gold" size="lg" onClick={scrollToContact}>
            {t("header.getQuote")}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors ${
              isScrolled ? "text-foreground" : "text-ivory"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-t border-border animate-fade-in">
          <nav className="container-narrow py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <a
                href="tel:+14165551234"
                className="flex items-center gap-2 text-muted-foreground mb-4"
              >
                <Phone className="w-4 h-4" />
                (416) 555-1234
              </a>
              <Button variant="gold" size="lg" className="w-full" onClick={scrollToContact}>
                {t("header.getQuote")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
