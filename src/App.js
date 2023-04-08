import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../src/contexts/AuthContext';
import { BasketProvider } from './contexts/BasketContext';


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
import Orders from './components/orders/Orders';
import OrderDetails from './components/orders/order-details/OrderDetails';
import FavoriteProducts from './components/favorite-products/FavoriteProducts';
import AdminPanel from './components/admin/AdminPanel';

import { RouteGuard } from './components/common/RouteGuard';
import { IsStaff } from './components/common/IsStaff';


function App() {


  return (
    <>
      <AuthProvider>
        <AuthForm />
        <BasketProvider>
          <Header />
          <main>
            <Routes>
              <Route element={<IsStaff />}>
                <Route path='/admin/*' element={<AdminPanel />} />
              </Route>
              <Route path='/' element={<Banner />} />

              <Route element={<RouteGuard />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/profile/orders' element={<Orders />} />
                <Route path='/profile/favorites' element={<FavoriteProducts />} />
                <Route path='/orders/order/:orderId' element={<OrderDetails />} />
                <Route path='logout' element={<Logout />} />
                <Route path='/cart' element={<Cart />} />
              </Route>

              <Route path='/products' element={<Products />} />
              <Route path='products/:productId' element={<ProductDetails />} />
              <Route path='/about' element={<About />} />
              <Route path='/features' element={<h1>Features page</h1>} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/*' element={<h2>404 Not found!</h2>} />
            </Routes>
          </main>
        </BasketProvider>


        <Footer />
      </AuthProvider>
    </>


  );
}

export default App;
