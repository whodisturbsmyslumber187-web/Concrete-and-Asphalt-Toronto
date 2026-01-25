import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const slides = [heroSlide1, heroSlide2, heroSlide3];

const Hero = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt={`Luxury staircase ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30" />

      {/* Slide Indicators */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 md:w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-gold" : "bg-primary-foreground/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-narrow py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className="animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <span className="inline-block text-gold-light uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm font-medium mb-4 md:mb-6">
              {t("hero.tagline")}
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            className="animate-fade-up opacity-0 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-primary-foreground leading-tight mb-4 md:mb-6"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            {t("hero.title1")}{" "}
            <span className="text-gradient-gold">{t("hero.title2")}</span>{" "}
            {t("hero.title3")}
          </h1>

          {/* Subheadline */}
          <p 
            className="animate-fade-up opacity-0 text-base md:text-lg lg:text-xl text-primary-foreground/80 mb-8 md:mb-10 max-w-xl leading-relaxed"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div 
            className="animate-fade-up opacity-0 flex flex-col sm:flex-row gap-3 sm:gap-4"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <Button 
              variant="gold" 
              size="xl" 
              className="group w-full sm:w-auto justify-center"
              onClick={() => scrollToSection("contact")}
            >
              {t("hero.cta1")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl"
              className="w-full sm:w-auto justify-center"
              onClick={() => scrollToSection("portfolio")}
            >
              {t("hero.cta2")}
            </Button>
          </div>

          {/* Trust Badges */}
          <div 
            className="animate-fade-up opacity-0 mt-10 md:mt-16 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 md:gap-8 text-primary-foreground/60 text-xs sm:text-sm"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
              <span>{t("hero.badge1")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
              <span>{t("hero.badge2")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
              <span>{t("hero.badge3")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
