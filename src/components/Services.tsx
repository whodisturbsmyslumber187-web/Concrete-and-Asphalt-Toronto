import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "./ScrollReveal";
import residentialImage from "@/assets/residential-staircase.jpg";
import commercialImage from "@/assets/commercial-staircase.jpg";

const Services = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    {
      id: "residential",
      titleKey: "services.residential",
      subtitleKey: "services.res.title",
      descKey: "services.res.desc",
      image: residentialImage,
      features: ["services.res.item1", "services.res.item2", "services.res.item3", "services.res.item4"],
      icon: Home,
    },
    {
      id: "commercial",
      titleKey: "services.commercial",
      subtitleKey: "services.com.title",
      descKey: "services.com.desc",
      image: commercialImage,
      features: ["services.com.item1", "services.com.item2", "services.com.item3", "services.com.item4"],
      icon: Building2,
    },
  ];

  return (
    <section id="services" className="section-padding bg-gradient-luxury">
      <div className="container-narrow">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
              {t("services.label")}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl mt-4 mb-6">
              {t("services.title")}
            </h2>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} direction={index === 0 ? "left" : "right"} delay={0.1 * index}>
              <div className="group relative bg-card rounded-sm overflow-hidden shadow-medium hover:shadow-luxury transition-all duration-500">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={t(service.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gold/10 rounded-sm">
                      <service.icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-muted-foreground text-sm uppercase tracking-wider">
                      {t(service.subtitleKey)}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl md:text-3xl mb-4">
                    {t(service.titleKey)}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t(service.descKey)}
                  </p>

                  {/* Features */}
                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((featureKey) => (
                      <li key={featureKey} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                        <span>{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="elegant" className="group/btn" onClick={scrollToContact}>
                    {t("services.learnMore")}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
