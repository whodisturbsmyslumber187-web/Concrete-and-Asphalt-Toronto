import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Emirates Hills Villa",
      category: "Residential",
      description: "Sculptural spiral staircase with curved glass balustrade and bronze handrails.",
      image: portfolio1,
    },
    {
      id: 2,
      title: "DIFC Corporate HQ",
      category: "Commercial",
      description: "Minimalist floating staircase connecting four office floors with seamless design.",
      image: portfolio2,
    },
    {
      id: 3,
      title: "Downtown Penthouse",
      category: "Residential",
      description: "Industrial-chic steel staircase with cable railings and blackened steel finish.",
      image: portfolio3,
    },
  ];

  return (
    <section id="portfolio" className="section-padding bg-secondary">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
              Our Work
            </span>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl mt-4">
              Featured Projects
            </h2>
          </div>
          <Button variant="elegant" className="group self-start md:self-auto">
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-sm bg-card shadow-soft hover:shadow-luxury transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-gold text-sm uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-heading text-2xl text-primary-foreground mt-2 mb-2">
                  {project.title}
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  {project.description}
                </p>
                <button className="flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all">
                  View Project
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Static Label (visible by default) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-gold-light text-xs uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-heading text-xl text-primary-foreground mt-1">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
