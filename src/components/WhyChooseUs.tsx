import { Shield, Clock, Palette, Award, Wrench, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "./ScrollReveal";
import detailImage from "@/assets/detail-railing.jpg";

const WhyChooseUs = () => {
  const { t } = useLanguage();
  
  const features = [
    { icon: Shield, titleKey: "why.f1.title", descKey: "why.f1.desc" },
    { icon: Palette, titleKey: "why.f2.title", descKey: "why.f2.desc" },
    { icon: Clock, titleKey: "why.f3.title", descKey: "why.f3.desc" },
    { icon: Award, titleKey: "why.f4.title", descKey: "why.f4.desc" },
    { icon: Wrench, titleKey: "why.f5.title", descKey: "why.f5.desc" },
    { icon: Leaf, titleKey: "why.f6.title", descKey: "why.f6.desc" },
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-luxury">
                <img src={detailImage} alt="Professional concrete work close-up" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-gold text-primary p-4 md:p-6 shadow-luxury">
                <div className="text-3xl md:text-4xl font-heading font-bold">25+</div>
                <div className="text-xs md:text-sm uppercase tracking-wider">{t("why.years")}</div>
              </div>
            </div>
          </ScrollReveal>
          
          <div>
            <ScrollReveal>
              <span className="text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm font-medium">{t("why.label")}</span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-3 md:mt-4 mb-4 md:mb-6">{t("why.title")}</h2>
              <p className="text-muted-foreground text-base md:text-lg mb-8 md:mb-10 leading-relaxed">{t("why.desc")}</p>
            </ScrollReveal>
            
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <ScrollReveal key={feature.titleKey} delay={0.1 * index}>
                  <div className="flex gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-sm flex items-center justify-center">
                      <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-base mb-1">{t(feature.titleKey)}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
