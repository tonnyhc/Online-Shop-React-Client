import { useState, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';

import { AuthDataContext } from '../src/contexts/AuthContext';
import { BasketContext } from './contexts/BasketContext';
import * as basketServices from './services/basketService'

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
import { useLocalStorage } from './hooks/useLocalStorage';


function App() {
  const [userData, setUserData] = useLocalStorage('userData', {});
  const [csrfToken, setCsrfToken] = useState(Cookies.get('csrftoken'))
  const [userBasket, setUserBasket] = useState({});

  useEffect(() => {
    const fetchBasket = async () => {
      const username = userData.username
      const basket = await basketServices.getBasket(username, csrfToken);
      setUserBasket(basket)
    };

    fetchBasket();
  }, [])

  const userLogin = (authData) => {
    setUserData(authData);
  }

  const userLogout = () => {
    setUserData({})
  }


  return (
    <div>
      <AuthDataContext.Provider value={{ userData, userLogin, userLogout, csrfToken }}>
        <AuthForm />
        <BasketContext.Provider value={{ userBasket }}>
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
        </BasketContext.Provider>


        <Footer />
      </AuthDataContext.Provider>
    </div>

  );
}

export default App;
