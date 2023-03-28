
import { useCallback, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import AddProduct from './add-product/AddProduct';

import styles from './AdminPanel.module.css';
import Dashboard from './dashboard/Dashboard';

const AdminPanel = () => {
    const [productsDropDown, setProductsDropDown] = useState(false);

    const handleProductsDropdownClick = useCallback(() => {
        setProductsDropDown(oldValue => !oldValue);
    })

    return (
        <section className={styles.adminSection}>
            <aside>
                <nav className={styles.adminNav}>
                    <ul className={styles.navItems} role='list'>

                        <li className={styles.navItem}>
                            <span className={styles.navItemTitle}>
                                <NavLink to='/admin'>
                                    <i className="fa-solid fa-boxes-stacked"></i>
                                    <span>Dashboard</span>
                                </NavLink>
                            </span>
                        </li>

                        <li className={styles.navItem} onClick={handleProductsDropdownClick}>
                            <span className={styles.navItemTitle}>
                                <i className="fa-brands fa-dropbox"></i>
                                <span>Products</span>
                                <span className={styles.arrow}>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </span>
                            </span>

                            {productsDropDown &&
                                <ul className={styles.nestedNavItems} role='list'>
                                    <li className={styles.nestedNavItem}>
                                        <NavLink to="/admin/add-product">
                                            <span>Add product</span>
                                        </NavLink>
                                    </li>

                                    <li className={styles.nestedNavItem}>
                                        <NavLink to="/admin/products-list">
                                            <span>Products list</span>
                                        </NavLink>
                                    </li>

                                    <li className={styles.nestedNavItem}>
                                        <NavLink to="/admin/categories">
                                            <span>Categories</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            }

                        </li>

                        <li className={styles.navItem}>
                            <span className={styles.navItemTitle}>
                                <NavLink to='/admin/orders'>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span>Orders</span>
                                </NavLink>
                            </span>
                        </li>

                        <li className={styles.navItem}>
                            <span className={styles.navItemTitle}>
                                <NavLink to='/admin/customers'>
                                    <i className="fa-solid fa-users"></i>
                                    <span>Customers</span>
                                </NavLink>
                            </span>
                        </li>

                    </ul>
                </nav>
            </aside>

            <div className={styles.mainSection}>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/add-product' element={<AddProduct />} />
                    <Route path='/products-list' element={<h1>Products list</h1>} />
                    <Route path='/categories' element={<h1>Categories</h1>} />
                </Routes>

            </div>
        </section>
    );
}


export default AdminPanel;