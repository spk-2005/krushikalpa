
  import Accessaccount from './accessboard/access-account';
  import './App.css';
  import {BrowserRouter,Routes,Route} from 'react-router-dom';
  import Farmeraccount from './farmers/farmeraccount';
  import Consumeraccount from './consumers/consumeraccount';
  import Farmerprofile from './farmers/farmerprofile';
  import Products from './farmers/products';
  import Sellproducts from './farmers/sellproducts';
import Wastage from './wastage';
  function App() {
    return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Accessaccount/>}/>
        <Route path='/farmeraccount' element={<Farmeraccount/>}/>
        <Route path='/consumeraccount' element={<Consumeraccount/>}/>
        <Route path='/farmerprofile' element={<Farmerprofile/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/sellproducts' element={<Sellproducts/>}/>
        <Route path='/wastage' element={<Wastage/>}/>
        
      </Routes>
      </BrowserRouter>
      </>
    );
  }

  export default App;
