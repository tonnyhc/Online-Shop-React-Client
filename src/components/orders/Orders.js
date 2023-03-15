
import { useEffect, useState } from 'react';

import { getOrders } from '../../services/orderServices';

import OrderCard from './order-card/OrderCard';
import { BannerSmall } from "../banner/BannerSmall"

import styles from './Orders.module.css';


const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const orders = await getOrders();
                setOrders(orders)
            } catch (e) {
                alert(e);
            }
        }

        fetchOrders();

    }, [])

    const removeOrder = (id) => {
        setOrders(oldOrders => {
            return oldOrders.filter(order => id != order.id)
        })
    }


    return (
        <>
            <BannerSmall currPage="Orders" />

            <section className={styles.ordersSection}>
                <h3>My orders</h3>

                <div className={styles.ordersList}>
                    {orders.length >0 ? (
                        orders.map(order => <OrderCard removeOrder={removeOrder} {...order} key={order.id} />)
                    ) : (
                        <h3>You don't have any orders yet.</h3>
                    )}
                </div>
            </section>
        </>
    );
}

export default Orders