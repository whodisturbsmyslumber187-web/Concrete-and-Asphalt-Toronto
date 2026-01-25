import { Shield, Clock, Palette, Award, Wrench, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-sm shadow-luxury">
              <img src={detailImage} alt="Premium stainless steel railing detail" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold text-primary p-6 shadow-luxury rtl:-left-6 rtl:right-auto">
              <div className="text-4xl font-heading font-bold">60+</div>
              <div className="text-sm uppercase tracking-wider">{t("why.years")}</div>
            </div>
          </div>
          <div>
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">{t("why.label")}</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mt-4 mb-6">{t("why.title")}</h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">{t("why.desc")}</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.titleKey} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-sm flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t(feature.titleKey)}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
