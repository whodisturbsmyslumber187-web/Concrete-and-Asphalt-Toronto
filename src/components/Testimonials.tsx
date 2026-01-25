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
        <div className="text-center mb-10 md:mb-16">
          <span className="text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm font-medium">
            Client Stories
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl mt-3 md:mt-4 text-primary-foreground">
            Trusted by Dubai's Finest
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-charcoal-light/50 backdrop-blur-sm p-5 md:p-8 rounded-sm relative"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 md:w-10 md:h-10 text-gold/30 absolute top-4 right-4 md:top-6 md:right-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-4 md:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-primary-foreground/90 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
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
