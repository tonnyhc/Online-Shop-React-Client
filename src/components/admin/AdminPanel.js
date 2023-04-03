
import { useCallback, useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';
import AddProduct from './add-product/AddProduct';
import ProductsList from './products-list/ProductsList';
import CategoriesList from './categories/CategoriesList';

import styles from './AdminPanel.module.css';
import { getCategories } from '../../services/adminServices';

const AdminPanel = () => {
    const [categories, setCategories] = useState([]);
    const [productsDropDown, setProductsDropDown] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (e) {
                alert(e);
            }
        })();
    }, []);

    const addCategoryToState = (newCat) => {
        setCategories(oldCats => ([
            ...oldCats,
            newCat
        ]));
    };

    const removeCategoryFromState = (catId) => {
        setCategories(oldCats => oldCats.filter(cat => cat.id != catId));
    };

    const handleProductsDropdownClick = useCallback(() => {
        setProductsDropDown(oldValue => !oldValue);
    });


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
                    <Route path='/add-product' element={<AddProduct categories={categories} />} />
                    <Route path='/products-list' element={<ProductsList categories={categories} />} />
                    <Route path='/categories' element={<CategoriesList
                        removeCategoryFromState={removeCategoryFromState}
                        addCategoryToState={addCategoryToState}
                        categories={categories}
                    />} />
                </Routes>

            </div>
        </section>
    );
}


export default AdminPanel;