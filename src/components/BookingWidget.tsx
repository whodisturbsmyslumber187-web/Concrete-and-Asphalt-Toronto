import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, CheckCircle } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !name || !phone) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          name,
          email: email || "booking@apexstairs.ae",
          phone,
          project_type: "consultation",
          details: `Booking: ${format(date, "PPP")} at ${time}`,
        });

      if (error) throw error;

      setIsBooked(true);
      toast.success(t("booking.success"));
    } catch {
      toast.error(t("booking.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Disable past dates and weekends (Fri/Sat)
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
