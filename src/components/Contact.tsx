import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ScrollReveal from "./ScrollReveal";

const Contact = () => {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const captchaRef = useRef<HCaptcha>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    details: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const contactInfo = [
    {
      icon: MapPin,
      label: t("contact.visit"),
      value: "Industrial Area 13, Al Quoz\nDubai, UAE",
    },
    {
      icon: Phone,
      label: t("contact.call"),
      value: "+971 4 123 4567",
      href: "tel:+97141234567",
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: "info@apexstairs.ae",
      href: "mailto:info@apexstairs.ae",
    },
    {
      icon: Clock,
      label: t("contact.hours"),
      value: t("contact.hoursValue"),
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      toast.error(t("contact.captchaError"));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Insert into Supabase database
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project_type: formData.projectType,
          details: formData.details,
        });

      if (error) throw error;
      
      // Send notification (email + WhatsApp alert)
      await supabase.functions.invoke('send-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project_type: formData.projectType,
          details: formData.details,
        }
      });
      
      setSubmitStatus("success");
      toast.success(t("contact.success"));
      
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        projectType: "",
        details: "",
      });
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
      
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      toast.error(t("contact.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Info */}
          <ScrollReveal direction="left">
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
                {t("contact.label")}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mt-4 mb-6">
                {t("contact.title")}
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                {t("contact.desc")}
              </p>

              {/* Contact Details */}
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <ScrollReveal key={item.label} delay={0.1 * index}>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-sm flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-medium hover:text-gold transition-colors whitespace-pre-line"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="font-medium whitespace-pre-line">
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="bg-card p-8 lg:p-10 rounded-sm shadow-medium">
              <h3 className="font-heading text-2xl mb-6">{t("contact.formTitle")}</h3>
              
              {submitStatus === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-gold mb-4" />
                  <h4 className="font-heading text-xl mb-2">{t("contact.success")}</h4>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t("contact.name")}
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("contact.namePlaceholder")}
                        className="bg-background border-border focus:border-gold"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t("contact.phone")}
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t("contact.phonePlaceholder")}
                        className="bg-background border-border focus:border-gold"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t("contact.emailLabel")}
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("contact.emailPlaceholder")}
                      className="bg-background border-border focus:border-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t("contact.projectType")}
                    </label>
                    <select 
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
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
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t("contact.details")}
                    </label>
                    <Textarea
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder={t("contact.detailsPlaceholder")}
                      rows={4}
                      className="bg-background border-border focus:border-gold resize-none"
                      required
                    />
                  </div>
                  
                  {/* hCaptcha */}
                  <div className="flex justify-center">
                    <HCaptcha
                      ref={captchaRef}
                      sitekey="10000000-ffff-ffff-ffff-000000000001"
                      onVerify={handleCaptchaVerify}
                      onExpire={handleCaptchaExpire}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="gold" 
                    size="lg" 
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t("contact.sending")}
                      </>
                    ) : (
                      <>
                        {t("contact.submit")}
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </>
                    )}
                  </Button>
                  
                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {t("contact.error")}
                    </div>
                  )}
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
