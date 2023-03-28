import { Link } from 'react-router-dom';

import styles from './ProductCard.module.css'

const ProductCard = ({
    brand,
    model,
    product_price,
    discounted_price,
    slug,
    images,
}) => {
    return (
        <article className={styles.productCard}>
            <div className={styles.imgWrapper}>
                <img src={images[0].image_url} alt="Product picture" />
            </div>
            <div className={styles.productInfo}>
                <p className={styles.productTitle}>{brand} {model}</p>
                <p className={styles.productPrice}>$ {product_price.toFixed(2)}</p>
                <div className={styles.cardBtns}>
                    <Link className={styles.editBtn} to={`/admin/product/${slug}/edit`}>
                        <i class="fa-solid fa-pencil"></i>
                        Edit
                    </Link>
                    <button className={styles.deleteBtn}>
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard