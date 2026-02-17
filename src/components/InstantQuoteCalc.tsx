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
  { id: "straight", label: "Straight Staircase", labelAr: "سلم مستقيم", basePrice: 15000 },
  { id: "l-shaped", label: "L-Shaped Staircase", labelAr: "سلم على شكل L", basePrice: 22000 },
  { id: "u-shaped", label: "U-Shaped Staircase", labelAr: "سلم على شكل U", basePrice: 28000 },
  { id: "spiral", label: "Spiral Staircase", labelAr: "سلم لولبي", basePrice: 35000 },
  { id: "floating", label: "Floating Staircase", labelAr: "سلم عائم", basePrice: 45000 },
  { id: "helical", label: "Helical Staircase", labelAr: "سلم حلزوني", basePrice: 55000 },
  { id: "concrete", label: "Concrete Staircase", labelAr: "سلم خرساني", basePrice: 18000 },
  { id: "curved", label: "Curved Staircase", labelAr: "سلم منحني", basePrice: 50000 },
  { id: "railing-only", label: "Railings / Balustrades", labelAr: "درابزينات فقط", basePrice: 8000 },
  { id: "interior-feature", label: "Interior Metalwork", labelAr: "أعمال معدنية داخلية", basePrice: 12000 },
];

const MATERIALS = [
  { id: "steel", label: "Stainless Steel", labelAr: "فولاذ مقاوم للصدأ", multiplier: 1.0 },
  { id: "glass-steel", label: "Glass + Steel", labelAr: "زجاج + فولاذ", multiplier: 1.4 },
  { id: "wood-steel", label: "Wood + Steel", labelAr: "خشب + فولاذ", multiplier: 1.2 },
  { id: "marble-steel", label: "Marble + Steel", labelAr: "رخام + فولاذ", multiplier: 1.6 },
  { id: "concrete-steel", label: "Concrete + Steel", labelAr: "خرسانة + فولاذ", multiplier: 1.1 },
  { id: "wrought-iron", label: "Wrought Iron", labelAr: "حديد مشغول", multiplier: 1.3 },
];

const FLOOR_OPTIONS = ["1", "2", "3", "4+"];

const TIMELINES = [
  { id: "urgent", label: "ASAP (1-2 weeks)", labelAr: "عاجل (1-2 أسبوع)" },
  { id: "soon", label: "1-2 months", labelAr: "1-2 شهر" },
  { id: "planning", label: "3-6 months", labelAr: "3-6 أشهر" },
  { id: "exploring", label: "Just exploring", labelAr: "أستكشف فقط" },
];

const PROPERTY_TYPES = [
  { id: "villa", label: "Villa / Mansion", labelAr: "فيلا / قصر" },
  { id: "apartment", label: "Apartment / Penthouse", labelAr: "شقة / بنتهاوس" },
  { id: "commercial", label: "Office / Commercial", labelAr: "مكتب / تجاري" },
  { id: "hotel", label: "Hotel / Hospitality", labelAr: "فندق / ضيافة" },
];

const BUDGETS = [
  { id: "under-20k", label: "Under AED 20,000", labelAr: "أقل من 20,000 درهم" },
  { id: "20k-50k", label: "AED 20,000 – 50,000", labelAr: "20,000 – 50,000 درهم" },
  { id: "50k-100k", label: "AED 50,000 – 100,000", labelAr: "50,000 – 100,000 درهم" },
  { id: "100k-plus", label: "AED 100,000+", labelAr: "100,000 درهم+" },
];

const TOTAL_STEPS = 7;

const InstantQuoteCalc = () => {
  const { t, language } = useLanguage();
  const isAr = language === "ar";

  const [step, setStep] = useState(1);
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [floors, setFloors] = useState("");
  const [timeline, setTimeline] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
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
        details: `Instant Quote: ${type}, ${material}, ${floors} floor(s), ${timeline} timeline, ${propertyType} property, budget: ${budget}. Estimate: AED ${estimateMin.toLocaleString()} - ${estimateMax.toLocaleString()}`,
        budget,
        num_floors: floors,
        material_preference: material,
        timeline,
        property_type: propertyType,
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
      ← {isAr ? "رجوع" : "Back"}
    </button>
  );

  if (submitted) {
    return (
      <section id="quote-calc" className="section-padding bg-secondary">
        <div className="container-narrow max-w-xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
          <h2 className="font-heading text-2xl mb-2">{t("quote.thanks")}</h2>
          <p className="text-muted-foreground">{t("quote.thanksMsg")}</p>
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
                  {STAIRCASE_TYPES.map((item) => (
                    <OptionButton
                      key={item.id}
                      selected={type === item.id}
                      onClick={() => { setType(item.id); setStep(2); }}
                      label={isAr ? item.labelAr : item.label}
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
                      label={isAr ? item.labelAr : item.label}
                    />
                  ))}
                </div>
                <BackButton goTo={1} />
              </div>
            )}

            {/* Step 3: Floors */}
            {step === 3 && (
              <div>
                <h3 className="font-heading text-lg mb-4">{t("quote.step3")}</h3>
                <div className="grid grid-cols-4 gap-3">
                  {FLOOR_OPTIONS.map((f) => (
                    <OptionButton
                      key={f}
                      selected={floors === f}
                      onClick={() => { setFloors(f); setStep(4); }}
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
                      label={isAr ? item.labelAr : item.label}
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
                      label={isAr ? item.labelAr : item.label}
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
                      label={isAr ? item.labelAr : item.label}
                    />
                  ))}
                </div>
                <BackButton goTo={5} />
              </div>
            )}

            {/* Step 7: Contact + Estimate */}
            {step === 7 && (
              <div>
                <div className="bg-secondary p-5 rounded-sm mb-6 text-center">
                  <Calculator className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">{t("quote.estimate")}</p>
                  <p className="font-heading text-2xl text-gold">
                    AED {estimateMin.toLocaleString()} – {estimateMax.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{t("quote.disclaimer")}</p>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{t("quote.contactPrompt")}</p>

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
