import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { getRatingStars } from '../products/helperFuncs/getRatingStars';
import { addToBasket } from '../../services/basketService';
import { BasketContext } from '../../contexts/BasketContext';

import styles from './FavoriteProducts.module.css';
import { removeFromFavorites } from '../../services/productService';

const FavoriteProductCard = ({
    product,
    removeItemFromFavorites
}) => {

    const {addItemToBasket} = useContext(BasketContext);

    const onSubmit = async (e) => {
        e.preventDefault();
        const {product} = Object.fromEntries(new FormData(e.target));

        const data = await addToBasket(product);
        addItemToBasket(data.item);
        return data;
    };

    const onRemove = async() => {
        const data = await removeFromFavorites(product.slug);
        removeItemFromFavorites(product.slug);
        return data;
    }


    return (
        <li className={styles.productCard}>
                            <div className={styles.productInfo}>
                                <div className={styles.imageWrapper}>
                                    <img src={product.images[0].image_url} alt="" />
                                </div>
                                <div className={styles.productInfoWrapper}>
                                    <p className={styles.productTitle}>
                                        <Link to={`/products/${product.slug}`}>
                                            <span>
                                                {product.brand} {product.model}
                                            </span>
                                        </Link>
                                    </p>
                                    <div className='rating'>
                                        {getRatingStars(product.average_rating, () => {})}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.productAction}>
                                <p className={styles.productPrice}>
                                    <span>{(product.discounted_price ? product.discounted_price : product.product_price).toFixed(2)} $</span>
                                </p>

                                <form action="post" onSubmit={onSubmit}>
                                    <input type="hidden" name='product' value={product.slug} />
                                    <button className={styles.addToCartBtn}>Add to cart</button>
                                </form>

                                <button onClick={onRemove} className={styles.deleteBtn}>
                                    <span><i className="fa-solid fa-trash-can"></i></span>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </li>

    );
}


export default FavoriteProductCard;