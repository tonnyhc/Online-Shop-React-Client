
import { Link } from 'react-router-dom';
import styles from './OrderCard.module.css';

const OrderCard = ({
    id,
    date_of_order,
    total_price
}) => {
    return (
        <article className={styles.card}>

            <div className={styles.cardHeader}>
                <div>
                    <p className={styles.orderNumber}>Order <i>№</i> <span>{id}</span></p>
                    <p className={styles.orderDetails}>Registered on:
                        <span className={styles.orderDate}> {date_of_order}</span>
                        <span> | </span>
                        <span className={styles.orderPrice}>
                            Total: {total_price ? total_price.toFixed(2) : total_price} $
                        </span>
                    </p>
                </div>
                <div className={styles.orderDetailsLink}>
                    <Link to={`order/${id}`}>Order details</Link>
                </div>
            </div>
        </article>
    );
}


export default OrderCard;