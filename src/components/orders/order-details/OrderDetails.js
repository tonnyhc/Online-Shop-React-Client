import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../../services/orderServices';
import { BannerSmall } from '../../banner/BannerSmall';
import ItemCard from './ItemCard';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
    const [order, setOrder] = useState([]);
    const { orderId } = useParams();

    useEffect(() => {
        async function fetchOrderDetails(orderId) {

            try {
                const data = await getOrderDetails(orderId);
                return setOrder(data);
            } catch (e) {
                alert(e);
            }
        };

        fetchOrderDetails(orderId);

    }, []);


    return (
        <>
            <BannerSmall currPage={`Order ${order.id}`} />

            <section className={styles.orderDetailsSection}>

                <h2 className={styles.bigHeading}>Order № {order.id}</h2>
                <div className={styles.detailsWhiteBox}>

                    <div className={styles.topInfoWrapper}>

                        <div className='row'>

                            <span className={styles.simple_label}>
                                Registered on:
                            </span>
                            <strong className={styles.simple_info}>
                                {order.date_of_order}
                            </strong>
                        </div>

                        <div className='row'>

                            <span className={styles.simple_label}>
                                Total:
                            </span>
                            <strong className={styles.simple_info}>
                                {order.total_price && order.total_price.toFixed(2)} $
                            </strong>
                        </div>

                    </div>

                    <div className={styles.asideActionBtns}>
                        <button className={styles.orderActions}>
                            <i className="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>

                </div>

                <h3>Order details</h3>

                <div className={`${styles.detailsWhiteBox} ${styles.orderItemsDetails}`}>

                    <div className={styles.shippingStatus}>
                        <div className={styles.iconWrapper}>
                            <i className="fa-solid fa-cart-flatbed"></i>
                        </div>

                        <div className={styles.orderStatus}>
                            <p className={styles.statusP}>{order.order_status}</p>
                            {/* TODO: Check this later */}
                            {order.shipping_date && order.order_status == 'Shipped' &&
                                <p className={styles.statusDate}>Shipping date : <strong>28 март 2022</strong></p>
                            }
                        </div>
                    </div>

                    <div className={styles.infoCardsSection}>

                        <div className={styles.infoCard}>
                            <p className={styles.deliveryTitle}>Delivery : </p>
                            <p>Delivery with courier</p>

                            <p className={styles.deliverySubtitle}>For :</p>
                            <p>{order.full_name}, {order.phone_number}</p>

                            <p className={styles.deliverySubtitle}>Address:</p>
                            <p>{order.address}, {order.town} ({order.post_code})</p>
                        </div>

                    </div>

                    <div className={styles.orderItems}>

                        <ul className={styles.orderItemsList} role='list'>
                            {order.items && order.items.map(item => {
                                return <ItemCard key={item.product.slug} {...item}/>
                            })}
                        </ul>


                    </div>

                    <div className={styles.orderItemsSummary}>
                        <div className={styles.orderItemsSummaryWrapper}>
                            <div className={styles.orderItemsProductPrice}>
                                <span className={styles.priceType}>All products : </span>
                                <span className={styles.right}>{order.total_price && order.total_price.toFixed(2)} $</span>
                            </div>
                            {/* TODO: Fix this when have vouchers */}
                            <div className={styles.orderItemsProductPrice}>
                                <span className={styles.priceType}>Vaucher discount : </span>
                                <span className={styles.priceRight}>16.99 $</span>
                            </div>

                            <div className={styles.orderItemsTotalPrice}>
                                <span className={styles.priceType}>Total price to pay :</span>
                                <span className={styles.priceRight}>16.99 $</span>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}


export default OrderDetails;
