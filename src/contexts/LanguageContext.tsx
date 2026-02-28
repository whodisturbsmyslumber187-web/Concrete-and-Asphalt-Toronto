import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Language = "en" | "fr";

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

export const translations: Translations = {
  // Header
  "nav.home": { en: "Home", fr: "Accueil" },
  "nav.services": { en: "Services", fr: "Services" },
  "nav.portfolio": { en: "Portfolio", fr: "Réalisations" },
  "nav.about": { en: "About", fr: "À propos" },
  "nav.contact": { en: "Contact", fr: "Contact" },
  "header.getQuote": { en: "Get a Free Quote", fr: "Soumission gratuite" },
  
  // Hero
  "hero.tagline": { en: "Licensed & Insured • Over 25 Years of Experience", fr: "Licencié et assuré • Plus de 25 ans d'expérience" },
  "hero.title1": { en: "Toronto's Trusted", fr: "L'expert de confiance à Toronto en" },
  "hero.title2": { en: "Concrete & Asphalt", fr: "Béton et asphalte" },
  "hero.title3": { en: "Experts", fr: "" },
  "hero.subtitle": { en: "Professional concrete and asphalt services for homeowners, property managers, and commercial developers across the GTA and Southern Ontario.", fr: "Services professionnels de béton et d'asphalte pour propriétaires, gestionnaires immobiliers et promoteurs commerciaux dans le Grand Toronto et le sud de l'Ontario." },
  "hero.cta1": { en: "Get a Free Estimate", fr: "Obtenez une estimation gratuite" },
  "hero.cta2": { en: "View Our Work", fr: "Voir nos réalisations" },
  "hero.badge1": { en: "WSIB Insured", fr: "Assuré WSIB" },
  "hero.badge2": { en: "Licensed in Ontario", fr: "Licencié en Ontario" },
  "hero.badge3": { en: "25+ Years Experience", fr: "Plus de 25 ans d'expérience" },
  
  // Services
  "services.label": { en: "Our Expertise", fr: "Notre expertise" },
  "services.title": { en: "Complete Concrete & Asphalt Solutions", fr: "Solutions complètes en béton et asphalte" },
  "services.residential": { en: "Residential", fr: "Résidentiel" },
  "services.commercial": { en: "Commercial", fr: "Commercial" },
  "services.res.title": { en: "Residential Services", fr: "Services résidentiels" },
  "services.res.desc": { en: "Transform your property with expert driveways, walkways, patios, and foundations. From stamped concrete to fresh asphalt, we deliver lasting curb appeal.", fr: "Transformez votre propriété avec des entrées, allées, patios et fondations de qualité. Du béton estampé à l'asphalte neuf, nous livrons un résultat durable." },
  "services.res.item1": { en: "Driveways & Walkways", fr: "Entrées et allées" },
  "services.res.item2": { en: "Stamped & Decorative Concrete", fr: "Béton estampé et décoratif" },
  "services.res.item3": { en: "Patios & Pool Decks", fr: "Patios et contours de piscine" },
  "services.res.item4": { en: "Foundations & Garage Floors", fr: "Fondations et planchers de garage" },
  "services.com.title": { en: "Commercial & Industrial", fr: "Commercial et industriel" },
  "services.com.desc": { en: "Large-scale paving and concrete solutions for parking lots, warehouses, plazas, and municipal projects. Built to handle heavy traffic and harsh Ontario winters.", fr: "Solutions d'asphaltage et de béton à grande échelle pour stationnements, entrepôts, centres commerciaux et projets municipaux. Conçus pour le trafic lourd et les hivers rigoureux de l'Ontario." },
  "services.com.item1": { en: "Parking Lot Paving & Repair", fr: "Pavage et réparation de stationnements" },
  "services.com.item2": { en: "Warehouse & Industrial Floors", fr: "Planchers d'entrepôt et industriels" },
  "services.com.item3": { en: "Curbs, Sidewalks & Catch Basins", fr: "Bordures, trottoirs et puisards" },
  "services.com.item4": { en: "Line Painting & Sealcoating", fr: "Marquage au sol et scellement" },
  "services.learnMore": { en: "Get a Free Quote", fr: "Soumission gratuite" },
  
  // Why Choose Us
  "why.label": { en: "Why Apex Paving", fr: "Pourquoi Apex" },
  "why.title": { en: "Quality That Stands the Test of Time", fr: "Une qualité qui résiste au temps" },
  "why.desc": { en: "At Apex Paving & Concrete, we combine decades of hands-on experience with modern equipment and premium materials. Our commitment to honest work and fair pricing has made us the go-to contractor for Toronto's toughest jobs.", fr: "Chez Apex Pavage et Béton, nous combinons des décennies d'expérience avec de l'équipement moderne et des matériaux de première qualité. Notre engagement envers un travail honnête et des prix justes fait de nous l'entrepreneur de choix à Toronto." },
  "why.years": { en: "Years of Excellence", fr: "Années d'excellence" },
  "why.f1.title": { en: "Winter-Tough Materials", fr: "Matériaux résistants au gel" },
  "why.f1.desc": { en: "We use premium-grade concrete and asphalt mixes engineered for Ontario's freeze-thaw cycles, ensuring crack-free performance for years.", fr: "Nous utilisons des mélanges de béton et d'asphalte de qualité supérieure conçus pour les cycles gel-dégel de l'Ontario, assurant des années sans fissures." },
  "why.f2.title": { en: "Custom Design Options", fr: "Options de design personnalisé" },
  "why.f2.desc": { en: "Choose from stamped patterns, exposed aggregate, coloured concrete, or classic finishes — every project is tailored to your style.", fr: "Choisissez parmi des motifs estampés, agrégat exposé, béton coloré ou finis classiques — chaque projet est adapté à votre style." },
  "why.f3.title": { en: "On-Time Completion", fr: "Livraison à temps" },
  "why.f3.desc": { en: "We show up when we say we will. Our crews work efficiently to minimize disruption to your property and daily routine.", fr: "Nous arrivons quand nous le promettons. Nos équipes travaillent efficacement pour minimiser les perturbations." },
  "why.f4.title": { en: "Fully Licensed & Insured", fr: "Licencié et assuré" },
  "why.f4.desc": { en: "WSIB covered, fully insured, and compliant with all Ontario building codes and municipal by-laws.", fr: "Couvert par la WSIB, entièrement assuré et conforme à tous les codes du bâtiment de l'Ontario." },
  "why.f5.title": { en: "Turnkey Service", fr: "Service clé en main" },
  "why.f5.desc": { en: "From site preparation and grading through to finishing and sealing — we handle the entire project from start to finish.", fr: "De la préparation du site et le nivellement jusqu'à la finition et le scellement — nous gérons tout le projet du début à la fin." },
  "why.f6.title": { en: "Eco-Friendly Practices", fr: "Pratiques écoresponsables" },
  "why.f6.desc": { en: "We recycle asphalt and concrete waste, use permeable paving options, and minimize environmental impact on every job.", fr: "Nous recyclons les déchets d'asphalte et de béton, utilisons des options de pavage perméable et minimisons l'impact environnemental." },
  
  // Portfolio
  "portfolio.label": { en: "Our Work", fr: "Nos réalisations" },
  "portfolio.title": { en: "Featured Projects", fr: "Projets en vedette" },
  "portfolio.viewAll": { en: "View All Projects", fr: "Voir tous les projets" },
  "portfolio.viewProject": { en: "View Project", fr: "Voir le projet" },
  "portfolio.residential": { en: "Residential", fr: "Résidentiel" },
  "portfolio.commercial": { en: "Commercial", fr: "Commercial" },
  "portfolio.hospitality": { en: "Municipal", fr: "Municipal" },
  
  // Project names and descriptions
  "project1.title": { en: "Oakville Estate Driveway", fr: "Entrée de domaine à Oakville" },
  "project1.desc": { en: "Expansive stamped concrete driveway with exposed aggregate borders and integrated drainage. A stunning entrance for this lakefront estate.", fr: "Entrée en béton estampé avec bordures d'agrégat exposé et drainage intégré. Une entrée magnifique pour ce domaine au bord du lac." },
  "project2.title": { en: "Vaughan Corporate Plaza", fr: "Plaza corporatif de Vaughan" },
  "project2.desc": { en: "Complete parking lot repaving with fresh hot-mix asphalt, new curbing, catch basins, and professional line painting for 200+ vehicle capacity.", fr: "Repavage complet du stationnement avec asphalte chaud, nouvelles bordures, puisards et marquage professionnel pour plus de 200 véhicules." },
  "project3.title": { en: "City of Mississauga Sidewalks", fr: "Trottoirs de la Ville de Mississauga" },
  "project3.desc": { en: "Municipal sidewalk replacement project spanning 2.5 km including accessible curb cuts, tactile walking surface indicators, and boulevard restoration.", fr: "Projet de remplacement de trottoirs municipaux sur 2,5 km incluant des bateaux de trottoir accessibles et la restauration des boulevards." },
  "project4.title": { en: "Leslieville Backyard Patio", fr: "Patio arrière à Leslieville" },
  "project4.desc": { en: "Modern stamped concrete patio with built-in fire pit pad, step-down transitions, and a matching walkway connecting to the detached garage.", fr: "Patio moderne en béton estampé avec foyer intégré, transitions en gradins et allée assortie vers le garage détaché." },
  "project5.title": { en: "Brampton Warehouse Complex", fr: "Complexe d'entrepôts à Brampton" },
  "project5.desc": { en: "Heavy-duty industrial concrete floor pour for a 50,000 sq ft distribution centre, including loading dock aprons and forklift-rated finishes.", fr: "Coulée de béton industriel pour un centre de distribution de 50 000 pi² incluant les tabliers de quai de chargement et finis pour chariots élévateurs." },
  "project6.title": { en: "Scarborough Townhome Complex", fr: "Complexe de maisons en rangée à Scarborough" },
  "project6.desc": { en: "Full site paving for a 48-unit townhome development including driveways, visitor parking, and decorative concrete walkways throughout the community.", fr: "Pavage complet pour un développement de 48 maisons en rangée incluant entrées, stationnement visiteurs et allées en béton décoratif." },
  "project7.title": { en: "High Park Heritage Home", fr: "Maison patrimoniale de High Park" },
  "project7.desc": { en: "Historically sympathetic interlocking stone and concrete driveway restoration preserving the character of this 1920s home while meeting modern drainage requirements.", fr: "Restauration d'entrée en pierre imbriquée et béton respectant le caractère de cette maison des années 1920 tout en répondant aux exigences modernes de drainage." },
  "project8.title": { en: "Richmond Hill Custom Home", fr: "Maison sur mesure à Richmond Hill" },
  "project8.desc": { en: "Complete concrete package: exposed aggregate driveway, stamped concrete pool deck, basement underpinning, and rear patio with retaining walls.", fr: "Ensemble complet en béton : entrée en agrégat exposé, contour de piscine estampé, étançonnement de sous-sol et patio arrière avec murs de soutènement." },
  "project9.title": { en: "King City Luxury Estate", fr: "Domaine de luxe à King City" },
  "project9.desc": { en: "Grand circular driveway in coloured stamped concrete with heated driveway system, decorative pillars, and matching walkways throughout the 2-acre property.", fr: "Grande entrée circulaire en béton estampé coloré avec système de chauffage, piliers décoratifs et allées assorties sur la propriété de 2 acres." },
  "project10.title": { en: "Etobicoke Commercial Strip", fr: "Centre commercial d'Etobicoke" },
  "project10.desc": { en: "Asphalt resurfacing and concrete sidewalk replacement for a busy commercial strip mall, completed in phases to maintain business access throughout.", fr: "Resurfaçage d'asphalte et remplacement de trottoirs pour un centre commercial achalandé, complété en phases pour maintenir l'accès aux commerces." },
  "project11.title": { en: "Markham Modern Build", fr: "Construction moderne à Markham" },
  "project11.desc": { en: "Contemporary polished concrete floors and a sleek broom-finish driveway for a modern custom build. Clean lines and precise grading throughout.", fr: "Planchers de béton poli contemporains et entrée finie au balai pour une construction sur mesure moderne. Lignes épurées et nivellement précis." },
  "project12.title": { en: "Muskoka Cottage Pathway", fr: "Sentier de chalet à Muskoka" },
  "project12.desc": { en: "Natural stone-style stamped concrete pathways winding through a waterfront cottage property, including a boat launch pad and lakeside seating area.", fr: "Allées en béton estampé style pierre naturelle serpentant dans une propriété de chalet au bord de l'eau, incluant une rampe de mise à l'eau et aire de repos." },
  
  // Testimonials
  "testimonials.label": { en: "Client Stories", fr: "Témoignages" },
  "testimonials.title": { en: "Trusted Across the GTA", fr: "La confiance du Grand Toronto" },
  
  // Contact
  "contact.label": { en: "Get in Touch", fr: "Contactez-nous" },
  "contact.title": { en: "Let's Build Something That Lasts", fr: "Construisons quelque chose de durable" },
  "contact.desc": { en: "Whether you need a new driveway, parking lot repair, or a full commercial paving project — we're here to deliver quality work on time and on budget.", fr: "Que vous ayez besoin d'une nouvelle entrée, de réparations de stationnement ou d'un projet de pavage commercial complet — nous sommes là pour livrer un travail de qualité dans les délais et le budget." },
  "contact.visit": { en: "Visit Our Yard", fr: "Visitez notre cour" },
  "contact.call": { en: "Call Us", fr: "Appelez-nous" },
  "contact.email": { en: "Email Us", fr: "Écrivez-nous" },
  "contact.hours": { en: "Working Hours", fr: "Heures d'ouverture" },
  "contact.hoursValue": { en: "Mon - Fri: 7AM - 6PM\nSat: 8AM - 2PM\nSun: Closed", fr: "Lun - Ven: 7h - 18h\nSam: 8h - 14h\nDim: Fermé" },
  "contact.formTitle": { en: "Request a Free Estimate", fr: "Demandez une estimation gratuite" },
  "contact.name": { en: "Full Name", fr: "Nom complet" },
  "contact.namePlaceholder": { en: "Your name", fr: "Votre nom" },
  "contact.phone": { en: "Phone Number", fr: "Numéro de téléphone" },
  "contact.phonePlaceholder": { en: "(416) XXX-XXXX", fr: "(416) XXX-XXXX" },
  "contact.emailLabel": { en: "Email Address", fr: "Adresse courriel" },
  "contact.emailPlaceholder": { en: "your@email.com", fr: "votre@courriel.com" },
  "contact.projectType": { en: "Project Type", fr: "Type de projet" },
  "contact.selectType": { en: "Select project type", fr: "Sélectionnez le type de projet" },
  "contact.typeResidential": { en: "Residential", fr: "Résidentiel" },
  "contact.typeCommercial": { en: "Commercial", fr: "Commercial" },
  "contact.typeHospitality": { en: "Municipal / Government", fr: "Municipal / Gouvernemental" },
  "contact.typeOther": { en: "Other", fr: "Autre" },
  "contact.details": { en: "Project Details", fr: "Détails du projet" },
  "contact.detailsPlaceholder": { en: "Tell us about your project — area size, current condition, timeline, and any specific requirements...", fr: "Décrivez votre projet — superficie, état actuel, échéancier et toute exigence particulière..." },
  "contact.submit": { en: "Send Inquiry", fr: "Envoyer la demande" },
  "contact.sending": { en: "Sending...", fr: "Envoi en cours..." },
  "contact.success": { en: "Thank you! We'll contact you within 24 hours.", fr: "Merci! Nous vous contacterons dans les 24 heures." },
  "contact.error": { en: "Something went wrong. Please try again.", fr: "Une erreur s'est produite. Veuillez réessayer." },
  "contact.captchaError": { en: "Please complete the captcha verification.", fr: "Veuillez compléter la vérification captcha." },
  
  // Footer
  "footer.desc": { en: "Professional concrete and asphalt services for Toronto's residential and commercial properties. Combining old-school craftsmanship with modern techniques.", fr: "Services professionnels de béton et d'asphalte pour les propriétés résidentielles et commerciales de Toronto. Artisanat traditionnel et techniques modernes." },
  "footer.services": { en: "Services", fr: "Services" },
  "footer.resStairs": { en: "Residential Concrete", fr: "Béton résidentiel" },
  "footer.comStairs": { en: "Commercial Paving", fr: "Pavage commercial" },
  "footer.glassRailings": { en: "Asphalt Services", fr: "Services d'asphalte" },
  "footer.metalwork": { en: "Stamped Concrete", fr: "Béton estampé" },
  "footer.company": { en: "Company", fr: "Entreprise" },
  "footer.rights": { en: "All rights reserved.", fr: "Tous droits réservés." },
  "footer.privacy": { en: "Privacy Policy", fr: "Politique de confidentialité" },
  "footer.terms": { en: "Terms of Service", fr: "Conditions d'utilisation" },

  // Map
  "map.label": { en: "Our Location", fr: "Notre emplacement" },
  "map.title": { en: "Visit Our Yard", fr: "Visitez notre cour" },
  "map.desc": { en: "Located in the heart of Toronto's west end. Visit us to see sample finishes and discuss your project in person.", fr: "Situé au cœur de l'ouest de Toronto. Visitez-nous pour voir des échantillons de finitions et discuter de votre projet." },

  // Booking
  "booking.label": { en: "Book a Site Visit", fr: "Réservez une visite de site" },
  "booking.title": { en: "Schedule Your Free On-Site Estimate", fr: "Planifiez votre estimation gratuite sur place" },
  "booking.desc": { en: "Pick a date and time that works for you. Our estimator will visit your property, take measurements, and provide a detailed quote on the spot.", fr: "Choisissez une date et une heure qui vous conviennent. Notre estimateur visitera votre propriété, prendra les mesures et fournira un devis détaillé sur place." },
  "booking.date": { en: "Preferred Date", fr: "Date préférée" },
  "booking.pickDate": { en: "Pick a date", fr: "Choisir une date" },
  "booking.time": { en: "Preferred Time", fr: "Heure préférée" },
  "booking.book": { en: "Confirm My Site Visit", fr: "Confirmer ma visite" },
  "booking.success": { en: "Visit booked! We'll see you on site.", fr: "Visite réservée! On se voit sur place." },
  "booking.error": { en: "Failed to book. Please try again.", fr: "Échec de la réservation. Veuillez réessayer." },
  "booking.confirmed": { en: "Visit Confirmed!", fr: "Visite confirmée!" },
  "booking.confirmMsg": { en: "We'll send you a confirmation via text. See you on site!", fr: "Nous vous enverrons une confirmation par texto. À bientôt!" },
  "booking.callbackNote": { en: "Our senior estimator will visit your property at the selected time to assess and provide a detailed quote.", fr: "Notre estimateur principal visitera votre propriété à l'heure choisie pour évaluer et fournir un devis détaillé." },
  "booking.budget": { en: "Budget Range", fr: "Fourchette de budget" },
  "booking.selectBudget": { en: "Select budget range", fr: "Sélectionnez la fourchette de budget" },
  "booking.timeline": { en: "Project Timeline", fr: "Échéancier du projet" },
  "booking.selectTimeline": { en: "Select timeline", fr: "Sélectionnez l'échéancier" },
  "booking.urgent": { en: "Immediate — Within 2 Weeks", fr: "Immédiat — Sous 2 semaines" },
  "booking.1to3": { en: "1 – 3 Months", fr: "1 – 3 mois" },
  "booking.3to6": { en: "3 – 6 Months", fr: "3 – 6 mois" },
  "booking.6plus": { en: "6+ Months", fr: "6+ mois" },
  "booking.planning": { en: "Planning Phase", fr: "Phase de planification" },
  "booking.floors": { en: "Area Size", fr: "Superficie" },
  "booking.material": { en: "Material", fr: "Matériau" },
  "booking.steel": { en: "Standard Concrete", fr: "Béton standard" },
  "booking.glass": { en: "Stamped Concrete", fr: "Béton estampé" },
  "booking.wood": { en: "Exposed Aggregate", fr: "Agrégat exposé" },
  "booking.marble": { en: "Hot-Mix Asphalt", fr: "Asphalte chaud" },
  "booking.concrete": { en: "Coloured Concrete", fr: "Béton coloré" },
  "booking.wroughtIron": { en: "Interlock / Pavers", fr: "Pavé imbriqué" },

  // Instant Quote Calculator
  "quote.label": { en: "Get a Callback", fr: "Demandez un rappel" },
  "quote.title": { en: "Tell Us About Your Project", fr: "Parlez-nous de votre projet" },
  "quote.desc": { en: "Answer a few quick questions so our team can prepare a tailored estimate and call you back.", fr: "Répondez à quelques questions rapides pour que notre équipe prépare une estimation sur mesure et vous rappelle." },
  "quote.step1": { en: "What type of work do you need?", fr: "Quel type de travaux avez-vous besoin?" },
  "quote.step2": { en: "Preferred material or finish?", fr: "Matériau ou finition préféré?" },
  "quote.step3": { en: "Approximate area size?", fr: "Superficie approximative?" },
  "quote.step4": { en: "What's your project timeline?", fr: "Quel est votre échéancier?" },
  "quote.step5": { en: "What type of property?", fr: "Quel type de propriété?" },
  "quote.step6": { en: "What's your approximate budget?", fr: "Quel est votre budget approximatif?" },
  "quote.contactPrompt": { en: "Leave your details and our estimator will call you within 2 hours:", fr: "Laissez vos coordonnées et notre estimateur vous rappellera dans les 2 heures:" },
  "quote.getQuote": { en: "Request My Callback", fr: "Demander mon rappel" },
  "quote.thanks": { en: "Request Received!", fr: "Demande reçue!" },
  "quote.thanksMsg": { en: "Our estimator will call you within 2 hours to discuss your project in detail.", fr: "Notre estimateur vous rappellera dans les 2 heures pour discuter de votre projet en détail." },

  // Exit Intent Popup
  "exit.title": { en: "Wait! Don't Leave Empty-Handed", fr: "Attendez! Ne partez pas les mains vides" },
  "exit.desc": { en: "Get a FREE on-site estimate + expert advice on the best solution for your property. No obligation.", fr: "Obtenez une estimation GRATUITE sur place + des conseils d'experts pour la meilleure solution pour votre propriété. Sans obligation." },
  "exit.cta": { en: "Claim My Free Estimate", fr: "Obtenir mon estimation gratuite" },
  "exit.thanks": { en: "Thank You!", fr: "Merci!" },
  "exit.thanksMsg": { en: "We'll call you within 24 hours to schedule your free on-site estimate.", fr: "Nous vous appellerons dans les 24 heures pour planifier votre estimation gratuite sur place." },

  // Sticky Lead Bar
  "sticky.text": { en: "Want a free quote? Drop your number:", fr: "Soumission gratuite? Laissez votre numéro:" },
  "sticky.cta": { en: "Call Me Back", fr: "Rappelez-moi" },
  "sticky.success": { en: "We'll call you back shortly!", fr: "Nous vous rappellerons sous peu!" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  }, [language]);

  const isRTL = false; // French is LTR

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir="ltr">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
