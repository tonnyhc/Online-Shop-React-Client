import { Link } from 'react-router-dom';

import {deleteProduct} from '../../../services/adminServices';

import styles from './ProductCard.module.css'

const ProductCard = ({
    brand,
    model,
    product_price,
    discounted_price,
    slug,
    images,

    updateProductsOnDelete
}) => {

    const onDelete = async (e) => {
        e.preventDefault();
        const confirmation = window.confirm('Are you sure you want to delete this product? Changes cannot be revert!');
        if (!confirmation){
            return;
        }
        try{
            const data = await deleteProduct(slug);
            updateProductsOnDelete(slug);
            return data;
        } catch(e){
            alert(e);
        }
    }


    return (
        <article className={styles.productCard}>
            <div className={styles.imgWrapper}>
                <img src={images[0].image_url} alt="Product picture" />
            </div>
            <div className={styles.productInfo}>
                <p className={styles.productTitle}>{brand} {model}</p>
                <p className={styles.productPrice}>$ {product_price.toFixed(2)}</p>
                <div className={styles.cardBtns}>
                    <Link className={styles.editBtn} to={`/admin/product/${slug}/edit`}>
                        <i className="fa-solid fa-pencil"></i>
                        Edit
                    </Link>
                    <button onClick={onDelete} className={styles.deleteBtn}>
                        <i className="fa-solid fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard