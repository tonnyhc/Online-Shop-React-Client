

import { useEffect, useState } from 'react';
import { getFavorites } from '../../services/productService';
import BannerSmall from '../banner/BannerSmall';
import FavoriteProductCard from './FavoriteProductCard';


import styles from './FavoriteProducts.module.css';

const FavoriteProducts = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await getFavorites();
            setFavorites(result);
        })();
    },[])


    const removeItemFromFavorites = (itemSlug) => {
        const newState = favorites.filter(x => x.product.slug != itemSlug);
        console.log('entered')
        return setFavorites(newState);
    }


    return (
        <>
            <BannerSmall currPage='Favorites' />

            <section className={styles.favoritesSection}>
                <h2>Favorites</h2>
                <div className={styles.products}>
                    <ul role='list'>
                        {favorites.map(product => <FavoriteProductCard removeItemFromFavorites={removeItemFromFavorites} key={product.id} {...product}/>)}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default FavoriteProducts;