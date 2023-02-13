import styles from './BannerSmall.module.css'
import { Link } from 'react-router-dom';

export const BannerSmall = (
    {currPage}
) => {
    return (
        <div className={styles.bannerSmall}>
            <div className={styles.servicesBreadcrump}>
                <ul role='list'>
                    <li className={`${styles.inlineLi} ${styles.homeLink}`}>
                        <Link to='/'>HOME</Link>
                    </li>

                    <li className={styles.inlineLi}>
                        <span>|</span>
                    </li>

                    <li className={styles.inlineLi}>
                        <span>{currPage}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}