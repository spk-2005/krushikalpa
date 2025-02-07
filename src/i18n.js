import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language translations
const resources = {
  en: {
    translation: {
      "welcome": "Welcome to the Farmer's Portal",
      "farmerAccount": "Farmer Account",
      "consumerAccount": "Consumer Account",
      "profile": "Profile",
      "products": "Products",
      "sellProducts": "Sell Products"
    }
  },
  te: {
    translation: {
      "welcome": "వ్యవసాయదారుల పోర్టల్‌కు స్వాగతం",
      "farmerAccount": "వ్యవసాయదారుల ఖాతా",
      "consumerAccount": "భోజన ఖాతా",
      "profile": "ప్రొఫైల్",
      "products": "ఉత్పత్తులు",
      "sellProducts": "ఉత్పత్తులు అమ్మండి"
    }
  }
  // Add more languages here
};

i18n
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    lng: "en", // Default language
    keySeparator: false,
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;
