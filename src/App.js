import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Accessaccount from './accessboard/access-account';
import Farmeraccount from './farmers/farmeraccount';
import Farmerprofile from './farmers/farmerprofile';
import Products from './farmers/products';
import Sellproducts from './farmers/sellproducts';
import Wastage from './wastage';
import Fprices from './farmers/fprices';
import Farmerdashboard from './farmers/farmerdashboard';
import Fpesticides from './farmers/fpesticides';
import Buypesticides from './farmers/buypesticides';
import Fcheckout from './farmers/fcheckout';
import Farminguidence from './farmers/farminguidence';
import Chatbot from './Chatbot.js';
import Consumeraccount from './consumers/consumeraccount.js';
import Consumerdashboard from './consumers/consumerdashboard.js';
import CProducts from './consumers/cproducts.js';
import Buyproducts from './consumers/buyproducts.js';
import Cprices from './consumers/cprices.js';
import { LanguageProvider } from './LanguageContext.js';
import { generateToken, messaging } from './firebase.js';
import { getMessaging, onMessage } from 'firebase/messaging';
import Organic from './organic.js';
import Trackorder from './trackorder.js';
import Articles from './articles.js';

function App() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const storedEmail=localStorage.getItem('email');
  useEffect(()=>{
    generateToken(storedEmail);
    onMessage(messaging,(payload) => {
      console.log(payload);
    })
  },[]);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (
    <>
    
          <div className='chatbot-section-inapp'  onClick={toggleChatbot}>
        🗨️
      </div>

      {isChatbotVisible && (
        <div className='chatbot-section-inapp'>
          <Chatbot />
          <button id='buticon'onClick={toggleChatbot} >
            ❌
          </button>
        </div>
      )}
<LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accessaccount />} />
          <Route path="/farmeraccount" element={<Farmeraccount />} />
          <Route path="/farmerprofile" element={<Farmerprofile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sellproducts" element={<Sellproducts />} />
          <Route path="/wastage" element={<Wastage />} />
          <Route path="/fprices" element={<Fprices />} />
          <Route path="/fcheckout" element={<Fcheckout />} />
          <Route path="/buypesticides" element={<Buypesticides />} />
          <Route path="/fpesticides" element={<Fpesticides />} />
          <Route path="/farmerdashboard" element={<Farmerdashboard />} />
          <Route path='/farminguidence' element={<Farminguidence />} />
          <Route path="/consumeraccount" element={<Consumeraccount/>} />
          <Route path="/consumerdashboard" element={<Consumerdashboard/>} />
          <Route path="/cproducts" element={<CProducts/>} />
          <Route path="/buyproducts" element={<Buyproducts/>} />
          <Route path="/cprices" element={<Cprices/>} />
          <Route path="/organic" element={<Organic/>} />
          <Route path="/trackorder" element={<Trackorder/>} />
          <Route path="/articles" element={<Articles/>} />
        </Routes>
      </BrowserRouter>
      </LanguageProvider>
    </>
  );
}

export default App;
