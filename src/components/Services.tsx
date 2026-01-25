import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Building2 } from "lucide-react";
import residentialImage from "@/assets/residential-staircase.jpg";
import commercialImage from "@/assets/commercial-staircase.jpg";

const Services = () => {
  const services = [
    {
      id: "residential",
      title: "Residential",
      subtitle: "Luxury Homes & Villas",
      description:
        "Transform your home with custom spiral staircases, floating designs, and elegant glass railings. From Emirates Hills estates to Palm Jumeirah villas, we craft pieces that become the centerpiece of your living space.",
      image: residentialImage,
      features: [
        "Custom Spiral Staircases",
        "Floating Glass Designs",
        "Oak & Marble Treads",
        "Brushed Gold Handrails",
      ],
      icon: Home,
    },
    {
      id: "commercial",
      title: "Commercial",
      subtitle: "Corporate & Hospitality",
      description:
        "Large-scale architectural metalwork for Dubai's most prestigious developments. We deliver fire-rated solutions, structural steel, and statement pieces for offices, hotels, and retail spaces.",
      image: commercialImage,
      features: [
        "Fire-Rated Solutions",
        "Structural Steel",
        "Cable Rail Systems",
        "Architectural Metalwork",
      ],
      icon: Building2,
    },
  ];

  return (
    <section id="services" className="section-padding bg-gradient-luxury">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
            Our Expertise
          </span>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl mt-4 mb-6">
            Tailored Solutions for Every Space
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From intimate residential projects to grand commercial installations,
            we bring precision engineering and artistic vision to every staircase.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-card rounded-sm overflow-hidden shadow-medium hover:shadow-luxury transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
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
                    {service.subtitle}
                  </span>
                </div>

                <h3 className="font-heading text-2xl md:text-3xl mb-4">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="elegant" className="group/btn">
                  Explore {service.title}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
