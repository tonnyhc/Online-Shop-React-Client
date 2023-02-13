import { Route, Routes } from 'react-router-dom';
import './App.css';
import { About } from './components/about/Abouts';
import { Banner } from './components/banner/Banner';
import { Cart } from './components/cart/Cart';
import { Contacts } from './components/contacts/Contacts';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { AuthForm } from './components/login-register/AuthForm';


function App() {
  return (
    <div>
      <AuthForm />
      <Header />

      <main>
        <Routes>
          <Route path='/' element={<Banner />} />
          <Route path='/shop' element={<h1>This is the shop</h1>} />
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
