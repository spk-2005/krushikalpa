
  import Accessaccount from './accessboard/access-account';
  import './App.css';
  import {BrowserRouter,Routes,Route} from 'react-router-dom';
  import Farmeraccount from './farmers/farmeraccount';
  import Consumeraccount from './consumers/consumeraccount';
  import Farmerprofile from './farmers/farmerprofile';
  import Products from './farmers/products';
  import Sellproducts from './farmers/sellproducts';
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
      </Routes>
      </BrowserRouter>
      </>
    );
  }

  export default App;
