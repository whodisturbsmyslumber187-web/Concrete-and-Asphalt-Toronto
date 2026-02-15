import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, CheckCircle, Phone } from "lucide-react";
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
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

const BookingWidget = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !name || !phone || !projectType) return;

    setIsSubmitting(true);
    try {
      const details = `Callback Booking: ${format(date, "PPP")} at ${time}. Project: ${projectType}`;
      
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          name,
          email: email || "booking@apexstairs.ae",
          phone,
          project_type: projectType,
          details,
        });

      if (error) throw error;

      // Also trigger notification
      await supabase.functions.invoke('send-notification', {
        body: {
          name,
          email: email || "booking@apexstairs.ae",
          phone,
          project_type: projectType,
          details,
        },
      }).catch(() => {}); // Don't fail if notification fails

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
    return day < today || day.getDay() === 5 || day.getDay() === 6;
  };

  if (isBooked) {
    return (
      <section id="booking" className="section-padding bg-background">
        <div className="container-narrow max-w-xl mx-auto text-center">
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
            }}
          >
            {t("booking.another") || "Book Another"}
          </Button>
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
          <form onSubmit={handleBook} className="max-w-lg mx-auto bg-card p-8 rounded-sm shadow-medium space-y-5">
            {/* Callback indicator */}
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-sm">
              <Phone className="w-5 h-5 text-gold flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                {t("booking.callbackNote") || "We'll call you back at your selected time to discuss your project."}
              </p>
            </div>

            {/* Project Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">{t("contact.projectType")}</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full h-10 px-3 rounded-sm bg-background border border-border text-sm focus:outline-none focus:border-gold"
                required
              >
                <option value="">{t("contact.selectType")}</option>
                <option value="residential">{t("contact.typeResidential")}</option>
                <option value="commercial">{t("contact.typeCommercial")}</option>
                <option value="hospitality">{t("contact.typeHospitality")}</option>
                <option value="other">{t("contact.typeOther")}</option>
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label className="text-sm font-medium mb-2 block">{t("booking.date")}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
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
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Slots */}
            {date && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {t("booking.time")}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={cn(
                        "py-2 px-3 rounded-sm text-sm border transition-colors",
                        time === slot
                          ? "bg-gold text-primary border-gold"
                          : "border-border hover:border-gold/50"
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            {time && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("contact.name")}</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("contact.namePlaceholder")} required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("contact.phone")}</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("contact.phonePlaceholder")} required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("contact.emailLabel")}</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("contact.emailPlaceholder")} />
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t("contact.sending") : t("booking.book")}
                </Button>
              </>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BookingWidget;
