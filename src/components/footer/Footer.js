import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-top">

                <div className="footer-top_item">
                    <div className="icon">
                        <i className="fa-solid fa-gift"></i>
                    </div>

                    <div className="info">
                        <p className='item_title'>GENUINE PRODUCT</p>
                        <p className='info_desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, sint!</p>
                    </div>
                </div>

                <div className="footer-top_item">
                    <div className="icon">
                        <i className="fa-solid fa-shield-halved"></i>
                    </div>

                    <div className="info">
                        <p className='item_title'>SECURE PRODUCTS</p>
                        <p className='info_desc'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>

                <div className="footer-top_item">
                    <div className="icon">
                        <i className="fa-solid fa-dollar-sign"></i>
                    </div>

                    <div className="info">
                        <p className='item_title'>CASH ON DELIVERY</p>
                        <p className='info_desc'>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                </div>

                <div className="footer-top_item">
                    <div className="icon">
                        <i className="fa-solid fa-truck"></i>
                    </div>

                    <div className="info">
                        <p className='item_title'>EASY DELIVERY</p>
                        <p className='info_desc'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis?</p>
                    </div>
                </div>


            </div>

            <div className="footer-bottom">

                <div className="about footer_botom__section">
                    <h3>Abouts Us</h3>

                    <p>
                        Curabitur non nulla sit amet nislinit tempus convallis quis ac lectus.
                        lac inia eget consectetur sed, convallis at tellus. Nulla porttitor
                        accumsana tincidunt.
                    </p>

                    <div className="footer__about_social">
                        <ul className="icons" role='list'>
                            <li>
                                <span className='icon'>
                                    <a href="#"><i className="fa-brands fa-facebook"></i></a>
                                </span>
                            </li>

                            <li>
                                <span className='icon'>
                                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                </span></li>
                            <li>
                                <span className='icon'>
                                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                                </span>
                            </li>

                            <li>
                                <span className='icon'>
                                    <a href="https://www.linkedin.com/in/toni-petrov-73b346223/"><i className="fa-brands fa-linkedin-in"></i></a>
                                </span>
                            </li>

                            <li>
                                <span className='icon'>
                                    <a href="#"><i className="fa-brands fa-google-plus-g"></i></a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="in-touch footer_botom__section">
                    <h3>Get in touch</h3>

                    <div className="contact-info">
                        <h4>Location : </h4>
                        <p>Sofia, Bulgaria pl Vitosha</p>

                        <h4>Contact : </h4>
                        <p>Phone : +359 899 932189</p>

                        <p>Email :
                            <a href="mailto:tonipetrov121@gmail.com"> tonipetrov121@gmail.com</a>
                        </p>
                    </div>
                </div>

                <div className="links footer_botom__section">
                    <h3>Quick Links</h3>

                    <ul role="list">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/about">About</a>
                        </li>
                        <li>
                            <a href="/shop">Shop</a>
                        </li>
                        <li>
                            <a href="/contacts">Contact Us</a>
                        </li>
                    </ul>
                </div>

                <div className="offers footer_botom__section">
                    <h3>Sign up for your offers</h3>

                    <p>
                        By subscribing to our mailing list you will
                        always get latest news and updates from us.
                    </p>

                    <form className='email_subscription' action="" method='post'>

                        <input type="email" placeholder='Enter your email...' />
                        <button type='button' className="btn-icon">
                            <i className="fa-solid fa-envelope"></i>
                        </button>
                    </form>
                </div>

            </div>

            <div className="footer-copyright">
                <p>
                    &copy; 2023 Goggles. All Rights Reserved
                </p>
            </div>

        </footer>
    );
}

