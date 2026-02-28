import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ExitIntentPopup = () => {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    if (sessionStorage.getItem("exitPopupShown")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
        sessionStorage.setItem("exitPopupShown", "true");
      }
    };

    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("exitPopupShown")) {
        setShow(true);
        sessionStorage.setItem("exitPopupShown", "true");
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [dismissed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitting(true);
    try {
      await supabase.from("contact_submissions").insert({
        name,
        phone,
        email: email || "exit-popup@apexpaving.ca",
        project_type: "consultation",
        details: "Exit intent popup - Free estimate offer",
        lead_source: "exit_popup",
      });
      setSubmitted(true);
      toast.success(t("contact.success"));
    } catch {
      toast.error(t("contact.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const close = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card max-w-md w-full rounded-sm shadow-luxury p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={close} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-4">
                <Gift className="w-12 h-12 text-gold mx-auto mb-3" />
                <h3 className="font-heading text-xl mb-2">{t("exit.thanks")}</h3>
                <p className="text-muted-foreground text-sm">{t("exit.thanksMsg")}</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-heading text-2xl mb-2">{t("exit.title")}</h3>
                  <p className="text-muted-foreground text-sm">{t("exit.desc")}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("contact.namePlaceholder")} required />
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("contact.phonePlaceholder")} required />
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("contact.emailPlaceholder")} />
                  <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t("contact.sending") : t("exit.cta")}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
