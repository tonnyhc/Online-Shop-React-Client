import { openAuthWindow } from '../login-register/AuthForm';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import { useContext } from 'react';
import { AuthDataContext } from '../../contexts/AuthContext';
import { BasketContext } from '../../contexts/BasketContext';

export const Header = () => {

  const { userData, isAuth, isStaff } = useContext(AuthDataContext);
  const { basket } = useContext(BasketContext);
  let basket_length = 0;
  if (basket.basketitem_set){
    basket_length = basket.basketitem_set.length
  }

  const activeNavStyle = {
    color: "#FF4E00",
  };


  return (
    <header>
      <section className="header-top-info">

        <p>Need Help?</p>
        <p>
          <i style={{ color: "orange" }} className="fa-solid fa-phone-flip"></i> Call
          0891234567
        </p>
      </section>

      <section className="logo-nav-section">
        <article className="logo">
          <h1><NavLink to='/'>GOGGLES</NavLink></h1>
        </article>
        <hr />
        <article className="navigation">
          <span className='nav-bar-collapse' onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </span>
          <nav>
            <ul className="nav-ul" role="list">

              <li className="list-item">
                <NavLink
                  to='/'
                  style={({ isActive }) =>
                    isActive ? activeNavStyle : undefined
                  }
                >
                  HOME
                </NavLink>

              </li>
              <li className="list-item">
                <NavLink to="/about"
                  style={({ isActive }) =>
                    isActive ? activeNavStyle : undefined
                  }
                >
                  ABOUT
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink to='/features'
                  style={({ isActive }) =>
                    isActive ? activeNavStyle : undefined
                  }
                >
                  FEATURES
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink
                  to='/products'
                  style={({ isActive }) =>
                    isActive ? activeNavStyle : undefined
                  }
                >
                  PRODUCTS
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink to='/contacts'
                  style={({ isActive }) =>
                    isActive ? activeNavStyle : undefined
                  }
                >
                  CONTACTS
                </NavLink>
              </li>
              {/* <!-- HERE CAN ADD A SEARCH BAR  --> */}
            </ul>
          </nav>
        </article>
      </section>

      <section className="cart-profile-section">
        <span className="profile-link">
          {/* IF USER NOT LOGGED IN OPEN AUTH FORM OTHERWISE OPEN PROFILE WINDOW */}
          {
            isAuth
              ?
              <NavLink to="/profile"><i className="fa-solid fa-user"></i></NavLink>
              :
              <a href="#" onClick={openAuthWindow}><i className="fa-solid fa-user"></i></a>
          }
        </span>

        <span className="cart">
          <NavLink to='/cart'>
            My Cart 
            <i className="fa-solid fa-cart-shopping"></i>
            {basket_length > 0 && <span>{basket_length}</span>}
          </NavLink>
        </span>
        {isAuth && <p><Link to='/logout'>Logout</Link></p>}
        {isStaff && isAuth && <p><Link to='/admin'>Admin</Link></p>}

      </section>
    </header>
  );
}


function openNav(e) {
  e.preventDefault();
  const nav = document.querySelector('.navigation nav');
  if (nav.style.display === 'none') {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
  }
}