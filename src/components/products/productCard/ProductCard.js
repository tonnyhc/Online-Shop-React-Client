import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { addToCart } from '../addToCart';

import { AuthDataContext } from '../../../contexts/AuthContext';
import { BasketContext } from '../../../contexts/BasketContext';


import { getRatingStars } from '../helperFuncs/getRatingStars';

import styles from './ProductCard.module.css';
import { onRate } from '../helperFuncs/rateProduct';

export const ProductCard = ({
    product_price,
    discounted_price,
    brand,
    model,
    slug,
    average_rating,
    image,
}) => {

    const { csrfToken } = useContext(AuthDataContext);
    const {addItemToBasket} = useContext(BasketContext);


    return (
        <article className={styles.product_card}>
            <div className={styles.image_wrapper}>
                <div className={styles['quick-view']}>
                    <p>
                        <Link to={`/products/${slug}`}>Quick View</Link>
                    </p>
                </div>
                <img
                    className={styles.product_img}
                    src={image}
                    alt="Product Image"
                />
            </div>
            <div className={styles.product_info}>
                <h3 className={styles.product__title}>
                    <Link to={`/products/${slug}`}>{brand}</Link>
                </h3>
                <p className={styles.model}>{model}</p>
                <p className={styles.product__price}>{discounted_price ?
                    <>
                        <span>${discounted_price}</span> <del>${product_price}</del>
                    </>
                    :
                    <span>${product_price}</span>
                }
                </p>
                {getRatingStars(average_rating, onRate, slug)}
            </div>
            <div className={styles.add_to_cart}>
                <form method='post' onSubmit={(e) => {
                    addToCart(e, slug, csrfToken, addItemToBasket)}}>
                    <input type="hidden" name='product' value={slug} />
                    <input type="hidden" name='quantity' value='1' />
                    <button><i className="fa-solid fa-cart-shopping" /></button>
                </form>
            </div>
        </article>
    );
}
