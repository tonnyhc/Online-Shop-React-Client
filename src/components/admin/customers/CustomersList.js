import { useEffect, useState } from 'react';
import { fetchCustomers } from '../../../services/adminServices';

import styles from './CustomersList.module.css';

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchCustomers();
                setCustomers(data);

            } catch (e) {
                alert(e)
            }
        })();
    }, [])

    return (
        <section className={styles.customersSection}>
            <h2>Customers List</h2>
            <table className={styles.customersTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Gender</th>
                        <th>Orders count</th>
                        <th>Total income</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map(
                        customer =>
                            <tr>
                                <td># {customer.id}</td>
                                <td>{customer.full_name || "-----"}</td>
                                <td>{customer.email}</td>
                                <td>{customer.username}</td>
                                <td>{customer.gender || "-----"}</td>
                                <td>{customer.total_orders}</td>
                                <td>{customer.total_income?.toFixed(2)} $</td>
                            </tr>
                    )}

                </tbody>
            </table>
        </section>
    );
}

export default CustomersList;