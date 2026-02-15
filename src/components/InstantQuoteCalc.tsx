import { useState } from "react";
import { Calculator, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

const STAIRCASE_TYPES = [
  { id: "straight", label: "Straight", labelAr: "مستقيم", basePrice: 15000 },
  { id: "l-shaped", label: "L-Shaped", labelAr: "على شكل L", basePrice: 22000 },
  { id: "u-shaped", label: "U-Shaped", labelAr: "على شكل U", basePrice: 28000 },
  { id: "spiral", label: "Spiral", labelAr: "لولبي", basePrice: 35000 },
  { id: "floating", label: "Floating", labelAr: "عائم", basePrice: 45000 },
  { id: "helical", label: "Helical", labelAr: "حلزوني", basePrice: 55000 },
];

const MATERIALS = [
  { id: "steel", label: "Steel", labelAr: "فولاذ", multiplier: 1.0 },
  { id: "glass", label: "Glass + Steel", labelAr: "زجاج + فولاذ", multiplier: 1.4 },
  { id: "wood", label: "Wood + Steel", labelAr: "خشب + فولاذ", multiplier: 1.2 },
  { id: "marble", label: "Marble + Steel", labelAr: "رخام + فولاذ", multiplier: 1.6 },
];

const FLOOR_OPTIONS = ["1", "2", "3", "4+"];

const InstantQuoteCalc = () => {
  const { t, language } = useLanguage();
  const isAr = language === "ar";

  const [step, setStep] = useState(1);
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [floors, setFloors] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedType = STAIRCASE_TYPES.find((t) => t.id === type);
  const selectedMaterial = MATERIALS.find((m) => m.id === material);
  const floorMultiplier = floors === "4+" ? 4 : parseInt(floors) || 1;

  const estimateMin = selectedType && selectedMaterial
    ? Math.round(selectedType.basePrice * selectedMaterial.multiplier * floorMultiplier * 0.85)
    : 0;
  const estimateMax = selectedType && selectedMaterial
    ? Math.round(selectedType.basePrice * selectedMaterial.multiplier * floorMultiplier * 1.25)
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitting(true);
    try {
      await supabase.from("contact_submissions").insert({
        name,
        phone,
        email: email || "quote-calc@apexstairs.ae",
        project_type: type,
        details: `Instant Quote: ${type} staircase, ${material} material, ${floors} floor(s). Estimate: AED ${estimateMin.toLocaleString()} - ${estimateMax.toLocaleString()}`,
        budget: `AED ${estimateMin.toLocaleString()} - ${estimateMax.toLocaleString()}`,
        num_floors: floors,
        material_preference: material,
        lead_source: "quote_calculator",
      });
      setSubmitted(true);
      toast.success(t("contact.success"));
    } catch {
      toast.error(t("contact.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="quote-calc" className="section-padding bg-secondary">
        <div className="container-narrow max-w-xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
          <h2 className="font-heading text-2xl mb-2">{t("quote.thanks") || "Quote Request Received!"}</h2>
          <p className="text-muted-foreground">
            {t("quote.thanksMsg") || "Our team will review your requirements and send a detailed quote within 24 hours."}
          </p>
          <p className="text-gold font-heading text-xl mt-4">
            AED {estimateMin.toLocaleString()} – {estimateMax.toLocaleString()}
          </p>
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
              {t("quote.label") || "Instant Estimate"}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mt-4 mb-4">
              {t("quote.title") || "Get Your Price Estimate in 60 Seconds"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("quote.desc") || "Answer 3 quick questions and get an instant ballpark estimate. No commitment required."}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="max-w-xl mx-auto bg-card p-8 rounded-sm shadow-medium">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step >= s ? "bg-gold text-primary" : "bg-secondary text-muted-foreground"
                  )}>
                    {s}
                  </div>
                  {s < 4 && <div className={cn("flex-1 h-0.5 transition-colors", step > s ? "bg-gold" : "bg-border")} />}
                </div>
              ))}
            </div>

            {/* Step 1: Type */}
            {step === 1 && (
              <div>
                <h3 className="font-heading text-lg mb-4">{t("quote.step1") || "What type of staircase?"}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {STAIRCASE_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => { setType(t.id); setStep(2); }}
                      className={cn(
                        "p-4 rounded-sm border text-left transition-colors hover:border-gold",
                        type === t.id ? "border-gold bg-gold/5" : "border-border"
                      )}
                    >
                      <span className="font-medium text-sm">{isAr ? t.labelAr : t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Material */}
            {step === 2 && (
              <div>
                <h3 className="font-heading text-lg mb-4">{t("quote.step2") || "Preferred material?"}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {MATERIALS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => { setMaterial(m.id); setStep(3); }}
                      className={cn(
                        "p-4 rounded-sm border text-left transition-colors hover:border-gold",
                        material === m.id ? "border-gold bg-gold/5" : "border-border"
                      )}
                    >
                      <span className="font-medium text-sm">{isAr ? m.labelAr : m.label}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="text-sm text-muted-foreground mt-4 hover:text-gold">← Back</button>
              </div>
            )}

            {/* Step 3: Floors + Estimate */}
            {step === 3 && (
              <div>
                <h3 className="font-heading text-lg mb-4">{t("quote.step3") || "How many floors?"}</h3>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {FLOOR_OPTIONS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => { setFloors(f); setStep(4); }}
                      className={cn(
                        "p-3 rounded-sm border text-center transition-colors hover:border-gold",
                        floors === f ? "border-gold bg-gold/5" : "border-border"
                      )}
                    >
                      <span className="font-medium">{f}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="text-sm text-muted-foreground hover:text-gold">← Back</button>
              </div>
            )}

            {/* Step 4: Contact + Estimate */}
            {step === 4 && (
              <div>
                {/* Estimate Display */}
                <div className="bg-secondary p-5 rounded-sm mb-6 text-center">
                  <Calculator className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">{t("quote.estimate") || "Your Estimated Range"}</p>
                  <p className="font-heading text-2xl text-gold">
                    AED {estimateMin.toLocaleString()} – {estimateMax.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{t("quote.disclaimer") || "Final price depends on site conditions & customization"}</p>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {t("quote.contactPrompt") || "Enter your details to receive a detailed quote from our team:"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("contact.namePlaceholder")} required />
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("contact.phonePlaceholder")} required />
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("contact.emailPlaceholder")} />
                  <Button type="submit" variant="gold" size="lg" className="w-full group" disabled={isSubmitting}>
                    {isSubmitting ? t("contact.sending") : (t("quote.getQuote") || "Get My Detailed Quote")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
                <button onClick={() => setStep(3)} className="text-sm text-muted-foreground mt-4 hover:text-gold">← Back</button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default InstantQuoteCalc;
