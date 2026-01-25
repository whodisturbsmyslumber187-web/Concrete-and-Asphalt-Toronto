import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

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
import project5Img1 from "@/assets/project5-img1.jpg";
import project5Img2 from "@/assets/project5-img2.jpg";
import project5Img3 from "@/assets/project5-img3.jpg";
import project6Img1 from "@/assets/project6-img1.jpg";
import project6Img2 from "@/assets/project6-img2.jpg";
import project6Img3 from "@/assets/project6-img3.jpg";
import project7Img1 from "@/assets/project7-img1.jpg";

const Portfolio = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    {
      id: 5,
      titleKey: "project5.title",
      category: "portfolio.hospitality",
      descKey: "project5.desc",
      images: [project5Img1, project5Img2, project5Img3],
    },
    {
      id: 6,
      titleKey: "project6.title",
      category: "portfolio.commercial",
      descKey: "project6.desc",
      images: [project6Img1, project6Img2, project6Img3],
    },
    {
      id: 7,
      titleKey: "project7.title",
      category: "portfolio.residential",
      descKey: "project7.desc",
      images: [project7Img1, project5Img1, project6Img1],
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const openProject = (id: number) => {
    setSelectedProject(id);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  const nextImage = () => {
    if (selectedProjectData) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProjectData.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProjectData) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProjectData.images.length) % selectedProjectData.images.length);
    }
  };

  return (
    <section id="portfolio" className="section-padding bg-secondary">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <ScrollReveal>
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
                {t("portfolio.label")}
              </span>
              <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl mt-4">
                {t("portfolio.title")}
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Button variant="elegant" className="group self-start md:self-auto" onClick={scrollToContact}>
              {t("portfolio.viewAll")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={0.1 * index}>
              <div
                className="group relative overflow-hidden rounded-sm bg-card shadow-soft hover:shadow-luxury transition-all duration-500 cursor-pointer"
                onClick={() => openProject(project.id)}
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
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && selectedProjectData && (
          <motion.div 
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4" 
            onClick={closeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              className="absolute top-6 right-6 text-primary-foreground hover:text-gold transition-colors z-10" 
              onClick={closeProject}
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div 
              className="max-w-5xl w-full" 
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="font-heading text-3xl text-primary-foreground mb-2">{t(selectedProjectData.titleKey)}</h3>
              <p className="text-gold text-sm uppercase tracking-wider mb-4">{t(selectedProjectData.category)}</p>
              <p className="text-primary-foreground/80 mb-6">{t(selectedProjectData.descKey)}</p>
              
              {/* Main Image */}
              <div className="relative aspect-video mb-4 overflow-hidden rounded-sm">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    src={selectedProjectData.images[currentImageIndex]} 
                    alt={`${t(selectedProjectData.titleKey)} ${currentImageIndex + 1}`} 
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal/70 rounded-full flex items-center justify-center text-primary-foreground hover:bg-gold transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal/70 rounded-full flex items-center justify-center text-primary-foreground hover:bg-gold transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-2">
                {selectedProjectData.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    className={`w-20 h-16 overflow-hidden rounded-sm transition-all ${
                      idx === currentImageIndex ? 'ring-2 ring-gold' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
