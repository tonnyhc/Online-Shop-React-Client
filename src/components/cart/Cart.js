import { BannerSmall } from "../banner/BannerSmall";


import styles from './Cart.module.css';

export const Cart = () => {
    return (
        <>
            <BannerSmall currPage={'Checkout'} />

            <section className={styles.cartSection}>
                <h3 className={styles.title}>Cart</h3>

                <h4 className={styles.itemsCount}>Your shopping cart contains: <span>3 Products</span></h4>

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
                            {/* <th><a href="#"><i class="fa-solid fa-xmark"></i></a></th> */}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>1</td>

                            <td>
                                <div className={styles.productImage}>
                                    <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                </div>
                            </td>

                            <td>
                                <div className={styles.quantityWrapper}>
                                    <div >
                                        <button className={styles.quantityChanger}>
                                            <i class="fa-sharp fa-solid fa-minus"></i>
                                        </button>
                                    </div>
                                    <div className={styles.quantity}><span>3</span></div>
                                    <div >
                                        <button className={styles.quantityChanger}>
                                            <i class="fa-sharp fa-regular fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>

                            <td className={styles.tdGray}>
                                <span>RayBan Sunglasses</span>
                            </td>

                            <td className={styles.tdGray}>
                                <span>$ 105</span>
                            </td>

                            <td className={styles.tdGray}>
                                <span>$ 415</span>
                            </td>

                            <td>
                                <a href="#">
                                    <i class="fa-solid fa-xmark"></i>
                                </a>
                            </td>

                        </tr>
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

                    <form method='post' class={styles.checkoutForm}>

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