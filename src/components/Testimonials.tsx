import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "R. & S. Mitchell",
      role: "Homeowners",
      quote:
        "Apex Paving completely transformed our crumbling driveway. The stamped concrete looks incredible and the crew was professional from day one. Neighbours keep asking who did the work!",
      rating: 5,
      location: "Southern Ontario",
    },
    {
      id: 2,
      name: "J. Pearson",
      role: "Commercial Property Manager",
      quote:
        "We've used Apex for three parking lot repaving projects now. They work fast, stay on budget, and their asphalt quality is the best we've seen. Our tenants are always impressed.",
      rating: 5,
      location: "Greater Toronto Area",
    },
    {
      id: 3,
      name: "A. & M. Rivera",
      role: "Homeowners",
      quote:
        "From the free estimate to the final seal coat, everything was seamless. Our new patio and walkway survived their first Ontario winter without a single crack. Worth every penny.",
      rating: 5,
      location: "Ontario",
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
            Trusted Across the GTA
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
