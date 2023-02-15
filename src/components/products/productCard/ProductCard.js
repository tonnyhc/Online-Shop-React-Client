import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';


export const ProductCard = ({
    product_price,
    title,
    slug
}) => {
    return (
        <article className={styles.product_card}>
            <div className={styles['quick-view']}>
                <p>
                    <Link to={`/products/${slug}`}>Quick View</Link>
                </p>
            </div>
            <div className={styles.image_wrapper}>
                <img
                    className={styles.product_img}
                    src="http://atlas-content-cdn.pixelsquid.com/stock-images/gold-sunglasses-z0nOn23-600.jpg"
                    alt=""
                />
            </div>
            <div className={styles.product_info}>
                <h3 className={styles.product__title}>
                    <Link to={`/products/${slug}`}>{title}</Link>
                </h3>
                <p className={styles.product__price}>$ {product_price}</p>
                <ul className={styles.product_rating_stars} role="list">
                    <li>
                        <a className={styles.star} href="#">
                            <i className="fa-regular fa-star" />
                        </a>
                    </li>
                    <li>
                        <a className={styles.star} href="#">
                            <i className="fa-regular fa-star" />
                        </a>
                    </li>
                    <li>
                        <a className={styles.star} href="#">
                            <i className="fa-regular fa-star" />
                        </a>
                    </li>
                    <li>
                        <a className={styles.star} href="#">
                            <i className="fa-regular fa-star" />
                        </a>
                    </li>
                    <li>
                        <a className={styles.star} href="#">
                            <i className="fa-regular fa-star" />
                        </a>
                    </li>
                </ul>
            </div>
            <div className={styles.add_to_cart}>
                <a href="#">
                    <i className="fa-solid fa-cart-shopping" />
                </a>
            </div>
        </article>
    );
}