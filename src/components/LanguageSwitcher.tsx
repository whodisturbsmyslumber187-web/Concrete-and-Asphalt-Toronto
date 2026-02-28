import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-sm hover:bg-secondary"
      aria-label={language === "en" ? "Switch to French" : "Switch to English"}
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase tracking-wider">
        {language === "en" ? "Français" : "English"}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
