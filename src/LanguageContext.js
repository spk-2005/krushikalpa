import React, { createContext, useState, useContext } from 'react';
import './LanguageContext.css';
const LanguageContext = createContext();

export const translations = {
  english: {    
    dashboard: "Dashboard",
    products: "Products",
    recyclingWastage: "Recycling Wastage",
    prices: "Prices",
    articlesAndBlogs: "Articles & Blogs",
    profile: "Profile",
    logout: "Log Out" ,
     mainHeading: "Healthy Agriculture Matters",
    slogan: "Nurture the land, and it will nurture you. Get organic pesticides now!",
    ctaButton: "Click Me",
    
    freshVeggiesHeading: "Get Fresh Vegetables Straight from Local Farmers",
    freshVeggiesDesc: "Support farmers and enjoy farm-fresh veggies at the best prices. Say goodbye to middlemen and experience quality like never before.",
    productsButton: "See Products Now",
    
    wasteHeading: "Earn by Selling Your Waste!",
    wasteDescription: "As a farmer, you can now earn extra income by selling your agricultural waste to us. We collect and process agricultural by-products, giving you a sustainable way to dispose of your waste and earn money.",
    wasteExtraInfo: "Join us in turning waste into valuable resources, helping the environment while boosting your income!",
    contactButton: "Contact Us to Learn More",
    address: {
        heading: "Address:",
        line1: "1. Guntur, Chowdawaram, 522019",
        line2: "2. Andhra Pradesh",
        line3: "3. India"
      }
  },
  telugu: {
    dashboard: "డాష్‌బోర్డ్",
    products: "ఉత్పత్తులు",
    recyclingWastage: "వ్యర్థ పునర్వినియోగం",
    prices: "ధరలు",
    articlesAndBlogs: "వ్యాసాలు & బ్లాగులు",
    profile: "ప్రొఫైల్",
    logout: "లాగ్ అవుట్",
    mainHeading: "ఆరోగ్యకరమైన వ్యవసాయం ముఖ్యం",
    slogan: "భూమిని పోషించండి, అది మిమ్మల్ని పోషిస్తుంది. ఇప్పుడే సేంద్రీయ పురుగుమందులను పొందండి!",
    ctaButton: "నన్ను క్లిక్ చేయండి",
    
    freshVeggiesHeading: "స్థానిక రైతుల నుండి తాజా కూరగాయలు నేరుగా పొందండి",
    freshVeggiesDesc: "రైతులకు మద్దతు ఇవ్వండి మరియు ఉత్తమమైన ధరలకు తాజా కూరగాయలను ఆస్వాదించండి. మధ్యవర్తులకు వీడ్కోలు చెప్పండి మరియు ఎప్పటిలాంటి నాణ్యతను అనుభవించండి.",
    productsButton: "ఉత్పత్తులను ఇప్పుడే చూడండి",
    
    wasteHeading: "మీ వ్యర్థాలను అమ్మి సంపాదించండి!",
    wasteDescription: "రైతుగా, మీరు ఇప్పుడు మీ వ్యవసాయ వ్యర్థాలను మాకు అమ్మడం ద్వారా అదనపు ఆదాయాన్ని పొందవచ్చు. మేము వ్యవసాయ ఉప-ఉత్పత్తులను సేకరించి ప్రాసెస్ చేస్తాము, మీ వ్యర్థాలను పారవేయడానికి సుస్థిర మార్గాన్ని అందిస్తూ డబ్బు సంపాదించే అవకాశం కల్పిస్తాము.",
    wasteExtraInfo: "వ్యర్థాలను విలువైన వనరులుగా మార్చడంలో మాతో చేరండి, పర్యావరణానికి సహాయం చేస్తూ మీ ఆదాయాన్ని పెంచుకోండి!",
    contactButton: "మరింత తెలుసుకోవడానికి మమ్మల్ని సంప్రదించండి",
    
    address: {
      heading: "చిరునామా:",
      line1: "1. గుంటూరు, చౌడవరం, 522019",
      line2: "2. ఆంధ్ర ప్రదేశ్",
      line3: "3. భారతదేశం"
    }  
  },
  
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('english');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
