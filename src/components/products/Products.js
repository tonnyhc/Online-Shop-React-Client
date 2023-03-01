
import { useContext, useEffect, useState } from 'react';


import { RangeSlider } from './RangeSlider';

import { BannerSmall } from '../banner/BannerSmall';
import { ProductCard } from './productCard/ProductCard';

import * as productServices from '../../services/productService'

import styles from './Products.module.css'
import { AuthDataContext } from '../../contexts/AuthContext';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
   
    const {userData} = useContext(AuthDataContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await productServices.getAll();
                setProducts(products);
            } catch (e) {
                alert(e.msg);
            }
        };

        fetchProducts();

    }, []);



    const handlePriceRangeChange = (newValue) => {
        setPriceRange(newValue);
    };

    const formatPrice = (price) => `$${price}`;


    return (
        <>
            <BannerSmall currPage={'Products'} />
            <section className={styles.productsSection}>
                <div className={styles.filtersToggleWrapper} onClick={toggleFiltersHandler}>
                    <span className={styles.filtersDropdownToggle}>Filters <i className="fa-solid fa-bars"></i></span>
                </div>
                <aside className={styles.filters}>
                    <div className={styles.searchBar}>
                        <h3>Search here...</h3>
                        <form action="" method='post'>
                            <input type="text" placeholder='Search ...' />
                            <button className='btnMagnifier'><i className="fa-solid fa-magnifying-glass"></i></button>

                        </form>
                    </div>

                    <div className={styles.priceRange} id='priceSlider'>
                        <h3>Price range</h3>
                        <p className={styles.priceRangeDisplay}>{formatPrice(priceRange[0])}    -    {formatPrice(priceRange[1])}</p>
                        <div className={styles.sliderWrapper}>
                            <RangeSlider value={priceRange} onChange={handlePriceRangeChange} />
                        </div>
                    </div>

                    <div className={styles.filtersSection}>
                        <h3>Category</h3>

                        <ul className="options" role='list'>
                            <li className={styles.option}>
                                <input type="checkbox" name="Sunglasses" defaultValue={'Sunglasses'} />
                                <label className={styles.optionLabel} htmlFor="Sunglasses">Sunglasses</label>
                            </li>

                            <li className={styles.option}>
                                <input type="checkbox" name="Prism" defaultValue={'Prism'} />
                                <label className={styles.optionLabel} htmlFor="Prism">Prism</label>
                            </li>

                            <li className={styles.option}>
                                <input type="checkbox" name="Lens" defaultValue={'Lens'} />
                                <label className={styles.optionLabel} htmlFor="Lens">Lens</label>
                            </li>

                            <li className={styles.option}>
                                <input type="checkbox" name="Cases" defaultValue={'Cases'} />
                                <label className={styles.optionLabel} htmlFor="Cases">Cases</label>
                            </li>
                        </ul>

                    </div>

                    <div className={styles.filtersSection}>
                        <h3>Brands</h3>
                        <ul className='options' role='list'>
                            <li className={styles.option}>
                                <input type="checkbox" name="RayBan" defaultValue={'RayBan'} />
                                <label className={styles.optionLabel} htmlFor="RayBan">RayBan</label>
                            </li>

                            <li className={styles.option}>
                                <input type="checkbox" name="RayBan" defaultValue={'RayBan'} />
                                <label className={styles.optionLabel} htmlFor="RayBan">RayBan</label>
                            </li>

                            <li className={styles.option}>
                                <input type="checkbox" name="RayBan" defaultValue={'RayBan'} />
                                <label className={styles.optionLabel} htmlFor="RayBan">RayBan</label>
                            </li>

                            <li className={styles.option}>
                                <input type="checkbox" name="RayBan" defaultValue={'RayBan'} />
                                <label className={styles.optionLabel} htmlFor="RayBan">RayBan</label>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.filtersSection}>
                        <h3>Gender</h3>
                        <ul className='options' role='list'>
                            <li className={styles.option}>
                                <input type="checkbox" name="Man" defaultValue={'Man'} />
                                <label className={styles.optionLabel} htmlFor="Man">Man</label>
                            </li>
                            <li className={styles.option}>
                                <input type="checkbox" name="Woman" defaultValue={'Woman'} />
                                <label className={styles.optionLabel} htmlFor="Woman">Woman</label>
                            </li>
                            <li className={styles.option}>
                                <input type="checkbox" name="Unisex" defaultValue={'Unisex'} />
                                <label className={styles.optionLabel} htmlFor="Unisex">Unisex</label>
                            </li>
                        </ul>
                    </div>

                    <div className="customerReview">
                        <h3>Products rating</h3>

                        <ul className="options" role='list'>
                            <li className={`${styles.starOption} ${styles.option}`}>
                                <a href="#">
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.numRating}>5.0</span>
                                </a>
                            </li>
                            <li className={`${styles.starOption} ${styles.option}`}>
                                <a href="#">
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>4.0</span>
                                </a>
                            </li>

                            <li className={`${styles.starOption} ${styles.option}`}>
                                <a href="#">
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.halfStar}><i className="fa-solid fa-star-half-stroke"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>3.5</span>
                                </a>
                            </li>

                            <li className={`${styles.starOption} ${styles.option}`}>
                                <a href="#">
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>3.0</span>
                                </a>
                            </li>

                            <li className={`${styles.starOption} ${styles.option}`}>
                                <a href="#">
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.halfStar}><i className="fa-solid fa-star-half-stroke"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>2.5</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className={styles.productsListWrapper}>
                    <div className={styles.productsList}>
                        {products.map(product => <ProductCard key={product.product_id} {...product}/>)}
                    </div>
                </div>

            </section>
        </>
    );
}

export const PriceRange = ({ value, onChange }) => {
    const formatPrice = (price) => `$${price}`;

    const handlePriceRangeChange = (event, newValue) => {
        onChange(event, newValue);
    };

    return (
        <div className={styles.priceRange}>
            <h3>Price range</h3>
            <p>{formatPrice(value[0])} - {formatPrice(value[1])}</p>
            <RangeSlider value={value} onChange={handlePriceRangeChange} />
        </div>
    );
};


function toggleFiltersHandler(e) {
    e.preventDefault();
    const filtersSection = document.querySelector(`.${styles.filters}`);

    if (filtersSection.style.display === 'none') {
        filtersSection.style.display = 'block';
    } else {
        filtersSection.style.display = 'none';
    }
}