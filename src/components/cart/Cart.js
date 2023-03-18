import { useContext, useEffect, useReducer, useState } from "react";
import { applyDiscount, createOrder, getBasket, removeDiscount } from "../../services/basketService";

import { AuthDataContext } from '../../contexts/AuthContext';
import { BasketContext } from "../../contexts/BasketContext";

import { BannerSmall } from "../banner/BannerSmall";


import styles from './Cart.module.css';
import { CartProduct } from "./CartProduct";
import { Link } from "react-router-dom";
import cartReducer from "./utils/cartReducer";


export const Cart = () => {
    const { userData, csrfToken } = useContext(AuthDataContext);
    const { clearUserBasket } = useContext(BasketContext);

    const [basket, basketDispatch] = useReducer(cartReducer, []);
    const [basketItems, setBasketItems] = useState([]);

    // TODO: Create validations and UX
    const [formData, setFormData] = useState({
        'fullName': '',
        'phoneNumber': '',
        'town': '',
        'address': '',
        'postCode': ''
    })

    useEffect(() => {
        (async () => {
            try {
                const username = userData.username;
                const data = await getBasket(username);
                setBasketItems(data.basketitem_set);
                return basketDispatch({
                    type: 'FETCH_BASKET',
                    payload: data
                })
            } catch (e) {
                alert(e);
            }
        })()
    }, []);

    let totalBasketCost = 0;
    for (const item of basketItems) {
        if (item.discounted_price) {
            totalBasketCost += item.discounted_price * item.quantity;
        } else {
            totalBasketCost += item.product_price * item.quantity;
        }
    }




    const setBasketItemsOnQuantityChange = (changedItemSlug, value) => {
        setBasketItems(oldState => {
            return oldState.map(item => {
                if (item.slug == changedItemSlug) {
                    if (value === '+') {
                        return { ...item, quantity: item.quantity + 1 };
                    } else if (value === '-' && item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                }
                return item;
            });
        });
    }


    const onSubmitOrder = async (e) => {
        e.preventDefault();

        const { fullName, phoneNumber, town, address, postCode } = { ...formData };

        const body = {
            'full_name': fullName,
            'phone_number': phoneNumber,
            town,
            address,
            'post_code': postCode,
            'items': basketItems.map(item => {
                return {
                    'slug': item.slug,
                    'quantity': item.quantity
                };
            })
        }
        try {
            const data = await createOrder(body, csrfToken);
            clearUserBasket();
            basketDispatch({
                type: "ON_ORDER",
                payload: []
            });
            setBasketItems([]);
            return data;
        } catch (e) {
            alert(e);
        }
    }

    const onSubmitDiscount = async (e) => {
        e.preventDefault();
        const { code } = Object.fromEntries(new FormData(e.target));
        const body = {
            code
        }
        try {
            const data = await applyDiscount(body);
            basketDispatch({
                type: "ON_DISCOUNT",
                payload: data
            })
        } catch (e) {
            alert(e);
        }
    }

    const onSubmitRemoveDiscount = async (e) => {
        try {
            const data = await removeDiscount();
            basketDispatch({
                type: "ON_REMOVE_DISCOUNT",
            })
        } catch(e){
            alert(e);
        }
    }

    const formChangeHandler = (e) => {
        const value = e.target.value;
        const fieldName = e.target.name;
        setFormData(oldData => {
            return {
                ...oldData,
                [fieldName]: value
            }
        })
    }




    return (
        <>
            <BannerSmall currPage={'Checkout'} />

            <section className={styles.cartSection}>
                <h3 className={styles.title}>Cart</h3>

                <h4 className={styles.itemsCount}>Your shopping cart contains: <span>{basketItems.length} Products</span></h4>

                {
                    basketItems.length > 0 ?

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
                                {basketItems.map((item, index) => <CartProduct key={item.id} props={{ item, index, setBasketItems, setBasketItemsOnQuantityChange }} />)}
                            </tbody>
                        </table>

                        :
                        <h4>You don't have products in the basket yet! <Link to='/products'>Why not add some</Link></h4>
                }

            </section>

            {
                basketItems.length > 0 ?

                    <section className={styles.checkoutSection}>

                        <div className={styles.cartInfoWrapper}>
                            <h4>SUMMARY</h4>
                            <ul className={styles.productsList} role='list'>
                                {basketItems.map(item =>
                                    <li key={item.id} className={styles.product}>{item.product} -
                                        <span>
                                            $ {((item.discounted_price ? item.discounted_price : item.product_price) * item.quantity).toFixed(2)}
                                        </span>
                                    </li>)
                                }
                                <li key='totalBasketCost' className={`${styles.product} ${styles.total}`}>
                                    <div className={styles.basketTotal}>
                                        <p>Products total - <span>$ {totalBasketCost.toFixed(2)}</span></p>
                                        {basket.discounted_price &&
                                            <>
                                                <p key='basketDiscountCode'>Discount {basket.discount.code} - <span> - {basket.discount.discount} %</span></p>
                                                <p key='basketDiscount'>
                                                    Total - <span>$ {basket.discounted_price.toFixed(2)}</span>
                                                </p>
                                            </>
                                        }
                                    </div>
                                </li>

                            </ul>

                            <div className={styles.discountCode}>
                                <p>You have a discount code or voucher ?</p>
                                {basket.discounted_price ?
                                    <div className={styles.discountCodeCard}>
                                        <span>{basket.discount.code}</span>
                                        <button onClick={onSubmitRemoveDiscount}>X</button>
                                    </div>
                                    :
                                    <form onSubmit={onSubmitDiscount}>
                                        <input type="text" name='code' placeholder="Coupon code..." />
                                        <button><i className="fa-solid fa-chevron-right"></i></button>
                                    </form>
                                }
                            </div>
                        </div>

                        <div className={styles.checkoutWrapper}>
                            <h4>Order details</h4>

                            <form method='post' onSubmit={onSubmitOrder} className={styles.checkoutForm}>

                                <div>
                                    <label htmlFor="fullName">Full name :</label>
                                    <input type="text" name="fullName" id="fullName" onChange={formChangeHandler} value={formData['full_name']} placeholder="Full name" />
                                </div>


                                <div>
                                    <label htmlFor="phoneNumber">Phone number :</label>
                                    <input type="text" name="phoneNumber" id="phoneNumber" onChange={formChangeHandler} value={formData['phone_number']} placeholder="Phone number" />
                                </div>

                                <div>
                                    <label htmlFor="town">Town/City :</label>
                                    <input type="text" name="town" id="town" onChange={formChangeHandler} value={formData['town']} placeholder="Town/City" />
                                </div>

                                <div>
                                    <label htmlFor="address">Address :</label>
                                    <input type="text" name="address" id="address" onChange={formChangeHandler} value={formData['address']} placeholder="Address" />
                                </div>

                                <div>
                                    <label htmlFor="postCode">Post code :</label>
                                    <input type="text" name="postCode" id="postCode" onChange={formChangeHandler} value={formData['post_code']} placeholder="Zip/Postal Code" />
                                </div>

                                <button className={`${styles.checkoutBtn}`}>DELIVERY TO THIS ADDRESS</button>

                            </form>
                        </div>

                    </section>

                    :
                    ""
            }

        </>
    );
}