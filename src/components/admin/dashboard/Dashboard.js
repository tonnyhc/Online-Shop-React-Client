import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchDashboard } from '../../../services/adminServices';

import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({});
    const [activePopUp, setActivePopUp] = useState(null);

    useEffect(() => {
        (async () => {

            try {
                const data = await fetchDashboard();
                setDashboardData(data);
            } catch (e) {
                alert(e);
            }
        })();
    }, []);

    const handlePopUp = (e, orderId) => {
        setActivePopUp(activePopUp === orderId ? null : orderId);

    }

    return (
        <div className={styles.dashboard}>
            <h2>Dashboard</h2>

            <div className={styles.statistics}>
                <article className={styles.statisticCard}>

                    <div className={`${styles.icon} ${styles.salesIcon}`}>
                        <i className="fa-solid fa-dollar-sign"></i>
                    </div>

                    <div className={styles.cardInfo}>
                        <span>Total Sales</span>
                        <p>$ {dashboardData.total_sales?.toFixed(2)}</p>
                    </div>
                </article>

                <article className={styles.statisticCard}>

                    <div className={`${styles.icon} ${styles.ordersIcon}`}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>

                    <div className={styles.cardInfo}>
                        <span>Total Orders</span>
                        <p>{dashboardData.total_orders}</p>
                    </div>
                </article>

                <article className={styles.statisticCard}>

                    <div className={`${styles.icon} ${styles.productsIcon}`}>
                        <i className="fa-solid fa-basket-shopping"></i>
                    </div>

                    <div className={styles.cardInfo}>
                        <span>Total Products</span>
                        <p>{dashboardData.total_products}</p>
                    </div>
                </article>
            </div>

            <div className={styles.latestOrders}>
                <h2>Latest orders</h2>
                <ul className={styles.ordersList} role='list'>
                    {dashboardData.orders?.map(order => {
                        return (
                            <li key={order.id} className="orderItem">
                                <div className={styles.orderTitle}>
                                    <p>{order.id}</p>
                                    <p className={styles.orderOwner}>{order.full_name}</p>
                                </div>
                                <div className={styles.orderInfo}>
                                    <p>{order.user_email}</p>
                                    <p>${order.total_price?.toFixed(2)}</p>
                                    <p className={`${styles.orderStatus} ${styles[order.order_status]} `}>{order.order_status}</p>
                                    <p>{order.date_of_order}</p>
                                    <div className={styles.orderBtnWrapper}>
                                        <button onClick={(e) => handlePopUp(e, order.id)}><i className="fa-solid fa-ellipsis"></i></button>
                                        {activePopUp === order.id &&
                                            <div data-popUp className={styles.orderDetailsPopUp}>
                                                <p><Link to={`/admin/order/${order.id}`}>Details</Link></p>
                                                <p>Cancel order</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </li>
                        );
                    })}



                </ul>
            </div>
        </div>
    );
}

export default Dashboard;