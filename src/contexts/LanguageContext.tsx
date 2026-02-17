import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Language = "en" | "ar";

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export const translations: Translations = {
  // Header
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.services": { en: "Services", ar: "خدماتنا" },
  "nav.portfolio": { en: "Portfolio", ar: "أعمالنا" },
  "nav.about": { en: "About", ar: "من نحن" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "header.getQuote": { en: "Get a Quote", ar: "احصل على عرض سعر" },
  
  // Hero
  "hero.tagline": { en: "Premium Craftsmanship • Over 60 Years Combined Experience", ar: "حرفية متميزة • أكثر من 60 عاماً من الخبرة المشتركة" },
  "hero.title1": { en: "Elevating Dubai's Skyline with Custom", ar: "نرتقي بأفق دبي بفن" },
  "hero.title2": { en: "Steel & Glass", ar: "الفولاذ والزجاج" },
  "hero.title3": { en: "Artistry", ar: "المخصص" },
  "hero.subtitle": { en: "Bespoke staircases and railings designed for discerning homeowners, architects, and commercial developers across the UAE.", ar: "سلالم ودرابزينات مصممة خصيصاً لأصحاب المنازل المميزين والمهندسين المعماريين ومطوري العقارات التجارية في جميع أنحاء الإمارات." },
  "hero.cta1": { en: "Request a Consultation", ar: "اطلب استشارة" },
  "hero.cta2": { en: "View Our Projects", ar: "شاهد مشاريعنا" },
  "hero.badge1": { en: "Dubai Municipality Licensed", ar: "مرخصة من بلدية دبي" },
  "hero.badge2": { en: "316 Marine Grade Steel", ar: "فولاذ بحري 316" },
  "hero.badge3": { en: "60+ Years Combined Experience", ar: "أكثر من 60 عاماً خبرة مشتركة" },
  
  // Services
  "services.label": { en: "Our Expertise", ar: "خبراتنا" },
  "services.title": { en: "Tailored Solutions for Every Space", ar: "حلول مخصصة لكل مساحة" },
  "services.residential": { en: "Residential", ar: "سكني" },
  "services.commercial": { en: "Commercial", ar: "تجاري" },
  "services.res.title": { en: "Residential Excellence", ar: "التميز السكني" },
  "services.res.desc": { en: "Transform your home with custom staircases that blend artistry with functionality. From grand spirals to sleek floating designs.", ar: "حوّل منزلك مع سلالم مخصصة تمزج بين الفن والوظيفة. من السلالم اللولبية الكبيرة إلى التصاميم العائمة الأنيقة." },
  "services.res.item1": { en: "Spiral & Helical Staircases", ar: "سلالم لولبية وحلزونية" },
  "services.res.item2": { en: "Floating Glass Staircases", ar: "سلالم زجاجية عائمة" },
  "services.res.item3": { en: "Frameless Glass Railings", ar: "درابزينات زجاجية بدون إطار" },
  "services.res.item4": { en: "Custom Metal Balustrades", ar: "درابزينات معدنية مخصصة" },
  "services.com.title": { en: "Commercial & Hospitality", ar: "تجاري وضيافة" },
  "services.com.desc": { en: "Large-scale solutions for offices, hotels, and public spaces. Engineered for safety, durability, and architectural impact.", ar: "حلول واسعة النطاق للمكاتب والفنادق والأماكن العامة. مصممة للسلامة والمتانة والتأثير المعماري." },
  "services.com.item1": { en: "Multi-Floor Feature Staircases", ar: "سلالم متعددة الطوابق" },
  "services.com.item2": { en: "Fire-Rated Steel Structures", ar: "هياكل فولاذية مقاومة للحريق" },
  "services.com.item3": { en: "Architectural Metalwork", ar: "أعمال معدنية معمارية" },
  "services.com.item4": { en: "Safety Railings & Handrails", ar: "درابزينات ومقابض السلامة" },
  "services.learnMore": { en: "Learn More", ar: "اعرف المزيد" },
  
  // Why Choose Us
  "why.label": { en: "Why Apex Stairs", ar: "لماذا أبيكس" },
  "why.title": { en: "Craftsmanship Meets Innovation", ar: "الحرفية تلتقي بالابتكار" },
  "why.desc": { en: "At Apex Stairs & Railings, we combine traditional metalworking artistry with cutting-edge CNC precision. Our commitment to quality materials and meticulous attention to detail has made us the trusted choice for Dubai's most prestigious properties.", ar: "في أبيكس للسلالم والدرابزينات، نجمع بين فن تشكيل المعادن التقليدي ودقة التحكم الرقمي المتطورة. التزامنا بجودة المواد والاهتمام الدقيق بالتفاصيل جعلنا الخيار الموثوق لأرقى العقارات في دبي." },
  "why.years": { en: "Years of Excellence", ar: "عاماً من التميز" },
  "why.f1.title": { en: "316 Marine Grade Steel", ar: "فولاذ بحري 316" },
  "why.f1.desc": { en: "Premium 316-grade stainless steel engineered for Dubai's coastal climate, ensuring lifetime corrosion resistance.", ar: "فولاذ مقاوم للصدأ درجة 316 مصمم لمناخ دبي الساحلي، يضمن مقاومة التآكل مدى الحياة." },
  "why.f2.title": { en: "Bespoke Customization", ar: "تخصيص حسب الطلب" },
  "why.f2.desc": { en: "Every project is uniquely designed to complement your architecture, from material selection to final finish.", ar: "كل مشروع مصمم بشكل فريد ليكمل هندستك المعمارية، من اختيار المواد إلى اللمسات النهائية." },
  "why.f3.title": { en: "On-Time Delivery", ar: "التسليم في الموعد" },
  "why.f3.desc": { en: "Precision planning and in-house fabrication ensure your project is completed on schedule, every time.", ar: "التخطيط الدقيق والتصنيع الداخلي يضمنان إتمام مشروعك في الموعد المحدد، في كل مرة." },
  "why.f4.title": { en: "Dubai Municipality Certified", ar: "معتمدة من بلدية دبي" },
  "why.f4.desc": { en: "Fully licensed and compliant with all UAE building codes, safety standards, and structural requirements.", ar: "مرخصة بالكامل ومتوافقة مع جميع قوانين البناء الإماراتية ومعايير السلامة والمتطلبات الهيكلية." },
  "why.f5.title": { en: "Turnkey Solutions", ar: "حلول متكاملة" },
  "why.f5.desc": { en: "From concept design through CNC fabrication to professional installation — we handle everything.", ar: "من التصميم المفاهيمي عبر التصنيع بالتحكم الرقمي إلى التركيب الاحترافي — نتولى كل شيء." },
  "why.f6.title": { en: "Sustainable Practices", ar: "ممارسات مستدامة" },
  "why.f6.desc": { en: "Eco-conscious manufacturing with recyclable materials and energy-efficient processes.", ar: "تصنيع صديق للبيئة بمواد قابلة لإعادة التدوير وعمليات موفرة للطاقة." },
  
  // Portfolio
  "portfolio.label": { en: "Our Work", ar: "أعمالنا" },
  "portfolio.title": { en: "Featured Projects", ar: "مشاريع مميزة" },
  "portfolio.viewAll": { en: "View All Projects", ar: "عرض جميع المشاريع" },
  "portfolio.viewProject": { en: "View Project", ar: "عرض المشروع" },
  "portfolio.residential": { en: "Residential", ar: "سكني" },
  "portfolio.commercial": { en: "Commercial", ar: "تجاري" },
  "portfolio.hospitality": { en: "Hospitality", ar: "ضيافة" },
  
  // Project names and descriptions
  "project1.title": { en: "Emirates Hills Villa", ar: "فيلا تلال الإمارات" },
  "project1.desc": { en: "Sculptural spiral staircase with curved glass balustrade and bronze handrails. A masterpiece of modern design seamlessly integrated into this prestigious villa.", ar: "سلم لولبي منحوت مع درابزين زجاجي منحني ومقابض برونزية. تحفة من التصميم الحديث متكاملة بسلاسة في هذه الفيلا الراقية." },
  "project2.title": { en: "DIFC Corporate Tower", ar: "برج الشركات DIFC" },
  "project2.desc": { en: "Minimalist floating staircase connecting four office floors with cable railings and brushed steel finishes for a contemporary corporate environment.", ar: "سلم عائم بسيط يربط أربعة طوابق مكتبية مع درابزينات كيبل وتشطيبات فولاذية مصقولة لبيئة مؤسسية معاصرة." },
  "project3.title": { en: "Al Habtoor Palace Hotel", ar: "فندق قصر الحبتور" },
  "project3.desc": { en: "Grand helical staircase with ornate wrought iron railings featuring gold leaf accents. Classic elegance for Dubai's premier hospitality destination.", ar: "سلم حلزوني فخم مع درابزينات حديد مشغول مزينة بلمسات ذهبية. أناقة كلاسيكية لوجهة الضيافة الأولى في دبي." },
  "project4.title": { en: "Downtown Loft Residence", ar: "شقة لوفت داون تاون" },
  "project4.desc": { en: "Industrial-chic steel staircase with blackened finish and oak treads. Cable railings maintain an open, airy feel in this contemporary penthouse.", ar: "سلم فولاذي بطابع صناعي أنيق مع تشطيب أسود ودرجات بلوط. درابزينات الكيبل تحافظ على إحساس مفتوح ومنعش في هذه الشقة العلوية المعاصرة." },
  "project5.title": { en: "Jumeirah Grand Ballroom", ar: "قاعة جميرا الكبرى" },
  "project5.desc": { en: "Opulent curved marble staircase with ornate gold railings and crystal chandelier accent. A statement piece for this luxury hotel's grand entrance.", ar: "سلم رخامي منحني فاخر مع درابزينات ذهبية مزخرفة وثريا كريستالية. قطعة بارزة لمدخل هذا الفندق الفاخر." },
  "project6.title": { en: "Palm Jumeirah Estate", ar: "عقار نخلة جميرا" },
  "project6.desc": { en: "Contemporary marble staircase with sleek gold-tone railings in a light-filled atrium. Clean lines meet classic elegance in this waterfront mansion.", ar: "سلم رخامي معاصر مع درابزينات ذهبية أنيقة في بهو مضاء. خطوط نظيفة تلتقي بالأناقة الكلاسيكية في هذا القصر المطل على الواجهة البحرية." },
  "project7.title": { en: "Heritage Museum Hall", ar: "قاعة المتحف التراثي" },
  "project7.desc": { en: "Majestic double-helix staircase with intricate bronze metalwork creating a stunning architectural centerpiece for this cultural landmark.", ar: "سلم حلزوني مزدوج مهيب مع أعمال معدنية برونزية معقدة تخلق قطعة معمارية مذهلة لهذا المعلم الثقافي." },
  "project8.title": { en: "Jumeirah Golf Estates Mansion", ar: "قصر جميرا غولف إستيتس" },
  "project8.desc": { en: "Modern floating glass staircase with LED-lit marble treads and frameless glass balustrade in a double-height foyer. Walnut handrails complement the contemporary villa's warm palette.", ar: "سلم زجاجي عائم حديث مع درجات رخامية مضاءة بالـ LED ودرابزين زجاجي بدون إطار في بهو مزدوج الارتفاع. مقابض الجوز تكمل لوحة الألوان الدافئة للفيلا المعاصرة." },
  "project9.title": { en: "Al Barsha Royal Palace", ar: "قصر البرشاء الملكي" },
  "project9.desc": { en: "Grand spiral staircase with ornate hand-forged gold-leaf railings and Calacatta marble treads. A palatial centerpiece inspired by classical Arabian architecture with a contemporary twist.", ar: "سلم لولبي فخم مع درابزينات مطروقة يدوياً بأوراق الذهب ودرجات رخام كالاكاتا. قطعة مركزية ملكية مستوحاة من العمارة العربية الكلاسيكية بلمسة معاصرة." },
  "project10.title": { en: "Business Bay Tech Hub", ar: "مركز التكنولوجيا بيزنس باي" },
  "project10.desc": { en: "Industrial-modern multi-floor feature staircase with matte black steel stringers, oak treads, and cable railings. Designed for a premium co-working space spanning three floors.", ar: "سلم صناعي حديث متعدد الطوابق مع عوارض فولاذية سوداء مطفية ودرجات بلوط ودرابزينات كيبل. مصمم لمساحة عمل مشتركة متميزة تمتد على ثلاثة طوابق." },
  "project11.title": { en: "Marina Skyline Penthouse", ar: "بنتهاوس أفق المارينا" },
  "project11.desc": { en: "Cantilevered concrete staircase with hidden structural steel and frameless glass balustrade. Panoramic skyline views frame each ascent in this duplex penthouse.", ar: "سلم خرساني معلق مع فولاذ هيكلي مخفي ودرابزين زجاجي بدون إطار. إطلالات بانورامية على الأفق تؤطر كل صعود في هذا البنتهاوس المزدوج." },
  "project12.title": { en: "Pearl Island Waterfront Villa", ar: "فيلا جزيرة اللؤلؤ البحرية" },
  "project12.desc": { en: "Marine-grade 316 stainless steel outdoor staircase with glass panels connecting pool terrace to rooftop. Built to withstand coastal conditions while maintaining architectural elegance.", ar: "سلم خارجي من الفولاذ المقاوم للصدأ البحري 316 مع ألواح زجاجية يربط تراس المسبح بالسطح. مبني لتحمل الظروف الساحلية مع الحفاظ على الأناقة المعمارية." },
  
  // Testimonials
  "testimonials.label": { en: "Client Stories", ar: "قصص العملاء" },
  "testimonials.title": { en: "Trusted by Dubai's Finest", ar: "موثوق من قبل أرقى عملاء دبي" },
  
  // Contact
  "contact.label": { en: "Get in Touch", ar: "تواصل معنا" },
  "contact.title": { en: "Let's Build Something Extraordinary", ar: "لنبني شيئاً استثنائياً" },
  "contact.desc": { en: "Whether you're an architect with a grand vision, a homeowner seeking the perfect staircase, or a developer planning your next landmark — we're here to bring your ideas to life.", ar: "سواء كنت مهندساً معمارياً لديه رؤية كبيرة، أو صاحب منزل يبحث عن السلم المثالي، أو مطوراً يخطط لمعلمك التالي — نحن هنا لتحويل أفكارك إلى واقع." },
  "contact.visit": { en: "Visit Our Showroom", ar: "زر صالة العرض" },
  "contact.call": { en: "Call Us", ar: "اتصل بنا" },
  "contact.email": { en: "Email Us", ar: "راسلنا" },
  "contact.hours": { en: "Working Hours", ar: "ساعات العمل" },
  "contact.hoursValue": { en: "Sun - Thu: 8AM - 6PM\nFri - Sat: Closed", ar: "الأحد - الخميس: 8ص - 6م\nالجمعة - السبت: مغلق" },
  "contact.formTitle": { en: "Request a Consultation", ar: "اطلب استشارة" },
  "contact.name": { en: "Full Name", ar: "الاسم الكامل" },
  "contact.namePlaceholder": { en: "Your name", ar: "اسمك" },
  "contact.phone": { en: "Phone Number", ar: "رقم الهاتف" },
  "contact.phonePlaceholder": { en: "+971 XX XXX XXXX", ar: "+971 XX XXX XXXX" },
  "contact.emailLabel": { en: "Email Address", ar: "البريد الإلكتروني" },
  "contact.emailPlaceholder": { en: "your@email.com", ar: "بريدك@email.com" },
  "contact.projectType": { en: "Project Type", ar: "نوع المشروع" },
  "contact.selectType": { en: "Select project type", ar: "اختر نوع المشروع" },
  "contact.typeResidential": { en: "Residential", ar: "سكني" },
  "contact.typeCommercial": { en: "Commercial", ar: "تجاري" },
  "contact.typeHospitality": { en: "Hospitality", ar: "ضيافة" },
  "contact.typeOther": { en: "Other", ar: "أخرى" },
  "contact.details": { en: "Project Details", ar: "تفاصيل المشروع" },
  "contact.detailsPlaceholder": { en: "Tell us about your project, timeline, and any specific requirements...", ar: "أخبرنا عن مشروعك والجدول الزمني وأي متطلبات محددة..." },
  "contact.submit": { en: "Send Inquiry", ar: "إرسال الاستفسار" },
  "contact.sending": { en: "Sending...", ar: "جاري الإرسال..." },
  "contact.success": { en: "Thank you! We'll contact you soon.", ar: "شكراً لك! سنتواصل معك قريباً." },
  "contact.error": { en: "Something went wrong. Please try again.", ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى." },
  "contact.captchaError": { en: "Please complete the captcha verification.", ar: "يرجى إكمال التحقق." },
  
  // Footer
  "footer.desc": { en: "Premium custom staircases and railings for Dubai's most distinguished properties. Combining traditional craftsmanship with modern engineering.", ar: "سلالم ودرابزينات مخصصة فاخرة لأرقى العقارات في دبي. نجمع بين الحرفية التقليدية والهندسة الحديثة." },
  "footer.services": { en: "Services", ar: "الخدمات" },
  "footer.resStairs": { en: "Residential Staircases", ar: "سلالم سكنية" },
  "footer.comStairs": { en: "Commercial Solutions", ar: "حلول تجارية" },
  "footer.glassRailings": { en: "Glass Railings", ar: "درابزينات زجاجية" },
  "footer.metalwork": { en: "Architectural Metalwork", ar: "أعمال معدنية معمارية" },
  "footer.company": { en: "Company", ar: "الشركة" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.privacy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "footer.terms": { en: "Terms of Service", ar: "شروط الخدمة" },

  // Map
  "map.label": { en: "Our Location", ar: "موقعنا" },
  "map.title": { en: "Visit Our Showroom", ar: "زر صالة العرض" },
  "map.desc": { en: "Located in the heart of Al Quoz Industrial Area, Dubai. Visit us to see our craftsmanship up close.", ar: "يقع في قلب المنطقة الصناعية بالقوز، دبي. قم بزيارتنا لمشاهدة حرفيتنا عن قرب." },

  // Booking
  "booking.label": { en: "Book a Consultation", ar: "احجز استشارة" },
  "booking.title": { en: "Schedule Your Free Consultation", ar: "حدد موعد استشارتك المجانية" },
  "booking.desc": { en: "Pick a date and time that works for you. Our design team will walk you through materials, finishes, and design options.", ar: "اختر التاريخ والوقت المناسب لك. فريق التصميم لدينا سيرشدك عبر المواد والتشطيبات وخيارات التصميم." },
  "booking.date": { en: "Preferred Date", ar: "التاريخ المفضل" },
  "booking.pickDate": { en: "Pick a date", ar: "اختر تاريخاً" },
  "booking.time": { en: "Preferred Time", ar: "الوقت المفضل" },
  "booking.book": { en: "Confirm My Consultation", ar: "تأكيد استشارتي" },
  "booking.success": { en: "Booking confirmed! We'll see you soon.", ar: "تم تأكيد الحجز! سنراك قريباً." },
  "booking.error": { en: "Failed to book. Please try again.", ar: "فشل الحجز. يرجى المحاولة مرة أخرى." },
  "booking.confirmed": { en: "Booking Confirmed!", ar: "تم تأكيد الحجز!" },
  "booking.confirmMsg": { en: "We'll send you a confirmation via WhatsApp. See you at our showroom!", ar: "سنرسل لك تأكيداً عبر واتساب. نراكم في صالة العرض!" },
  "booking.callbackNote": { en: "Our senior design consultant will call you at your selected time to discuss your vision.", ar: "سيتصل بك مستشار التصميم الأول في الوقت المحدد لمناقشة رؤيتك." },
  "booking.budget": { en: "Investment Range", ar: "نطاق الاستثمار" },
  "booking.selectBudget": { en: "Select investment range", ar: "اختر نطاق الاستثمار" },
  "booking.timeline": { en: "Project Timeline", ar: "الجدول الزمني للمشروع" },
  "booking.selectTimeline": { en: "Select timeline", ar: "اختر الجدول الزمني" },
  "booking.urgent": { en: "Immediate — Within 2 Weeks", ar: "فوري — خلال أسبوعين" },
  "booking.1to3": { en: "1 – 3 Months", ar: "1 – 3 أشهر" },
  "booking.3to6": { en: "3 – 6 Months", ar: "3 – 6 أشهر" },
  "booking.6plus": { en: "6+ Months", ar: "أكثر من 6 أشهر" },
  "booking.planning": { en: "Planning Phase", ar: "مرحلة التخطيط" },
  "booking.floors": { en: "Floors", ar: "الطوابق" },
  "booking.material": { en: "Material", ar: "المواد" },
  "booking.steel": { en: "Stainless Steel", ar: "فولاذ مقاوم للصدأ" },
  "booking.glass": { en: "Glass + Steel", ar: "زجاج + فولاذ" },
  "booking.wood": { en: "Wood + Steel", ar: "خشب + فولاذ" },
  "booking.marble": { en: "Marble + Steel", ar: "رخام + فولاذ" },
  "booking.concrete": { en: "Concrete + Steel", ar: "خرسانة + فولاذ" },
  "booking.wroughtIron": { en: "Wrought Iron", ar: "حديد مشغول" },

  // Instant Quote Calculator
  "quote.label": { en: "Instant Estimate", ar: "تقدير فوري" },
  "quote.title": { en: "Get Your Price Estimate in 60 Seconds", ar: "احصل على تقدير السعر في 60 ثانية" },
  "quote.desc": { en: "Answer a few quick questions and get an instant ballpark estimate. No commitment required.", ar: "أجب على بعض الأسئلة السريعة واحصل على تقدير فوري. لا التزام مطلوب." },
  "quote.step1": { en: "What type of staircase or railing?", ar: "ما نوع السلم أو الدرابزين؟" },
  "quote.step2": { en: "Preferred material finish?", ar: "التشطيب المفضل للمواد؟" },
  "quote.step3": { en: "How many floors?", ar: "كم عدد الطوابق؟" },
  "quote.step4": { en: "What's your project timeline?", ar: "ما هو الجدول الزمني لمشروعك؟" },
  "quote.step5": { en: "What type of property?", ar: "ما نوع العقار؟" },
  "quote.step6": { en: "What's your approximate budget?", ar: "ما هي ميزانيتك التقريبية؟" },
  "quote.estimate": { en: "Your Estimated Range", ar: "النطاق التقديري" },
  "quote.disclaimer": { en: "Final price depends on site conditions & customization", ar: "السعر النهائي يعتمد على ظروف الموقع والتخصيص" },
  "quote.contactPrompt": { en: "Enter your details to receive a detailed quote from our team:", ar: "أدخل بياناتك لتلقي عرض سعر مفصل من فريقنا:" },
  "quote.getQuote": { en: "Get My Detailed Quote", ar: "احصل على عرض السعر المفصل" },
  "quote.thanks": { en: "Quote Request Received!", ar: "تم استلام طلب العرض!" },
  "quote.thanksMsg": { en: "Our team will review your requirements and send a detailed quote within 24 hours.", ar: "سيراجع فريقنا متطلباتك ويرسل عرض سعر مفصل خلال 24 ساعة." },

  // Exit Intent Popup
  "exit.title": { en: "Wait! Don't Leave Empty-Handed", ar: "انتظر! لا تغادر خالي الوفاض" },
  "exit.desc": { en: "Get a FREE design consultation + 3D render of your dream staircase. No obligation, just expert advice.", ar: "احصل على استشارة تصميم مجانية + تصميم ثلاثي الأبعاد لسلم أحلامك. بدون التزام، مجرد نصيحة خبراء." },
  "exit.cta": { en: "Claim My Free Consultation", ar: "احصل على استشارتي المجانية" },
  "exit.thanks": { en: "Thank You!", ar: "شكراً لك!" },
  "exit.thanksMsg": { en: "We'll call you within 24 hours with your free consultation.", ar: "سنتصل بك خلال 24 ساعة لاستشارتك المجانية." },

  // Sticky Lead Bar
  "sticky.text": { en: "Want a free quote? Drop your number:", ar: "تريد عرض سعر مجاني؟ أدخل رقمك:" },
  "sticky.cta": { en: "Call Me Back", ar: "اتصلوا بي" },
  "sticky.success": { en: "We'll call you back shortly!", ar: "سنتصل بك قريباً!" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  }, [language]);

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
