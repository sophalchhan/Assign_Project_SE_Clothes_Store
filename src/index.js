import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// main.jsx or index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Homepage from './pages/homepage/Homepage';
import Productpage from './pages/productpage/Productpage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Notfoundpage from './pages/404notfoundpage/Notfoundpage';
import { CartProvider } from './pages/cartcontext/Cartcontext';
import CartPage from './pages/cartpage/Cartpage';
import Footercomponent from './components/footercomponent/Footercomponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/product' element={<Productpage/>}/>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/footer" element={<Footercomponent/>} />
          <Route path='*' element={<Notfoundpage/>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
