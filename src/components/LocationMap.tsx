import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const LocationMap = () => {
  const { t } = useLanguage();

  return (
    <section id="location" className="section-padding bg-secondary">
      <div className="container-narrow">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
              {t("map.label")}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mt-4 mb-4">
              {t("map.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("map.desc")}
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="rounded-sm overflow-hidden shadow-luxury border border-border">
            <iframe
              title="Apex Paving & Concrete Location - Toronto, Ontario"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92452.56067785655!2d-79.45169635!3d43.6532261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LocationMap;
