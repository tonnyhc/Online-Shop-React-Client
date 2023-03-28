import { Link } from 'react-router-dom';

import styles from '../order-details/OrderDetails.module.css';

const ItemCard = ({
    product,
    quantity

}) => {
    return (
        <li className={styles.itemCard}>
            <div className={styles.itemDetails}>
                <div className={styles.imgWrapper}>
                    <Link to={`/products/${product.slug}`}>
                        <img src={product.image.image_url} alt="Product Image" />
                    </Link>
                </div>
                <span>{product.brand} {product.model}</span>
            </div>

            <div className={styles.itemPrice}>
                <p className={styles.itemTotal}>
                    {
                        product.discounted_price ? product.discounted_price.toFixed(2)
                            :
                            product.product_price ? product.product_price.toFixed(2) : product.product_price
                    }
                    $
                </p>
                <p className={styles.quantity}>{quantity} {quantity > 1 ? 'pieces' : 'piece'}</p>
            </div>
        </li>
    );
}

export default ItemCard;