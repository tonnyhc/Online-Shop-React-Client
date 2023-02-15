import { Route, Routes } from 'react-router-dom';
import { About } from './components/about/Abouts';
import { Banner } from './components/banner/Banner';
import { Cart } from './components/cart/Cart';
import { Contacts } from './components/contacts/Contacts';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { AuthForm } from './components/login-register/AuthForm';
import { ProductDetails } from './components/products/productDetails/ProductDetails';
import { Products } from './components/products/Products';

import './css/global.css'

function App() {
  return (
    <div>
      <AuthForm />
      <Header />

      <main>
        <Routes>
          <Route path='/' element={<Banner />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:productId' element={<ProductDetails />} />
          <Route path='/about' element={<About />} />
          <Route path='/features' element={<h1>Features page</h1>} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>


      <Footer />
    </div>
  );
}

export default App;
