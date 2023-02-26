import { Link } from "react-router-dom";
import "./Banner.css";

export const Banner = () => {
  return (
    <section className="banner" aria-label="gender-selector">
      <div className="carousel" data-carousel>
        <button className="carousel-button prev" data-carousel-button="prev">
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <button className="carousel-button next" data-carousel-button="next">
          <i className="fa-solid fa-caret-right"></i>
        </button>
        <ul data="slides">
          <li className="slide" data-active>
            <div className="slide-text">
              <div>
                <h1>Women's eyewear</h1>
                <span>Want to Look Your Best?</span>
              </div>
              <Link className='carousel-shop-button' to="/products">SHOP NOW</Link>
            </div>
            <img
              src="/images/Carousel-Images/young-stylish-sexy-hipster-woman-vacation-aviator-sunglasses-happy-smiling-enjoying-sun-tropical-island-blue-lagoon-landscape_285396-5977.jpg"
              alt="Woman Image"
            />
          </li>

          <li className="slide">
            <div className="slide-text">
              <h3>Men's eyewear</h3>
              <span>Want to Look Your Best?</span>
              <Link className='carousel-shop-button' to="/products">SHOP NOW</Link>
            </div>
            <img
              src="/images/Carousel-Images/alexey-turenkov-X9ymCFUP6Kc-unsplash.jpg"
              alt="Man Image"
            />
          </li>

          <li className="slide">
            <div className="slide-text">
              <h1>Women's eyewear</h1>
              <span>Want to Look Your Best?</span>
              <Link className='carousel-shop-button' to="/products">SHOP NOW</Link>
            </div>
            <img
              src="/images/Carousel-Images/ethan-robertson-SYx3UCHZJlo-unsplash.jpg"
              alt="Sunglasses Image"
            />
          </li>

          <li className="slide">
            <div className="slide-text">
              <h1>Men's eyewear</h1>
              <span>Want to Look Your Best?</span>
              <Link className='carousel-shop-button' to="/products">SHOP NOW</Link>
            </div>
            <img
              src="/images/Carousel-Images/bud-helisson-kqguzgvYrtM-unsplash.jpg"
              alt="Sunglasses Image"
            />
          </li>
        </ul>
      </div>
    </section>
  );
}