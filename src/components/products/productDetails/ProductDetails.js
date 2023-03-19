import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';

import * as productServices from '../../../services/productService'

import { BannerSmall } from '../../banner/BannerSmall';
import { getRatingStars } from '../helperFuncs/getRatingStars'

import { AuthDataContext } from '../../../contexts/AuthContext';


import styles from './ProductDetails.module.css';
import { addToBasket } from '../../../services/basketService';
import { BasketContext } from '../../../contexts/BasketContext';
export const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const params = useParams()
    const slug = params.productId

    const { csrfToken, userData } = useContext(AuthDataContext);
    const { addItemToBasket } = useContext(BasketContext);

    useEffect(() => {
        (async () => {
            try {
                const data = await productServices.getBySlug(slug, userData.token, csrfToken);
                setProduct(data);
            } catch (e) {
                alert(e.msg);
            }
        })();
    }, []);

    const onAddToBasket = async (e) => {
        e.preventDefault();
        const body = {
            product: slug,
            quantity: 1
        }
        try {
            const data = await addToBasket(slug, body);
            addItemToBasket(data.item);
            return data;
        } catch(e){
            alert(e);
        }
    }

    return (
        <>
            <BannerSmall currPage="RayBan" />
            <div className={styles.container}>
                <div className={styles.mainSection}>
                    <div className={styles.images}>
                        <img src={product.image || <Skeleton />} alt="" />
                    </div>
                    <div>
                        <h3 className={styles.brand}>{product.brand || <Skeleton />}</h3>
                        <h4 className={styles.model}>{product.model || <Skeleton />}</h4>
                        <p className={styles.price}>
                            {product.discounted_price ?
                                <>
                                    <span>${product.discounted_price || <Skeleton />}</span>
                                    <del>${product.product_price || <Skeleton />} </del>
                                </>
                                :
                                <span>${product.product_price || <Skeleton />}</span>}
                        </p>

                        <div className={styles.rating}>
                            {getRatingStars(product.average_rating) || <Skeleton />}
                        </div>

                        <div className={styles.favourites}>
                            <button className={`${styles.btn} ${styles.btnFavourites}`}><i className="fa-solid fa-heart"></i> <span>Add to favourites</span></button>
                        </div>

                        <form action="" method='post' onSubmit={onAddToBasket}>
                            <input type="hidden" name='product' value={product.slug} />
                            <input type="hidden" name='quantity' value='1' />
                            <button className={styles.btn}>
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span>Add to cart</span>
                            </button>
                        </form>

                        <ul className={styles.social} role='list'>
                            <li>Share on : </li>

                            <li className={styles.logo}>
                                <a href="#"><i className="fa-brands fa-facebook"></i></a>
                            </li>

                            <li className={styles.logo}>
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            </li>

                            <li className={styles.logo}>
                                <a href="#"><i className="fa-brands fa-twitter"></i></a>
                            </li>

                            <li className={styles.logo}>
                                <a href="#"><i className="fa-brands fa-google-plus-g"></i></a>
                            </li>

                            <li className={styles.logo}>
                                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottomSect}>
                    <h4 className={`${styles.respTab}`} id='productDetailsDescr' data-active='true' onClick={bottomSectHandler}
                    >
                        Description
                    </h4>
                    <h4 className={`${styles.respTab}`} id='productDetailsInfo' data-active='false' onClick={bottomSectHandler}
                    >
                        Information
                    </h4>
                    <div className={`${styles.descSection} details-desc`}>
                        <h5>Lorem ipsum dolor sit amet</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id molestias quo ullam distinctio, dolor consequuntur voluptatum eum dolorum deleniti aspernatur, nemo vero, exercitationem eos facere? Cum nesciunt doloremque dignissimos impedit.</p>

                    </div>

                    <div className={`${styles.descSection} details-info`} style={{ 'display': 'none' }}>
                        <h5>{product.brand} {product.model}</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id molestias quo ullam distinctio, dolor consequuntur voluptatum eum dolorum deleniti aspernatur, nemo vero, exercitationem eos facere? Cum nesciunt doloremque dignissimos impedit.</p>

                    </div>
                </div>
            </div>
        </>
    );
}


function bottomSectHandler(e) {
    const target = e.target;

    if (target.dataset.active == "true") {
        return;
    }

    const sections = {
        'Description': '.details-desc',
        'Information': '.details-info',
    }

    const parentDiv = e.target.parentElement;
    const items = parentDiv.querySelectorAll('h4');

    items.forEach(item => item.dataset.active = 'false')
    e.target.parentElement.querySelectorAll('div').forEach(div => div.style.display = 'none');
    for (const item of items) {
        if (item === e.target) {
            item.dataset.active = "true"
            const currSect = document.querySelector(sections[item.textContent]);
            currSect.style.display = 'block';
        }
    }

}