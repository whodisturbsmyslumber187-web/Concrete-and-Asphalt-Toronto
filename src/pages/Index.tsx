import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Services />
          <WhyChooseUs />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </LanguageProvider>
  );
};

export default Index;
