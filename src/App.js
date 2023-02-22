import { useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthDataContext } from '../src/contexts/AuthContext';

import { About } from './components/about/Abouts';
import { Banner } from './components/banner/Banner';
import { Cart } from './components/cart/Cart';
import { Contacts } from './components/contacts/Contacts';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { AuthForm } from './components/login-register/AuthForm';
import { Logout } from './components/Logout';
import { ProductDetails } from './components/products/productDetails/ProductDetails';
import { Products } from './components/products/Products';
import { Profile } from './components/profile/Profile';


function App() {
  const [userData, setUserData] = useState({});
  
  const userLogin = (authData) => {
    setUserData(authData);
  }

  const userLogout = () => {
    setUserData({})
  }


  return (
    <div>
      <AuthDataContext.Provider value={{userData, userLogin, userLogout}}>
        <AuthForm />
        <Header />

        <main>
          <Routes>
            <Route path='/' element={<Banner />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:productId' element={<ProductDetails />} />
            <Route path='/about' element={<About />} />
            <Route path='/features' element={<h1>Features page</h1>} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </main>


        <Footer />
      </AuthDataContext.Provider>
    </div>

  );
}

export default App;
