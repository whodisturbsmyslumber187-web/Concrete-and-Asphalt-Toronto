import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Visit Our Showroom",
      value: "Industrial Area 13, Al Quoz\nDubai, UAE",
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+971 4 123 4567",
      href: "tel:+97141234567",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "info@apexstairs.ae",
      href: "mailto:info@apexstairs.ae",
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: "Sun - Thu: 8AM - 6PM\nFri - Sat: Closed",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Info */}
          <div>
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
              Get in Touch
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mt-4 mb-6">
              Let's Build Something Extraordinary
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Whether you're an architect with a grand vision, a homeowner seeking
              the perfect staircase, or a developer planning your next landmark — we're
              here to bring your ideas to life.
            </p>

            {/* Contact Details */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex gap-4">
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
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-card p-8 lg:p-10 rounded-sm shadow-medium">
            <h3 className="font-heading text-2xl mb-6">Request a Consultation</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Full Name
                  </label>
                  <Input
                    placeholder="Your name"
                    className="bg-background border-border focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Phone Number
                  </label>
                  <Input
                    placeholder="+971 XX XXX XXXX"
                    className="bg-background border-border focus:border-gold"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-background border-border focus:border-gold"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Project Type
                </label>
                <select className="w-full h-10 px-3 rounded-sm bg-background border border-border text-sm focus:outline-none focus:border-gold">
                  <option value="">Select project type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Project Details
                </label>
                <Textarea
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                  rows={4}
                  className="bg-background border-border focus:border-gold resize-none"
                />
              </div>
              <Button variant="gold" size="lg" className="w-full group">
                Send Inquiry
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
