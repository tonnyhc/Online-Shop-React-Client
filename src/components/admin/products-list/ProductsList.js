import { useState, useEffect } from 'react';
import { fetchProductList } from '../../../services/adminServices';

import ProductCard from './ProductCard';

import styles from './ProductsList.module.css';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const products = await fetchProductList();
                setProducts(products);
                return products;
            } catch (e) {
                alert(e);
            }
        })();
    }, [])


    return (
        <section className={styles.productsSection}>
            <div className={styles.header}>
                <h2>Products List</h2>
                <button className={styles.addBtn}>
                    <i class="fa-solid fa-plus"></i>
                    <span>Create new</span>
                </button>
            </div>

            <div className={styles.body}>
                <div className={styles.filters}>
                    <input type="text" placeholder='Search' name="search" />

                    <div className={styles.sorter}>
                        <select name="category" id="category">
                            <option value="Sunglasses">Sunglasses</option>
                            <option value="Lens">Lens</option>
                            <option value="Prism">Prism</option>
                        </select>

                        <select name="multisorter" id="multisorter">
                            <option value="lastAdded">Newest</option>
                            <option value="lastAdded">Oldest</option>
                            <option value="priceAscending">
                                Price asc
                            </option>
                            <option value="priceDescending">
                                Price desc
                            </option>
                        </select>
                    </div>
                </div>

                <div className={styles.productsGrid}>
                    {products.map(product => 
                        <ProductCard key={product.id} {...product} />
                    )}
                </div>
            </div>

        </section>
    );
}

export default ProductsList;