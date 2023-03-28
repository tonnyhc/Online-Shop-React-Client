import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';

import * as productServices from '../../../services/productService'

import { BannerSmall } from '../../banner/BannerSmall';
import { getRatingStars } from '../helperFuncs/getRatingStars'

import { AuthDataContext } from '../../../contexts/AuthContext';


import styles from './ProductDetails.module.css';
import { BasketContext } from '../../../contexts/BasketContext';
import { addToBasket } from '../../../services/basketService';
export const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const [titleImage, setTitleImage] = useState({
        'image_url': ''
    });
    const params = useParams()
    const slug = params.productId

    const { csrfToken, userData } = useContext(AuthDataContext);
    const { addItemToBasket } = useContext(BasketContext);

    useEffect(() => {
        (async () => {
            try {
                const data = await productServices.getBySlug(slug, userData.token, csrfToken);
                setProduct(data);
                setTitleImage(data.images[0]);
            } catch (e) {
                alert(e.msg);
            }
        })();
    }, []);

    const onAddToBasket = async (e) => {
        e.preventDefault();
        try {
            const data = await addToBasket(slug);
            addItemToBasket(data.item);
            return data;
        } catch (e) {
            alert(e);
        }
    }

    const onAddToFavorites = async (e) => {
        e.preventDefault();
        const { slug } = Object.fromEntries(new FormData(e.target));
        try {
            const data = await productServices.addToFavorites(slug);
            return data;
        } catch (e) {
            alert(e);
        }
    };

    const onChangeTitleImage = (e) => {
        return setTitleImage({
            'image_url': e.target.src
        });
    }

    return (
        <>
            <BannerSmall currPage="RayBan" />
            <div className={styles.container}>
                <div className={styles.mainSection}>
                    <div className={styles.images}>
                        <img src={
                            titleImage ? titleImage.image_url : "" || <Skeleton />
                        } alt="Product image" />
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
                            <form method="post" onSubmit={onAddToFavorites}>
                                <input type="hidden" name='slug' value={product.slug} />
                                <button className={`${styles.btn} ${styles.btnFavourites}`}><i className="fa-solid fa-heart"></i> <span>Add to favourites</span></button>
                            </form>
                        </div>

                        <form action="" method='post' onSubmit={onAddToBasket}>
                            <input type="hidden" name='product' value={product.slug} />
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

                <div className={styles.imagesSection}>
                    {product.images?.map(image => {
                        return (
                            <div onClick={onChangeTitleImage} className={styles.imageSmall}>
                                <img src={image.image_url} alt="" />
                            </div>
                        )})}
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