import { Shield, Clock, Palette, Award, Wrench, Leaf } from "lucide-react";
import detailImage from "@/assets/detail-railing.jpg";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "316 Marine Grade Steel",
      description:
        "Premium 316-grade stainless steel engineered for Dubai's coastal climate, ensuring lifetime corrosion resistance.",
    },
    {
      icon: Palette,
      title: "Bespoke Customization",
      description:
        "Every project is uniquely designed to complement your architecture, from material selection to final finish.",
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description:
        "Precision planning and in-house fabrication ensure your project is completed on schedule, every time.",
    },
    {
      icon: Award,
      title: "Dubai Municipality Certified",
      description:
        "Fully licensed and compliant with all UAE building codes, safety standards, and structural requirements.",
    },
    {
      icon: Wrench,
      title: "Turnkey Solutions",
      description:
        "From concept design through CNC fabrication to professional installation — we handle everything.",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description:
        "Eco-conscious manufacturing with recyclable materials and energy-efficient processes.",
    },
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-sm shadow-luxury">
              <img
                src={detailImage}
                alt="Premium stainless steel railing detail"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-gold text-primary p-6 shadow-luxury">
              <div className="text-4xl font-heading font-bold">15+</div>
              <div className="text-sm uppercase tracking-wider">Years of Excellence</div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
              Why Apex Stairs
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mt-4 mb-6">
              Craftsmanship Meets Innovation
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              At Apex Stairs & Railings, we combine traditional metalworking artistry
              with cutting-edge CNC precision. Our commitment to quality materials
              and meticulous attention to detail has made us the trusted choice for
              Dubai's most prestigious properties.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-sm flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
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
