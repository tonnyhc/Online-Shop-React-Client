

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../../../../services/adminServices';
import styles from './OrdersList.module.css';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [search,setSearch] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchOrders();
                setFilteredOrders(data);
                setOrders(data);
            } catch (e) {
                alert(e);
            }
        })();
    }, []);

    useEffect(() => {
        if (!search) {
            return setFilteredOrders(orders);
        }
        setFilteredOrders(oldOrders => oldOrders.filter(order => order.id.toString().includes(search) || order.full_name.includes(search)));
    }, [search]);


    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleSort = (e) => {
        const sortBy = e.target.value;
        switch (sortBy){
            case 'newest':
                setFilteredOrders(oldOrders => ([...oldOrders].sort((a,b ) => a.id - b.id)));
                break;
            case 'oldest':
                setFilteredOrders(oldOrders => [...oldOrders].sort((a, b) => b.id - a.id));
                break;
            case 'priceAsc':
                setFilteredOrders(oldOrders => [...oldOrders].sort((a, b) => a.total_price - b.total_price));
                break;
            case 'priceDesc':
                setFilteredOrders(oldOrders => [...oldOrders].sort((a, b) => b.total_price - a.total_price));
                break;
        }
    }

    return (
        <>
            <h2>Orders list</h2>
            <section className={styles.ordersSection}>

                <div className={styles.filter}>
                    <input onChange={changeSearch} value={search} type="text" placeholder="Search" />

                    <div className={styles.sortWrapper}>
                        <select onChange={handleSort} name="sort" id="sort">
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="priceAsc">Ascending price</option>
                            <option value="priceDesc">Descending price</option>
                        </select>
                    </div>
                </div>

                <div className={styles.ordersList}>
                    <div className={styles.header}>
                        <p>Order ID</p>
                        <p>Name</p>
                        <p>Price</p>
                        <p>OrderDate</p>
                        <p>Status</p>
                        <p>Details</p>
                    </div>

                    <div className={styles.body}>
                        <ul role='list' className={styles.orders}>
                            {filteredOrders.map(order =>
                                <li key={order.id} className={styles.orderItem}>
                                    <p># {order.id}</p>
                                    <p>{order.full_name}</p>
                                    <p>{order.total_price?.toFixed(2)} $</p>
                                    <p>{order.date_of_order}</p>
                                    <p>{order.order_status}</p>
                                    <p><Link to={`/admin/order/${order.id}`}>View</Link></p>
                                </li>
                            )}
                        </ul>

                    </div>

                </div>

            </section>
        </>
    );
}

export default OrdersList;
