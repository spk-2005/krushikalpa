import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
import Chatbot from './chatbot/chatbot';

function App() {

  return (
    <>

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
          <Route path='/farminguidence' element={<Farminguidence/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
