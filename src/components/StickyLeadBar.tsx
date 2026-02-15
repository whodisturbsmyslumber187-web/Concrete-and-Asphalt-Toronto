import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const StickyLeadBar = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (dismissed || submitted) return;
    const handleScroll = () => {
      // Show after scrolling 40% of page
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.4);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed, submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setIsSubmitting(true);
    try {
      await supabase.from("contact_submissions").insert({
        name: "Quick Lead",
        phone: phone.trim(),
        email: "sticky-bar@apexstairs.ae",
        project_type: "consultation",
        details: "Sticky bar quick callback request",
        lead_source: "sticky_bar",
      });
      setSubmitted(true);
      toast.success(t("sticky.success") || "We'll call you back shortly!");
    } catch {
      toast.error(t("contact.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (dismissed || submitted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-charcoal border-t border-gold/20 shadow-luxury"
        >
          <div className="container-narrow py-3 flex items-center gap-3 justify-center flex-wrap">
            <Phone className="w-5 h-5 text-gold flex-shrink-0" />
            <span className="text-primary-foreground text-sm font-medium">
              {t("sticky.text") || "Want a free quote? Drop your number:"}
            </span>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+971 XX XXX XXXX"
                className="w-44 h-9 text-sm bg-background"
                required
              />
              <Button type="submit" variant="gold" size="sm" disabled={isSubmitting}>
                {isSubmitting ? "..." : (t("sticky.cta") || "Call Me Back")}
              </Button>
            </form>
            <button onClick={() => setDismissed(true)} className="text-primary-foreground/50 hover:text-primary-foreground ml-2">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyLeadBar;
