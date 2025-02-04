
import Accessaccount from './accessboard/access-account';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Farmeraccount from './farmers/farmeraccount';
import Consumeraccount from './consumers/consumeraccount';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Accessaccount/>}/>
      <Route path='/farmeraccount' element={<Farmeraccount/>}/>
      <Route path='/consumeraccount' element={<Consumeraccount/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
