import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { changeOrderStatus, getOrderDetails } from '../../../../services/adminServices';

import styles from './OrderDetails.module.css';

const OrderDetails = () => {
    const [order, setOrder] = useState({});
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const data = await getOrderDetails(id);
                setOrder(data);

            } catch (e) {
                alert(e);
            }
        })();
    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();
        const status = Object.fromEntries(new FormData(e.target));
        if (status.status == ''){
            return;
        }
        try{
            const data = await changeOrderStatus(id, status);
            setOrder(oldOrder => ({
                ...oldOrder,
                order_status: status.status
            }));

        } catch(e){
            alert(e);
        }
    }

    return (
        <>
            <h1>Order details</h1>

            <section className={styles.detailsSection}>
                <div className={styles.orderHeader}>

                    <div className={styles.dateWrapper}>
                        <span>
                            <i class="fa-regular fa-calendar"></i>
                        </span>
                        <div>
                            <p className={styles.orderDate}>{order.date_of_order}</p>
                            <p className={styles.orderId}>#ID {order.id}</p>
                        </div>
                    </div>

                    <div className={styles.orderActions}>
                        <form onSubmit={onSubmit} action="">
                            <select name="status" id="status">
                                <option value="">Change status</option>
                                <option value="InPreparation">In preparation</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Declined">Declined</option>
                            </select>

                            <button>Save</button>
                        </form>
                    </div>
                </div>

                <div className={styles.orderBody}>
                    <div className={styles.customerInfo}>

                        <article className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <div className={styles.cardInfo}>
                                <p className={styles.title}>Customer</p>
                                <p>
                                    <span className={styles.lightSpan}>Name : </span>
                                    <span>{order.full_name}</span>
                                </p>
                                <p>
                                    <span className={styles.lightSpan}>Email : </span>
                                    <span>{order.email}</span>
                                </p>
                                <p>
                                    <span className={styles.lightSpan}>Phone : </span>
                                    <span>{order.phone_number}</span>
                                </p>
                            </div>
                        </article>

                        <article className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <i class="fa-solid fa-truck"></i>
                            </div>
                            <div className={styles.cardInfo}>
                                <p className={styles.title}>Shipping</p>
                                <p>
                                    <span className={styles.lightSpan}>Shipping : </span>
                                    <span>Courier</span>
                                </p>
                                <p>
                                    <span className={styles.lightSpan}>Payment : </span>
                                    <span>Pay on Delivery</span>
                                </p>
                                <p>
                                    <span className={styles.lightSpan}>Status : </span>
                                    <span>{order.order_status} </span>
                                </p>
                            </div>
                        </article>


                        <article className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <i class="fa-sharp fa-solid fa-location-dot"></i>
                            </div>
                            <div className={styles.cardInfo}>
                                <p className={styles.title}>Addres</p>
                                <p>
                                    <span className={styles.lightSpan}>City : </span>
                                    <span>{order.town}</span>
                                </p>
                                <p>
                                    <span className={styles.lightSpan}>Post Code : </span>
                                    <span>{order.post_code}</span>
                                </p>
                                <p>
                                    <span className={styles.lightSpan}>Addres : </span>
                                    <span>{order.address}</span>
                                </p>
                            </div>
                        </article>

                    </div>

                    <div className={styles.productsTable}>
                        <div className={styles.tableHeader}>
                            <div className={styles.headerWrapper}>

                                <p className={styles.product}>
                                    Product
                                </p>
                                <p className={styles.quantity}>
                                    Quantity
                                </p>
                                <p className={styles.unitPrice}>
                                    Unit Price
                                </p>
                            </div>

                            <p className={styles.total}>
                                Total

                            </p>
                        </div>

                        <ul role='list' className={styles.productsList}>

                            {order.items?.map(item =>
                                <li key={item.product.id} className={styles.productItem}>

                                    <div className={styles.headerWrapper}>

                                        <div className={`${styles.productTitle} ${styles.product}`}>
                                            <div className={styles.itemImg}>
                                                <img src={item.product.image.image_url} alt="Product img" />
                                            </div>
                                            <Link to={`/products/${item.product.slug}`}>Sunglasses ray-ban</Link>
                                        </div>

                                        <div className={styles.quantity}>
                                            <p>{item.quantity}</p>
                                        </div>
                                        <div className={styles.unitPrice}>
                                            $ {item.product.discounted_price ?
                                                item.product.discounted_price?.toFixed(2)
                                                :
                                                item.product.product_price?.toFixed(2)
                                            }
                                        </div>
                                    </div>
                                    <div className={styles.total}>
                                        $ {(
                                            (item.product.discounted_price ?
                                                item.product.discounted_price
                                                :
                                                item.product.product_price) * item.quantity)?.toFixed(2)}
                                    </div>

                                </li>
                            )}


                        </ul>

                        <div className={styles.orderTotal}>
                            <p>
                                <span className={styles.lightSpan}>Subtotal : </span>
                                <span className={styles.subtotalSpan}>$ {order.total_price?.toFixed(2)}</span>
                            </p>
                            {order.disco}
                            <p>
                                <span className={styles.lightSpan}>Discount code : </span>
                                <span className={styles.subtotalSpan}>{order.discount?.code || '-----'}</span>
                            </p>
                            <p>
                                <span className={styles.lightSpan}>Discount : </span>
                                {
                                    order.discount?.code ?
                                        <span className={styles.subtotalSpan}>
                                            {order.discount?.discount}%
                                            ($ {order.total_price - (order.total_price * order.discount?.discount / 100)})
                                        </span>
                                        :
                                        <span className={styles.subtotalSpan}>-----</span>
                                }
                            </p>
                            <p>
                                <span className={styles.lightSpan}>Total : </span>
                                <span className={styles.subtotalSpan}>
                                    $ {order.discounted_price?.toFixed(2) || order.total_price?.toFixed(2)}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};


export default OrderDetails;