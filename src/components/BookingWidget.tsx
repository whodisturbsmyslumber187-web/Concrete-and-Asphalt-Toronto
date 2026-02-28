import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, CheckCircle, Phone, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

const BookingWidget = () => {
  const { t, language } = useLanguage();
  const isFr = language === "fr";

  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numFloors, setNumFloors] = useState("");
  const [materialPref, setMaterialPref] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !name || !phone || !projectType || !budget || !timeline) return;

    setIsSubmitting(true);
    try {
      const details = `Site Visit: ${format(date, "PPP")}${time ? ` at ${time}` : ""}. Project: ${projectType}. Budget: ${budget}. Timeline: ${timeline}. Property: ${propertyType}. Area: ${numFloors}. Material: ${materialPref}`;

      const { error } = await supabase.from("contact_submissions").insert({
        name,
        email: email || "booking@apexpaving.ca",
        phone,
        project_type: projectType,
        details,
        budget,
        timeline,
        property_type: propertyType,
        num_floors: numFloors,
        material_preference: materialPref,
        lead_source: "booking_calendar",
      });

      if (error) throw error;

      await supabase.functions.invoke("send-notification", {
        body: { name, email: email || "booking@apexpaving.ca", phone, project_type: projectType, details },
      }).catch(() => {});

      setIsBooked(true);
      toast.success(t("booking.success"));
    } catch {
      toast.error(t("booking.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabledDays = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today || day.getDay() === 0; // Closed Sundays
  };

  const SelectField = ({
    label, value, onChange, required, placeholder, children,
  }: {
    label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder: string; children: React.ReactNode;
  }) => (
    <div>
      <label className="text-xs uppercase tracking-[0.15em] text-gold/80 font-medium mb-2 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-4 rounded-sm bg-background border border-border/50 text-sm focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
        required={required}
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
    </div>
  );

  if (isBooked) {
    return (
      <section id="booking" className="section-padding bg-background">
        <div className="container-narrow max-w-xl mx-auto text-center">
          <div className="bg-card p-10 rounded-sm shadow-luxury border border-gold/10">
            <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
            <h2 className="font-heading text-2xl mb-2">{t("booking.confirmed")}</h2>
            <p className="text-muted-foreground">
              {format(date!, "PPP")} at {time}
            </p>
            <p className="text-muted-foreground mt-2">{t("booking.confirmMsg")}</p>
            <Button
              variant="gold"
              className="mt-6"
              onClick={() => {
                setIsBooked(false);
                setDate(undefined);
                setTime("");
                setName("");
                setPhone("");
                setEmail("");
                setProjectType("");
                setBudget("");
                setTimeline("");
              }}
            >
              {isFr ? "Réserver une autre visite" : "Book Another Visit"}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section-padding bg-background">
      <div className="container-narrow">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
              {t("booking.label")}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mt-4 mb-4">
              {t("booking.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("booking.desc")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form
            onSubmit={handleBook}
            className="max-w-lg mx-auto bg-card p-8 md:p-10 rounded-sm shadow-luxury border border-gold/5 space-y-6"
          >
            <div className="flex items-center gap-3 p-4 bg-gold/5 border border-gold/10 rounded-sm">
              <Gem className="w-5 h-5 text-gold flex-shrink-0" />
              <p className="text-sm text-foreground/80">{t("booking.callbackNote")}</p>
            </div>

            <SelectField
              label={t("contact.projectType")}
              value={projectType}
              onChange={setProjectType}
              required
              placeholder={t("contact.selectType")}
            >
              <option value="residential">{t("contact.typeResidential")}</option>
              <option value="commercial">{t("contact.typeCommercial")}</option>
              <option value="hospitality">{t("contact.typeHospitality")}</option>
              <option value="other">{t("contact.typeOther")}</option>
            </SelectField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField
                label={t("booking.budget")}
                value={budget}
                onChange={setBudget}
                required
                placeholder={t("booking.selectBudget")}
              >
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 – $15,000</option>
                <option value="15k-50k">$15,000 – $50,000</option>
                <option value="50k+">$50,000+</option>
              </SelectField>

              <SelectField
                label={t("booking.timeline")}
                value={timeline}
                onChange={setTimeline}
                required
                placeholder={t("booking.selectTimeline")}
              >
                <option value="urgent">{t("booking.urgent")}</option>
                <option value="1-3months">{t("booking.1to3")}</option>
                <option value="3-6months">{t("booking.3to6")}</option>
                <option value="6months+">{t("booking.6plus")}</option>
                <option value="planning">{t("booking.planning")}</option>
              </SelectField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label={t("booking.floors")}
                value={numFloors}
                onChange={setNumFloors}
                placeholder="—"
              >
                <option value="under-500">Under 500 sq ft</option>
                <option value="500-1000">500–1,000 sq ft</option>
                <option value="1000-2500">1,000–2,500 sq ft</option>
                <option value="2500+">2,500+ sq ft</option>
              </SelectField>

              <SelectField
                label={t("booking.material")}
                value={materialPref}
                onChange={setMaterialPref}
                placeholder="—"
              >
                <option value="standard">{t("booking.steel")}</option>
                <option value="stamped">{t("booking.glass")}</option>
                <option value="exposed">{t("booking.wood")}</option>
                <option value="asphalt">{t("booking.marble")}</option>
                <option value="coloured">{t("booking.concrete")}</option>
                <option value="interlock">{t("booking.wroughtIron")}</option>
              </SelectField>
            </div>

            <div className="border-t border-border/30 pt-2" />

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-gold/80 font-medium mb-2 block">
                {t("booking.date")}
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-11 border-border/50",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
                    {date ? format(date, "PPP") : t("booking.pickDate")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={disabledDays}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {date && (
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-gold/80 font-medium mb-3 block">
                  <Clock className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                  {t("booking.time")}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={cn(
                        "py-2.5 px-3 rounded-sm text-sm border transition-all",
                        time === slot
                          ? "bg-gold text-primary border-gold shadow-sm"
                          : "border-border/40 hover:border-gold/50"
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {date && (
              <div className="space-y-4 pt-2">
                <div className="border-t border-border/30 pb-2" />
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-gold/80 font-medium mb-2 block">
                    {t("contact.name")}
                  </label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("contact.namePlaceholder")} className="h-11 border-border/50" required />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-gold/80 font-medium mb-2 block">
                    {t("contact.phone")}
                  </label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("contact.phonePlaceholder")} className="h-11 border-border/50" required />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-gold/80 font-medium mb-2 block">
                    {t("contact.emailLabel")}
                  </label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("contact.emailPlaceholder")} className="h-11 border-border/50" />
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full mt-2" disabled={isSubmitting}>
                  {isSubmitting ? t("contact.sending") : t("booking.book")}
                </Button>
              </div>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BookingWidget;
