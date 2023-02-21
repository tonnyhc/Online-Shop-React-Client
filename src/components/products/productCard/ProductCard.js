import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { style } from '@mui/system';
import { getRatingStars } from '../helperFuncs/getRatingStars';


export const ProductCard = ({
    product_price,
    discounted_price,
    brand,
    model,
    slug,
    average_rating,
    image,
}) => {
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
                <p className={styles.product__price}>{discounted_price? 
                                            <>
                                                <span>${discounted_price}</span> <del>${product_price}</del>
                                            </>
                                            :
                                            <span>${product_price}</span> 
                                            }
                </p>
                {getRatingStars(average_rating)}
            </div>
            <div className={styles.add_to_cart}>
                <a href="#">
                    <i className="fa-solid fa-cart-shopping" />
                </a>
            </div>
        </article>
    );
}
