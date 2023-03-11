
import React from "react";

import { useContext, useEffect, useReducer, useState } from 'react';


import { RangeSlider } from './RangeSlider';

import { BannerSmall } from '../banner/BannerSmall';
import { ProductCard } from './productCard/ProductCard';

import * as productServices from '../../services/productService'

import styles from './Products.module.css'
import { AuthDataContext } from '../../contexts/AuthContext';

export const Products = () => {
    // TODO: Make it with reducer
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([1, 1000]);

    const updateArrayFields = (state, action, field) => {
        const value = action.payload;
        const oldValues = state[field];
        const newValues = oldValues.includes(value)
            ? oldValues.filter((item) => item !== value)
            : [...oldValues, value];
        return { ...state, [field]: newValues };
    }

    const filtersReducer = (state, action) => {
        switch (action.type) {
            case "UPDATE_SEARCH":
                return { ...state, search: action.payload };
            case "UPDATE_PRICE":
                return { ...state, 'min-price': action.payload[0], 'max-price': action.payload[1] }
            case "UPDATE_GENDER":
                return updateArrayFields(state, action, 'gender');
            case "UPDATE_CATEGORIES":
                return updateArrayFields(state, action, 'category');
            case "UPDATE_BRANDS":
                return updateArrayFields(state, action, 'brands');
            case "UPDATE_RATING":
                return {...state, 'average-rating': action.payload}
            default:
                return state
        }

    }

    const [filters, filtersDispatch] = useReducer(filtersReducer, {
        'search': null,
        'min-price': null,
        'max-price': null,
        'brands': [],
        'model': null,
        'category': [],
        'average-rating': null,
        'gender': [],
    });

    const { userData } = useContext(AuthDataContext);

    useEffect(() => {
        const fetchProducts = async (filters) => {
            try {
                let query = {}
                for (let [filter, value] of Object.entries(filters)) {
                    if (value && value.length >= 1 || (typeof value) == 'number') {
                        query[filter] = value;
                    }
                }
                const data = await productServices.getAll(query);
                const { products, query_filters } = data;

                setProducts(products);
                setCategories(query_filters['categories']);
                setBrands(query_filters['brands'])
            } catch (e) {
                alert(e);

            }
        };

        fetchProducts(filters);

    }, [filters]);



    const handlePriceRangeChange = (newValue) => {
        setPriceRange(newValue);
        filtersDispatch({
            type: "UPDATE_PRICE",
            payload: priceRange
        })
    };

    const handleFiltersChange = (e) => {
        let field;
        const filterType = e.target.parentElement.parentElement.id;

        if (e.target.tagName == 'LABEL') {
            field = e.target.parentElement.querySelector('input');
        } else if (e.target.tagName == 'INPUT') {
            field = e.target;
        }

        let actionType = '';
        if (filterType == 'category') {
            actionType = 'UPDATE_CATEGORIES';
        } else if (filterType == 'brands') {
            actionType = 'UPDATE_BRANDS';
        } else if (filterType == 'gender') {
            actionType = "UPDATE_GENDER"
        } else if (filterType == 'rating') {
            actionType = "UPDATE_RATING"
        }

        filtersDispatch({
            type: actionType,
            payload: field.value
        })

    }

    const onSubmitSearch = (e) => {
        e.preventDefault();

        const { search } = Object.fromEntries(new FormData(e.target));

        if (!search || search == '') {
            return
        }

        filtersDispatch({
            type: 'UPDATE_SEARCH',
            payload: search
        })
    }

    const onRatingFilter = (e) => {
        e.preventDefault();

        let field;
        if (e.target.tagName == "BUTTON"){
            field = e.target;
        } else if (e.target.tagName == 'SPAN'){
            field = e.target.parentElement;
        } else {
            field = e.target.parentElement.parentElement;
        }

        const value = Number(field.id);

        filtersDispatch({
            type: "UPDATE_RATING",
            payload: value
        })
    }


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
                        <form action="" method='post' onSubmit={onSubmitSearch}>
                            <input type="text" placeholder='Search ...' name='search' />
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

                        <ul className="options" id='category' role='list'>
                            {categories.map(category => {
                                return (
                                    <li key={category.category} className={styles.option}>
                                        <input type="checkbox" name={category.category} onClick={handleFiltersChange} id={category.category} defaultValue={category.category} />
                                        <label className={styles.optionLabel} htmlFor={category.category}>{category.category}</label>
                                    </li>
                                );
                            })}
                        </ul>

                    </div>

                    <div className={styles.filtersSection}>
                        <h3>Brands</h3>
                        <ul className='options' id='brands' role='list'>
                            {brands.map(brand => {
                                return (
                                    <li className={styles.option}>
                                        <input type="checkbox" onClick={handleFiltersChange} name={brand} defaultValue={brand} />
                                        <label className={styles.optionLabel} htmlFor={brand}>{brand}</label>
                                    </li>
                                );
                            })}

                        </ul>
                    </div>

                    <div className={styles.filtersSection}>
                        <h3>Gender</h3>
                        <ul className='options' id='gender' role='list'>
                            <li className={styles.option}>
                                <input type="checkbox" onClick={handleFiltersChange} name="Man" defaultValue={'Man'} />
                                <label className={styles.optionLabel} htmlFor="Man">Man</label>
                            </li>
                            <li className={styles.option}>
                                <input type="checkbox" onClick={handleFiltersChange} name="Woman" defaultValue={'Woman'} />
                                <label className={styles.optionLabel} htmlFor="Woman">Woman</label>
                            </li>
                            <li className={styles.option}>
                                <input type="checkbox" onClick={handleFiltersChange} name="Unisex" defaultValue={'Unisex'} />
                                <label className={styles.optionLabel} htmlFor="Unisex">Unisex</label>
                            </li>
                        </ul>
                    </div>

                    <div className="customerReview">
                        <h3>Products rating</h3>

                        <ul className="options" id='rating' role='list'>
                            <li className={`${styles.starOption} ${styles.option}`}>
                                <button onClick={onRatingFilter} id='5' className={styles.starBtn}>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.numRating}>5.0</span>
                                </button>
                            </li>
                            <li className={`${styles.starOption} ${styles.option}`}>
                                <button onClick={onRatingFilter} id='4' className={styles.starBtn}>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>4.0</span>
                                </button>
                            </li>

                            <li className={`${styles.starOption} ${styles.option}`}>
                                <button onClick={onRatingFilter} id='3.5' className={styles.starBtn}>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.halfStar}><i className="fa-solid fa-star-half-stroke"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>3.5</span>
                                </button>
                            </li>

                            <li className={`${styles.starOption} ${styles.option}`}>
                                <button onClick={onRatingFilter} id='3' className={styles.starBtn}>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>3.0</span>
                                </button>
                            </li>

                            <li className={`${styles.starOption} ${styles.option}`}>
                                <button onClick={onRatingFilter} id='2.5' className={styles.starBtn}>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.fullStar}><i className="fa-solid fa-star"></i></span>
                                    <span className={styles.halfStar}><i className="fa-solid fa-star-half-stroke"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.blankStar}><i className="fa-regular fa-star"></i></span>
                                    <span className={styles.numRating}>2.5</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className={styles.productsListWrapper}>
                    <div className={styles.productsList}>
                        {products.map(product => <ProductCard key={product.product_id} {...product} />)}
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