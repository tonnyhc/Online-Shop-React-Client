import styles from '../productCard/ProductCard.module.css';


export const getRatingStars = (rating) => {
    let fullStars = Math.floor(rating);
    let halfStar = rating - fullStars >= 0.5;
    let blankStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<li><a href="#" className={styles.star}><i className="fa-solid fa-star" /></a></li>);
    }
    if (halfStar) {
        stars.push(<li><a href="#" className={styles.star}><i className="fa-solid fa-star-half-stroke" /></a></li>);
      }
    for (let i = 0; i < blankStars; i++) {
      stars.push(<li><a href="#" className={styles.star}><i className="fa-regular fa-star" /></a></li>);
    }
    
    return <ul className={styles.product_rating_stars}>{stars}</ul>;
  };
