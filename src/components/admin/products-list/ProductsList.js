import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductList } from '../../../services/adminServices';

import ProductCard from './product-card/ProductCard';

import styles from './ProductsList.module.css';

const ProductsList = ({
    categories,
}) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const products = await fetchProductList();
                setProducts(products);
                setSortedProducts(products);
                return products;
            } catch (e) {
                alert(e);
            }
        })();
    }, []);

    useEffect(() => {
        setSortedProducts(products.filter(product => `${product.brand} ${product.model}`.includes(search)));
    }, [search])

    const updateProductsOnDelete = (productSlug) => {
        setProducts(oldProducts => (
            oldProducts.filter(product => product.slug != productSlug)
        ))
    };

    const updateProductsOnEdit = (editedProduct) => {
        setSortedProducts(prevProducts =>
            prevProducts.map(product => {
                if (product.id === editedProduct.id) {
                    return editedProduct;
                }
                return product;
            })
        );
        
    }

    const filterProducts = (e) => {
        const field = e.target;
        if (field.value != '') {
            return setSortedProducts(products.filter(product => product.category === field.value))
        };
        return setSortedProducts(products);
    }

    const sortProducts = (e) => {
        const sortBy = e.target.value;
        switch (sortBy) {
            case 'oldest':
                setSortedProducts([...sortedProducts].sort((a, b) => b.id - a.id));
                break;
            case 'newest':
                setSortedProducts([...sortedProducts].sort((a, b) => a.id - b.id));
                break
            case 'priceAscending':
                setSortedProducts([...sortedProducts].sort((a, b) => a.product_price - b.product_price));
                break;
            case 'priceDescending':
                setSortedProducts([...sortedProducts].sort((a, b) => b.product_price - a.product_price));
                break;
            default:
                setSortedProducts(products);
                break
        }
    };

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }


    return (
        <>
            <section className={styles.productsSection}>
                <div className={styles.header}>
                    <h2>Products List</h2>
                    <Link to='/admin/add-product' className={styles.addBtn}>
                        <i className="fa-solid fa-plus"></i>
                        <span>Create new</span>
                    </Link>
                </div>

                <div className={styles.body}>
                    <div className={styles.filters}>
                        <input type="text" placeholder='Search' name="search" value={search} onChange={changeSearch} />

                        <div className={styles.sorter}>
                            <select name="category" id="category" onChange={filterProducts}>
                                <option value="">Category</option>
                                {categories.map(category =>
                                    <option key={category.category} value={category.category}>{category.category}</option>
                                )}
                            </select>

                            <select name="multisorter" id="multisorter" onChange={sortProducts}>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
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
                        {sortedProducts.map(product =>
                            <ProductCard
                                key={product.id}
                                {...product}
                                updateProductsOnDelete={updateProductsOnDelete}
                                updateProductsOnEdit={updateProductsOnEdit}
                            />
                        )}
                    </div>
                </div>

            </section>
        </>

    );
}

export default ProductsList;