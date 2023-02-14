import styles from './Products.module.css'
import { RangeSlider } from './RangeSlider';
import { useState } from 'react';
import { style } from '@mui/system';
import { BannerSmall } from '../banner/BannerSmall';


export const Products = () => {

    const [priceRange, setPriceRange] = useState([0, 1000]);

    const handlePriceRangeChange = (newValue) => {
        setPriceRange(newValue);
    };

    const formatPrice = (price) => `$${price}`;


    return (
        <>
            <BannerSmall currPage={'Products'} />
            <section className={styles.productsSection}>
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

                    <div className={styles.category}>
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

                    <div className={styles.brands}>
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

                    <div className="discount">

                    </div>

                    <div className="customerReview">
                        <h3>Products rating</h3>

                        <ul className="options" role='list'>
                            <li className={`${styles.starOption} ${styles.option}`}>
                                <a href="#">
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.numRating}>5.0</span>
                                </a>
                            </li>
                            <li className={`${styles.starOption} ${styles.option}`}>
                                <a href="#">
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.blankStar}><i class="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>4.0</span>
                                </a>
                            </li>

                            <li className={`${styles.starOption} ${styles.option}`}>
                                <a href="#">
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.halfStar}><i class="fa-solid fa-star-half-stroke"></i></span>
                                    <span className={styles.blankStar}><i class="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>3.5</span>
                                </a>
                            </li>

                            <li className={`${styles.starOption} ${styles.option}`}>
                                <a href="#">
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.blankStar}><i class="fa-regular fa-star"></i></span>
                                    <span className={styles.blankStar}><i class="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>3.0</span>
                                </a>
                            </li>

                            <li className={`${styles.starOption} ${styles.option}`}>
                                <a href="#">
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i class="fa-solid fa-star"></i></span>
                                    <span className={styles.halfStar}><i class="fa-solid fa-star-half-stroke"></i></span>
                                    <span className={styles.blankStar}><i class="fa-regular fa-star"></i></span>
                                    <span className={styles.blankStar}><i class="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>2.5</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className={styles.productsList}>
                    
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
