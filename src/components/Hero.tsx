import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-staircase.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury spiral staircase with glass railings"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-narrow py-32">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className="animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <span className="inline-block text-gold-light uppercase tracking-[0.3em] text-sm font-medium mb-6">
              Premium Craftsmanship Since 2008
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            className="animate-fade-up opacity-0 font-heading text-4xl md:text-5xl lg:text-7xl font-semibold text-primary-foreground leading-tight mb-6"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            Elevating Dubai's Skyline with Custom{" "}
            <span className="text-gradient-gold">Steel & Glass</span> Artistry
          </h1>

          {/* Subheadline */}
          <p 
            className="animate-fade-up opacity-0 text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl leading-relaxed"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            Bespoke staircases and railings designed for discerning homeowners, architects, and commercial developers across the UAE.
          </p>

          {/* CTAs */}
          <div 
            className="animate-fade-up opacity-0 flex flex-col sm:flex-row gap-4"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <Button variant="gold" size="xl" className="group">
              Request a Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl">
              View Our Projects
            </Button>
          </div>

          {/* Trust Badges */}
          <div 
            className="animate-fade-up opacity-0 mt-16 flex flex-wrap gap-8 text-primary-foreground/60 text-sm"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full" />
              <span>Dubai Municipality Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full" />
              <span>316 Marine Grade Steel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full" />
              <span>15+ Years Experience</span>
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
