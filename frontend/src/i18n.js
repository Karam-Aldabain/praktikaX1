import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      common: {
        language: "Language",
        languages: {
          en: "English",
          de: "Deutsch",
          ar: "Arabic",
        },
      },
      navbar: {
        loginPortal: "Login / Portal",
        learnMore: "Learn More",
        hoverItem: "Hover an item",
        hoverItemText: "Move over an item card to preview its details in this panel.",
        previewPanel: "Preview panel",
        toggleMenu: "Toggle menu",
        switchToLight: "Switch to light mode",
        switchToDark: "Switch to dark mode",
        contact: "Contact",
        aboutPraktix: "About Praktix",
      },
      footer: {
        aboutText: "Join us in exploring real-world projects, mentorship, and career opportunities.",
        participate: "Participate",
        becomePartner: "Become a Partner",
        becomeCoHost: "Become a Co-Host",
        becomeExpert: "Become an Expert",
        connect: "Connect",
        contactUs: "Contact Us",
        faq: "FAQ",
        quickLinks: "Quick Links",
        ourPartners: "Our Partners",
        ourExperts: "Our Experts",
        successStories: "Success Stories",
        termsOfUse: "Terms of Use",
        privacyPolicy: "Privacy Policy",
      },
      cookie: {
        textPrefix: "We use cookies to enhance user experience and analyze traffic. See our",
        privacyPolicy: "Privacy Policy",
        accept: "Accept",
        manage: "Manage",
      },
      nav: {
        groups: {
          individuals: {
            label: "For Individuals",
            columns: {
              0: {
                title: "Learner Segments",
                items: {
                  0: { label: "Students & Graduates" },
                  1: { label: "AI for Real-World Careers" },
                },
              },
              1: {
                title: "Growth Paths",
                items: {
                  0: { label: "1-to-1 Career Mentorship" },
                },
              },
            },
          },
          organizations: {
            label: "For Organizations",
            columns: {
              0: {
                title: "Institution Types",
                items: {
                  0: { label: "Universities & Companies" },
                  1: { label: "Schools & Early Talent Programs" },
                },
              },
              1: {
                title: "Strategic Solutions",
                items: {
                  0: { label: "AI for Organizations" },
                },
              },
            },
          },
          insights: {
            label: "Insights",
            columns: {
              0: {
                title: "Impact",
                items: {
                  0: { label: "Impact & Outcomes" },
                  1: { label: "Real Experience" },
                },
              },
              1: {
                title: "Proof",
                items: {
                  0: { label: "Success & Testimonials" },
                  1: { label: "Our Value Model" },
                },
              },
            },
          },
          about: {
            label: "About",
            columns: {
              0: {
                title: "Core",
                items: {
                  0: { label: "Our Mission & Vision" },
                  1: { label: "How We Work" },
                  2: { label: "Ecosystem" },
                  3: { label: "Partnerships" },
                },
              },
            },
          },
        },
      },
    },
  },
  de: {
    translation: {
      common: {
        language: "Sprache",
        languages: {
          en: "Englisch",
          de: "Deutsch",
          ar: "Arabisch",
        },
      },
      navbar: {
        loginPortal: "Login / Portal",
        learnMore: "Mehr erfahren",
        hoverItem: "Eintrag auswählen",
        hoverItemText: "Bewege die Maus über eine Karte, um hier die Details zu sehen.",
        previewPanel: "Vorschau",
        toggleMenu: "Menü öffnen",
        switchToLight: "Zum hellen Modus wechseln",
        switchToDark: "Zum dunklen Modus wechseln",
        contact: "Kontakt",
        aboutPraktix: "Über Praktix",
      },
      footer: {
        aboutText: "Entdecke mit uns reale Projekte, Mentoring und Karrierechancen.",
        participate: "Mitmachen",
        becomePartner: "Partner werden",
        becomeCoHost: "Co-Host werden",
        becomeExpert: "Expert:in werden",
        connect: "Kontakt",
        contactUs: "Kontakt",
        faq: "FAQ",
        quickLinks: "Schnellzugriff",
        ourPartners: "Unsere Partner",
        ourExperts: "Unsere Expert:innen",
        successStories: "Erfolgsgeschichten",
        termsOfUse: "Nutzungsbedingungen",
        privacyPolicy: "Datenschutz",
      },
      cookie: {
        textPrefix: "Wir verwenden Cookies, um die Nutzererfahrung zu verbessern und Traffic zu analysieren. Siehe unsere",
        privacyPolicy: "Datenschutzerklärung",
        accept: "Akzeptieren",
        manage: "Verwalten",
      },
      nav: {
        groups: {
          individuals: {
            label: "Für Einzelpersonen",
            columns: {
              0: {
                title: "Lernsegmente",
                items: {
                  0: { label: "Studierende & Absolvent:innen" },
                  1: { label: "KI für reale Karrieren" },
                },
              },
              1: {
                title: "Entwicklungspfade",
                items: {
                  0: { label: "1-zu-1 Karriere-Mentoring" },
                },
              },
            },
          },
          organizations: {
            label: "Für Organisationen",
            columns: {
              0: {
                title: "Institutionstypen",
                items: {
                  0: { label: "Universitäten & Unternehmen" },
                  1: { label: "Schulen & Frühförderprogramme" },
                },
              },
              1: {
                title: "Strategische Lösungen",
                items: {
                  0: { label: "KI für Organisationen" },
                },
              },
            },
          },
          insights: {
            label: "Insights",
            columns: {
              0: {
                title: "Wirkung",
                items: {
                  0: { label: "Wirkung & Ergebnisse" },
                  1: { label: "Praxis-Erfahrung" },
                },
              },
              1: {
                title: "Nachweise",
                items: {
                  0: { label: "Erfolg & Testimonials" },
                  1: { label: "Unser Wertmodell" },
                },
              },
            },
          },
          about: {
            label: "Über uns",
            columns: {
              0: {
                title: "Kern",
                items: {
                  0: { label: "Mission & Vision" },
                  1: { label: "Wie wir arbeiten" },
                  2: { label: "Ökosystem" },
                  3: { label: "Partnerschaften" },
                },
              },
            },
          },
        },
      },
    },
  },
  ar: {
    translation: {
      common: {
        language: "اللغة",
        languages: {
          en: "الإنجليزية",
          de: "الألمانية",
          ar: "العربية",
        },
      },
      navbar: {
        loginPortal: "تسجيل الدخول / البوابة",
        learnMore: "اعرف المزيد",
        hoverItem: "مرّر على عنصر",
        hoverItemText: "حرّك المؤشر فوق البطاقة لعرض التفاصيل هنا.",
        previewPanel: "لوحة المعاينة",
        toggleMenu: "فتح القائمة",
        switchToLight: "التبديل إلى الوضع الفاتح",
        switchToDark: "التبديل إلى الوضع الداكن",
        contact: "تواصل",
        aboutPraktix: "عن Praktix",
      },
      footer: {
        aboutText: "انضم إلينا لاستكشاف المشاريع الواقعية والإرشاد وفرص العمل.",
        participate: "شارك",
        becomePartner: "كن شريكًا",
        becomeCoHost: "كن مضيفًا مشاركًا",
        becomeExpert: "كن خبيرًا",
        connect: "تواصل",
        contactUs: "اتصل بنا",
        faq: "الأسئلة الشائعة",
        quickLinks: "روابط سريعة",
        ourPartners: "شركاؤنا",
        ourExperts: "خبراؤنا",
        successStories: "قصص النجاح",
        termsOfUse: "شروط الاستخدام",
        privacyPolicy: "سياسة الخصوصية",
      },
      cookie: {
        textPrefix: "نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل الزيارات. اطّلع على",
        privacyPolicy: "سياسة الخصوصية",
        accept: "موافقة",
        manage: "إدارة",
      },
      nav: {
        groups: {
          individuals: {
            label: "للأفراد",
            columns: {
              0: {
                title: "فئات المتعلمين",
                items: {
                  0: { label: "الطلاب والخريجون" },
                  1: { label: "الذكاء الاصطناعي لمسارات مهنية واقعية" },
                },
              },
              1: {
                title: "مسارات النمو",
                items: {
                  0: { label: "إرشاد مهني 1:1" },
                },
              },
            },
          },
          organizations: {
            label: "للمؤسسات",
            columns: {
              0: {
                title: "أنواع المؤسسات",
                items: {
                  0: { label: "الجامعات والشركات" },
                  1: { label: "المدارس وبرامج المواهب المبكرة" },
                },
              },
              1: {
                title: "حلول استراتيجية",
                items: {
                  0: { label: "الذكاء الاصطناعي للمؤسسات" },
                },
              },
            },
          },
          insights: {
            label: "الرؤى",
            columns: {
              0: {
                title: "الأثر",
                items: {
                  0: { label: "الأثر والنتائج" },
                  1: { label: "الخبرة الواقعية" },
                },
              },
              1: {
                title: "الإثبات",
                items: {
                  0: { label: "النجاح والشهادات" },
                  1: { label: "نموذج القيمة لدينا" },
                },
              },
            },
          },
          about: {
            label: "من نحن",
            columns: {
              0: {
                title: "الأساس",
                items: {
                  0: { label: "رسالتنا ورؤيتنا" },
                  1: { label: "كيف نعمل" },
                  2: { label: "المنظومة" },
                  3: { label: "الشراكات" },
                },
              },
            },
          },
        },
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "de", "ar"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "px_lang",
    },
  });

export default i18n;
