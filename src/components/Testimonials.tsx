import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Al-Maktoum",
      role: "Interior Designer, Al-Maktoum Interiors",
      quote:
        "Apex Stairs delivered beyond our expectations. The spiral staircase they crafted for our Emirates Hills project became the defining feature of the entire villa. Impeccable craftsmanship.",
      rating: 5,
      location: "Emirates Hills",
    },
    {
      id: 2,
      name: "James Morrison",
      role: "Project Director, Morrison Development",
      quote:
        "Working with Apex on our DIFC tower was seamless. Their ability to handle complex structural requirements while maintaining aesthetic excellence is unmatched in the region.",
      rating: 5,
      location: "DIFC, Dubai",
    },
    {
      id: 3,
      name: "Fatima Hassan",
      role: "Homeowner",
      quote:
        "From the initial consultation to the final installation, the team was professional and attentive. Our glass railing transformed our living space entirely. Worth every dirham.",
      rating: 5,
      location: "Palm Jumeirah",
    },
  ];

  return (
    <section className="section-padding bg-primary">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
            Client Stories
          </span>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl mt-4 text-primary-foreground">
            Trusted by Dubai's Finest
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-charcoal-light/50 backdrop-blur-sm p-8 rounded-sm relative"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-gold/30 absolute top-6 right-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-primary-foreground/90 mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-primary-foreground/10 pt-6">
                <div className="font-semibold text-primary-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-primary-foreground/60 mt-1">
                  {testimonial.role}
                </div>
                <div className="text-xs text-gold mt-2 uppercase tracking-wider">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
