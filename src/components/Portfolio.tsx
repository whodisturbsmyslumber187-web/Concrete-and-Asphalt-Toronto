import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Project images
import project1Img1 from "@/assets/project1-img1.jpg";
import project1Img2 from "@/assets/project1-img2.jpg";
import project1Img3 from "@/assets/project1-img3.jpg";
import project2Img1 from "@/assets/project2-img1.jpg";
import project2Img2 from "@/assets/project2-img2.jpg";
import project2Img3 from "@/assets/project2-img3.jpg";
import project3Img1 from "@/assets/project3-img1.jpg";
import project3Img2 from "@/assets/project3-img2.jpg";
import project3Img3 from "@/assets/project3-img3.jpg";
import project4Img1 from "@/assets/project4-img1.jpg";
import project4Img2 from "@/assets/project4-img2.jpg";
import project4Img3 from "@/assets/project4-img3.jpg";

const Portfolio = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      titleKey: "project1.title",
      category: "portfolio.residential",
      descKey: "project1.desc",
      images: [project1Img1, project1Img2, project1Img3],
    },
    {
      id: 2,
      titleKey: "project2.title",
      category: "portfolio.commercial",
      descKey: "project2.desc",
      images: [project2Img1, project2Img2, project2Img3],
    },
    {
      id: 3,
      titleKey: "project3.title",
      category: "portfolio.hospitality",
      descKey: "project3.desc",
      images: [project3Img1, project3Img2, project3Img3],
    },
    {
      id: 4,
      titleKey: "project4.title",
      category: "portfolio.residential",
      descKey: "project4.desc",
      images: [project4Img1, project4Img2, project4Img3],
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="section-padding bg-secondary">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
              {t("portfolio.label")}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl mt-4">
              {t("portfolio.title")}
            </h2>
          </div>
          <Button variant="elegant" className="group self-start md:self-auto" onClick={scrollToContact}>
            {t("portfolio.viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-sm bg-card shadow-soft hover:shadow-luxury transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={t(project.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-gold text-sm uppercase tracking-wider">{t(project.category)}</span>
                <h3 className="font-heading text-2xl text-primary-foreground mt-2 mb-2">{t(project.titleKey)}</h3>
                <p className="text-primary-foreground/80 text-sm mb-4 line-clamp-2">{t(project.descKey)}</p>
                <button className="flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all">
                  {t("portfolio.viewProject")}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-gold-light text-xs uppercase tracking-wider">{t(project.category)}</span>
                <h3 className="font-heading text-xl text-primary-foreground mt-1">{t(project.titleKey)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          <button className="absolute top-6 right-6 text-primary-foreground hover:text-gold transition-colors" onClick={() => setSelectedProject(null)}>
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-6xl w-full" onClick={e => e.stopPropagation()}>
            {(() => {
              const project = projects.find(p => p.id === selectedProject);
              if (!project) return null;
              return (
                <div>
                  <h3 className="font-heading text-3xl text-primary-foreground mb-4">{t(project.titleKey)}</h3>
                  <p className="text-primary-foreground/80 mb-6">{t(project.descKey)}</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {project.images.map((img, idx) => (
                      <img key={idx} src={img} alt={`${t(project.titleKey)} ${idx + 1}`} className="w-full h-64 object-cover rounded-sm" />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
