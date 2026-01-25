import { Instagram, Linkedin, Facebook, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    services: [
      { label: "Residential Staircases", href: "#services" },
      { label: "Commercial Solutions", href: "#services" },
      { label: "Glass Railings", href: "#services" },
      { label: "Steel Fabrication", href: "#services" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Our Portfolio", href: "#portfolio" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Licensing Info", href: "#" },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <span className="font-heading text-xl md:text-2xl font-semibold">
              Apex<span className="text-gradient-gold">Stairs</span>
            </span>
            <p className="text-primary-foreground/70 mt-3 md:mt-4 mb-4 md:mb-6 text-xs md:text-sm leading-relaxed">
              Elevating Dubai's architectural landscape with bespoke staircases
              and premium railings since 2008.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-sm flex items-center justify-center hover:bg-gold hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-sm flex items-center justify-center hover:bg-gold hover:text-primary transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-sm flex items-center justify-center hover:bg-gold hover:text-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-sm mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-sm mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / License */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-sm mb-6">
              Certifications
            </h4>
            <div className="space-y-4 text-sm text-primary-foreground/70">
              <p>
                <span className="text-primary-foreground font-medium">
                  Dubai Municipality License:
                </span>
                <br />
                #DM-2024-STEEL-8847
              </p>
              <p>
                <span className="text-primary-foreground font-medium">
                  ISO Certified:
                </span>
                <br />
                ISO 9001:2015
              </p>
              <p>
                <span className="text-primary-foreground font-medium">
                  Trade License:
                </span>
                <br />
                #TL-873294
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-narrow py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2024 Apex Stairs & Railings. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-gold text-primary rounded-sm flex items-center justify-center hover:bg-gold-light transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
