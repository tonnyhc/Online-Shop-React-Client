import { useContext, useEffect, useState } from "react";
import { getBasket } from "../../services/basketService";

import { AuthDataContext } from '../../contexts/AuthContext';

import { BannerSmall } from "../banner/BannerSmall";


import styles from './Cart.module.css';
import { CartProduct } from "./CartProduct";

export const Cart = () => {
    const [basket, setBasket] = useState([]);
    const [basketItems, setBasketItems] = useState([]);
    const { userData } = useContext(AuthDataContext);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const username = userData.username;
                const data = await getBasket(username);
                setBasketItems(data.basketitem_set);
                return setBasket(data);
            } catch(e) {
                alert(e);
            }
        }
        fetchBasket();
    }, []);

    return (
        <>
            <BannerSmall currPage={'Checkout'} />

            <section className={styles.cartSection}>
                <h3 className={styles.title}>Cart</h3>

                <h4 className={styles.itemsCount}>Your shopping cart contains: <span>{basketItems.length} Products</span></h4>

                <table className={styles.table}>

                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Product Name</th>
                            <th>Price per one</th>
                            <th>Total Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>

                    <tbody>
                        {basketItems.map((item, index) => <CartProduct key={item.id} props={{item, index, setBasketItems}} />)}  
                         
                    </tbody>

                </table>

            </section>

            <section className={styles.checkoutSection}>

                <div className={styles.cartInfoWrapper}>
                    <h4>CONTINUE TO BASKET</h4>
                    <ul className={styles.productsList} role='list'>
                        <li className={styles.product}>
                            Product1 - <span>$281</span>
                        </li>

                        <li className={styles.product}>
                            Product2 - <span>$510</span>
                        </li>

                        <li className={styles.product}>
                            Product3 - <span>$105</span>
                        </li>

                        <li className={styles.product}>
                            Total - <span>$996</span>
                        </li>
                    </ul>
                </div>

                <div className={styles.checkoutWrapper}>
                    <h4>Order details</h4>

                    <form method='post' className={styles.checkoutForm}>

                        <div>
                            <label htmlFor="fullName">Full name :</label>
                            <input type="text" name="fullName" id="fullName" placeholder="Full name" />
                        </div>


                        <div>
                            <label htmlFor="phoneNumber">Phone number :</label>
                            <input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone number" />
                        </div>

                        <div>
                            <label htmlFor="town">Town/City :</label>
                            <input type="text" name="town" id="town" placeholder="Town/City" />
                        </div>

                        <div>
                            <label htmlFor="address">Address :</label>
                            <input type="text" name="address" id="address" placeholder="Address" />
                        </div>

                        <div>
                            <label htmlFor="zip">Address :</label>
                            <input type="text" name="zip" id="zip" placeholder="Zip/Postal Code" />
                        </div>

                        <button className={`${styles.checkoutBtn}`}>DELIVERY TO THIS ADDRESS</button>

                    </form>
                </div>

            </section>
        </>
    );
}