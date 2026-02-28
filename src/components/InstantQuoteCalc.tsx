import { useState } from "react";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

const SERVICE_TYPES = [
  { id: "driveway", label: "Driveway (Concrete)", labelFr: "Entrée (béton)", basePrice: 8000 },
  { id: "driveway-asphalt", label: "Driveway (Asphalt)", labelFr: "Entrée (asphalte)", basePrice: 5000 },
  { id: "patio", label: "Patio / Pool Deck", labelFr: "Patio / Contour piscine", basePrice: 6000 },
  { id: "walkway", label: "Walkways & Steps", labelFr: "Allées et marches", basePrice: 4000 },
  { id: "foundation", label: "Foundation / Basement", labelFr: "Fondation / Sous-sol", basePrice: 15000 },
  { id: "garage-floor", label: "Garage Floor", labelFr: "Plancher de garage", basePrice: 5000 },
  { id: "parking-lot", label: "Parking Lot", labelFr: "Stationnement", basePrice: 25000 },
  { id: "sidewalk", label: "Sidewalks & Curbs", labelFr: "Trottoirs et bordures", basePrice: 6000 },
  { id: "retaining-wall", label: "Retaining Walls", labelFr: "Murs de soutènement", basePrice: 8000 },
  { id: "repair", label: "Concrete / Asphalt Repair", labelFr: "Réparation béton / asphalte", basePrice: 3000 },
];

const MATERIALS = [
  { id: "standard-concrete", label: "Standard Concrete", labelFr: "Béton standard", multiplier: 1.0 },
  { id: "stamped", label: "Stamped Concrete", labelFr: "Béton estampé", multiplier: 1.4 },
  { id: "exposed-aggregate", label: "Exposed Aggregate", labelFr: "Agrégat exposé", multiplier: 1.3 },
  { id: "coloured", label: "Coloured Concrete", labelFr: "Béton coloré", multiplier: 1.2 },
  { id: "hot-mix-asphalt", label: "Hot-Mix Asphalt", labelFr: "Asphalte chaud", multiplier: 0.8 },
  { id: "interlock", label: "Interlock / Pavers", labelFr: "Pavé imbriqué", multiplier: 1.5 },
];

const AREA_OPTIONS = ["Under 500 sq ft", "500–1,000 sq ft", "1,000–2,500 sq ft", "2,500+ sq ft"];

const TIMELINES = [
  { id: "urgent", label: "ASAP (1-2 weeks)", labelFr: "Urgent (1-2 semaines)" },
  { id: "soon", label: "1-2 months", labelFr: "1-2 mois" },
  { id: "planning", label: "3-6 months", labelFr: "3-6 mois" },
  { id: "exploring", label: "Just exploring", labelFr: "J'explore les options" },
];

const PROPERTY_TYPES = [
  { id: "house", label: "House / Bungalow", labelFr: "Maison / Bungalow" },
  { id: "townhome", label: "Townhome / Semi", labelFr: "Maison en rangée / jumelée" },
  { id: "commercial", label: "Commercial Property", labelFr: "Propriété commerciale" },
  { id: "multi-unit", label: "Multi-Unit / Condo", labelFr: "Multi-logements / Condo" },
];

const BUDGETS = [
  { id: "under-5k", label: "Under $5,000", labelFr: "Moins de 5 000 $" },
  { id: "5k-15k", label: "$5,000 – $15,000", labelFr: "5 000 $ – 15 000 $" },
  { id: "15k-50k", label: "$15,000 – $50,000", labelFr: "15 000 $ – 50 000 $" },
  { id: "50k-plus", label: "$50,000+", labelFr: "50 000 $+" },
];

const TOTAL_STEPS = 7;

const InstantQuoteCalc = () => {
  const { t, language } = useLanguage();
  const isFr = language === "fr";

  const [step, setStep] = useState(1);
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [area, setArea] = useState("");
  const [timeline, setTimeline] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedType = SERVICE_TYPES.find((t) => t.id === type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitting(true);
    try {
      const details = `Callback Request: ${selectedType?.label || type}, ${material}, ${area}, ${timeline} timeline, ${propertyType} property, budget: ${budget}`;
      await supabase.from("contact_submissions").insert({
        name,
        phone,
        email: email || "quote-calc@apexpaving.ca",
        project_type: type,
        details,
        budget,
        num_floors: area,
        material_preference: material,
        timeline,
        property_type: propertyType,
        lead_source: "quote_calculator",
      });

      await supabase.functions.invoke("send-notification", {
        body: { name, email: email || "", phone, project_type: type, details },
      }).catch(() => {});
      setSubmitted(true);
      toast.success(t("contact.success"));
    } catch {
      toast.error(t("contact.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const OptionButton = ({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-4 rounded-sm border text-left transition-all hover:border-gold hover:shadow-sm",
        selected ? "border-gold bg-gold/5 shadow-sm" : "border-border"
      )}
    >
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  const BackButton = ({ goTo }: { goTo: number }) => (
    <button onClick={() => setStep(goTo)} className="text-sm text-muted-foreground mt-4 hover:text-gold transition-colors">
      ← {isFr ? "Retour" : "Back"}
    </button>
  );

  if (submitted) {
    return (
      <section id="quote-calc" className="section-padding bg-secondary">
        <div className="container-narrow max-w-xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
          <h2 className="font-heading text-2xl mb-2">{t("quote.thanks")}</h2>
          <p className="text-muted-foreground">{t("quote.thanksMsg")}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="quote-calc" className="section-padding bg-secondary">
      <div className="container-narrow">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
              {t("quote.label")}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mt-4 mb-4">
              {t("quote.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("quote.desc")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="max-w-xl mx-auto bg-card p-8 rounded-sm shadow-medium">
            {/* Progress */}
            <div className="flex items-center gap-1.5 mb-8">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
                <div key={s} className="flex-1 flex items-center gap-1.5">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                    step >= s ? "bg-gold text-primary" : "bg-secondary text-muted-foreground"
                  )}>
                    {s}
                  </div>
                  {s < TOTAL_STEPS && <div className={cn("flex-1 h-0.5 transition-colors", step > s ? "bg-gold" : "bg-border")} />}
                </div>
              ))}
            </div>

            {/* Step 1: Type */}
            {step === 1 && (
              <div>
                <h3 className="font-heading text-lg mb-4">{t("quote.step1")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {SERVICE_TYPES.map((item) => (
                    <OptionButton
                      key={item.id}
                      selected={type === item.id}
                      onClick={() => { setType(item.id); setStep(2); }}
                      label={isFr ? item.labelFr : item.label}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Material */}
            {step === 2 && (
              <div>
                <h3 className="font-heading text-lg mb-4">{t("quote.step2")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {MATERIALS.map((item) => (
                    <OptionButton
                      key={item.id}
                      selected={material === item.id}
                      onClick={() => { setMaterial(item.id); setStep(3); }}
                      label={isFr ? item.labelFr : item.label}
                    />
                  ))}
                </div>
                <BackButton goTo={1} />
              </div>
            )}

            {/* Step 3: Area */}
            {step === 3 && (
              <div>
                <h3 className="font-heading text-lg mb-4">{t("quote.step3")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {AREA_OPTIONS.map((f) => (
                    <OptionButton
                      key={f}
                      selected={area === f}
                      onClick={() => { setArea(f); setStep(4); }}
                      label={f}
                    />
                  ))}
                </div>
                <BackButton goTo={2} />
              </div>
            )}

            {/* Step 4: Timeline */}
            {step === 4 && (
              <div>
                <h3 className="font-heading text-lg mb-4">{t("quote.step4")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {TIMELINES.map((item) => (
                    <OptionButton
                      key={item.id}
                      selected={timeline === item.id}
                      onClick={() => { setTimeline(item.id); setStep(5); }}
                      label={isFr ? item.labelFr : item.label}
                    />
                  ))}
                </div>
                <BackButton goTo={3} />
              </div>
            )}

            {/* Step 5: Property Type */}
            {step === 5 && (
              <div>
                <h3 className="font-heading text-lg mb-4">{t("quote.step5")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {PROPERTY_TYPES.map((item) => (
                    <OptionButton
                      key={item.id}
                      selected={propertyType === item.id}
                      onClick={() => { setPropertyType(item.id); setStep(6); }}
                      label={isFr ? item.labelFr : item.label}
                    />
                  ))}
                </div>
                <BackButton goTo={4} />
              </div>
            )}

            {/* Step 6: Budget */}
            {step === 6 && (
              <div>
                <h3 className="font-heading text-lg mb-4">{t("quote.step6")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {BUDGETS.map((item) => (
                    <OptionButton
                      key={item.id}
                      selected={budget === item.id}
                      onClick={() => { setBudget(item.id); setStep(7); }}
                      label={isFr ? item.labelFr : item.label}
                    />
                  ))}
                </div>
                <BackButton goTo={5} />
              </div>
            )}

            {/* Step 7: Contact Info */}
            {step === 7 && (
              <div>
                <div className="flex items-center gap-3 p-4 bg-gold/5 border border-gold/10 rounded-sm mb-6">
                  <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                  <p className="text-sm text-foreground/80">{t("quote.contactPrompt")}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("contact.namePlaceholder")} required />
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("contact.phonePlaceholder")} required />
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("contact.emailPlaceholder")} />
                  <Button type="submit" variant="gold" size="lg" className="w-full group" disabled={isSubmitting}>
                    {isSubmitting ? t("contact.sending") : t("quote.getQuote")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
                <BackButton goTo={6} />
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default InstantQuoteCalc;
