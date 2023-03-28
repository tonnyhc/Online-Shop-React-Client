import { useContext, useState } from "react";
import { applyDiscountRequest, removeDiscountRequest, createOrder } from "../../services/basketService";

import { AuthDataContext } from '../../contexts/AuthContext';
import { BasketContext } from "../../contexts/BasketContext";

import { BannerSmall } from "../banner/BannerSmall";


import styles from './Cart.module.css';
import { CartProduct } from "./CartProduct";
import { Link } from "react-router-dom";


export const Cart = () => {
    const { userData, csrfToken } = useContext(AuthDataContext);

    const {
        basket,
        basketTotal,
        clearUserBasket,
        applyDiscount,
        removeDiscount,
        updateItemQuantity
    } = useContext(BasketContext);

    const [orderFormErrors, setOrderFormErrors] = useState({
        global: "",
        fullName: "",
        phoneNumber: "",
        town: "",
        address: "",
        postCode: "",
    })

    const [discountCodeErrors, setDiscountCodeErrors] = useState({
        message: ""
    })

    // TODO: Create validations and UX
    const [formData, setFormData] = useState({
        'fullName': '',
        'phoneNumber': '',
        'town': '',
        'address': '',
        'postCode': ''
    })

    const setBasketItemsOnQuantityChange = (changedItemSlug, value, discunted_price = null) => {
        updateItemQuantity(changedItemSlug, value, discunted_price);
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
            'items': basket.basketitem_set.map(item => {
                return {
                    'slug': item.slug,
                    'quantity': item.quantity
                };
            })
        }

        if (!fullName || !phoneNumber || !town || !address || !postCode) {
            return setOrderFormErrors(oldErrors => {
                return {
                    ...oldErrors,
                    global: "All fields are required!"
                }
            });
        }
        setOrderFormErrors({
            global: "",
            fullName: "",
            phoneNumber: "",
            town: "",
            address: "",
            postCode: "",
        })

        try {
            const data = await createOrder(body, csrfToken);
            clearUserBasket();
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
            const data = await applyDiscountRequest(body);
            applyDiscount(data);
            setDiscountCodeErrors({
                message: ""
            })
            return data;
        } catch (e) {
            setDiscountCodeErrors({
                message: e.message
            })
        }
    }

    const onSubmitRemoveDiscount = async (e) => {
        try {
            const data = await removeDiscountRequest();
            removeDiscount();
            return data;
        } catch (e) {
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

    const inputValidations = (e) => {
        const field = e.target;
        const fieldName = field.name;
        const fieldValue = field.value
        if (!fieldValue || fieldValue == "") {
            return setOrderFormErrors(oldErrors => ({
                ...oldErrors,
                [fieldName]: "This field is required"
            })
            );
        };

        if (fieldName == 'fullName') {
            if (fieldValue.length < 3) {
                return setOrderFormErrors(oldErrors => ({
                    ...oldErrors,
                    fullName: "Full name must be more than 3 characters long!"
                }));
            };
            if (fieldValue.length > 50) {
                return setOrderFormErrors(oldErrors => ({
                    ...oldErrors,
                    fullName: "Full name must be no more than 50 characters long!"
                }));
            };
            const regex = new RegExp('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$');
            if (!regex.test(fieldValue)) {
                return setOrderFormErrors((oldErrors) => ({
                    ...oldErrors,
                    [fieldName]: "Full name can only contain letters and spaces",
                }));
            }

            return setOrderFormErrors(oldErrors => ({
                ...oldErrors,
                fullName: ""
            }))
        }
        if (fieldName == 'phoneNumber') {
            if (fieldValue.length > 10 || fieldValue.length < 10) {
                setOrderFormErrors(oldErrors => ({
                    ...oldErrors,
                    phoneNumber: "Phone number must be exactly 10 characters"
                }))
            }

            const regex = new RegExp("08[789]\\d{7}");
            if (!regex.test(fieldValue)) {
                return setOrderFormErrors(oldErrors => ({
                    ...oldErrors,
                    phoneNumber: "Please enter a valid phone number"
                }))
            }
            return setOrderFormErrors(oldErrors => ({
                ...oldErrors,
                phoneNumber: ""
            }))
        }
        if (fieldName == 'postCode') {
            if (fieldValue.length < 4 || fieldValue.length > 4) {
                return setOrderFormErrors(oldErrors => ({
                    ...oldErrors,
                    postCode: "Post code must be exactly 4 characters"
                }));
            };
            const regex = new RegExp('^\\d{4}$');
            if (!regex.test(fieldValue)) {
                return setOrderFormErrors(oldErrors => ({
                    ...oldErrors,
                    postCode: "Please enter valid post code"
                }));
            }
            return setOrderFormErrors(oldErrors => ({
                ...oldErrors,
                postCode: ""
            }));
        }

    }




    return (
        <>
            <BannerSmall currPage={'Checkout'} />

            <section className={styles.cartSection}>
                <h3 className={styles.title}>Cart</h3>

                <h4 className={styles.itemsCount}>Your shopping cart contains: <span>{basket.basketitem_set?.length} Products</span></h4>

                {
                    basket.basketitem_set?.length > 0 ?

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
                                {basket.basketitem_set.map((item, index) => <CartProduct
                                    key={item.id}
                                    props={{ item, index, setBasketItemsOnQuantityChange }}
                                />)}
                            </tbody>
                        </table>

                        :
                        <h4>You don't have products in the basket yet! <Link to='/products'>Why not add some</Link></h4>
                }

            </section>

            {
                basket.basketitem_set?.length > 0 ?

                    <section className={styles.checkoutSection}>

                        <div className={styles.cartInfoWrapper}>
                            <h4>SUMMARY</h4>
                            <ul className={styles.productsList} role='list'>
                                {basket.basketitem_set.map(item =>
                                    <li key={item.id} className={styles.product}>{item.product} -
                                        <span>
                                            $ {((item.discounted_price ? item.discounted_price : item.product_price) * item.quantity).toFixed(2)}
                                        </span>
                                    </li>)
                                }
                                <li key='totalBasketCost' className={`${styles.product} ${styles.total}`}>
                                    <div className={styles.basketTotal}>
                                        <p>Products total - <span>$ {basketTotal.toFixed(2)}</span></p>
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
                                    <>
                                        {discountCodeErrors.message && <p className={styles.orderFormError}>{discountCodeErrors.message}</p>}
                                        <form onSubmit={onSubmitDiscount}>
                                            <input type="text" name='code' placeholder="Coupon code..." />
                                            <button><i className="fa-solid fa-chevron-right"></i></button>
                                        </form>
                                    </>

                                }
                            </div>
                        </div>

                        <div className={styles.checkoutWrapper}>
                            <h4>Order details</h4>
                            {orderFormErrors.global && <p className={styles.orderFormError}>{orderFormErrors.global}</p>}
                            <form method='post' onSubmit={onSubmitOrder} className={styles.checkoutForm}>

                                <div>
                                    {orderFormErrors.fullName && <p className={styles.orderFormError}>{orderFormErrors.fullName}</p>}
                                    <label htmlFor="fullName">Full name :</label>
                                    <input type="text" name="fullName" id="fullName"
                                        className={orderFormErrors.fullName && `${styles.orderFormInputError}`}
                                        maxLength={50}
                                        onChange={formChangeHandler}
                                        value={formData['full_name']}
                                        onBlur={inputValidations}
                                        placeholder="Full name"
                                    />
                                </div>


                                <div>
                                    {orderFormErrors.phoneNumber && <p className={styles.orderFormError}>{orderFormErrors.phoneNumber}</p>}
                                    <label htmlFor="phoneNumber">Phone number :</label>
                                    <input type="text" name="phoneNumber" id="phoneNumber"
                                        className={orderFormErrors.phoneNumber && `${styles.orderFormInputError}`}
                                        onChange={formChangeHandler}
                                        value={formData['phone_number']}
                                        onBlur={inputValidations}
                                        placeholder="Phone number"
                                    />
                                </div>

                                <div>
                                    {orderFormErrors.town && <p className={styles.orderFormError}>{orderFormErrors.town}</p>}

                                    <label htmlFor="town">Town/City :</label>
                                    <input type="text" name="town" id="town"
                                        className={orderFormErrors.town && `${styles.orderFormInputError}`}
                                        onChange={formChangeHandler}
                                        value={formData['town']}
                                        onBlur={inputValidations}
                                        placeholder="Town/City"
                                    />
                                </div>

                                <div>
                                    {orderFormErrors.address && <p className={styles.orderFormError}>{orderFormErrors.address}</p>}

                                    <label htmlFor="address">Address :</label>
                                    <input type="text" name="address" id="address"
                                        className={orderFormErrors.address && `${styles.orderFormInputError}`}
                                        onChange={formChangeHandler}
                                        value={formData['address']}
                                        onBlur={inputValidations}
                                        placeholder="Address"
                                    />
                                </div>

                                <div>
                                    {orderFormErrors.postCode && <p className={styles.orderFormError}>{orderFormErrors.postCode}</p>}

                                    <label htmlFor="postCode">Post code :</label>
                                    <input type="text" name="postCode" id="postCode"
                                        className={orderFormErrors.postCode && `${styles.orderFormInputError}`}
                                        onChange={formChangeHandler}
                                        value={formData['post_code']}
                                        onBlur={inputValidations}
                                        placeholder="Zip/Postal Code"
                                    />
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