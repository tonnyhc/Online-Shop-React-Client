import styles from '../productCard/ProductCard.module.css';


export const getRatingStars = (rating, handler, slug) => {
    let fullStars = Math.floor(rating);
    let halfStar = rating - fullStars >= 0.5;
    let blankStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = [];
    let value = 1;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<li><button className={styles.star} onClick={(e) => handler(e, slug)} value={value}><i className="fa-solid fa-star" /></button></li>);
      value ++;
    }
    if (halfStar) {
        stars.push(<li><button className={styles.star} onClick={(e) => handler(e, slug)} value={value}><i className="fa-solid fa-star-half-stroke" /></button></li>);
        value ++;
      }
    for (let i = 0; i < blankStars; i++) {
      stars.push(<li><button className={styles.star} onClick={(e) => handler(e, slug)} value={value}><i className="fa-regular fa-star" /></button></li>);
      value ++;
    }
    
    return <ul className={styles.product_rating_stars}>{stars}</ul>;
  };
