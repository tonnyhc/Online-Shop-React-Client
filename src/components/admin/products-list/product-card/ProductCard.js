import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deleteProduct } from '../../../../services/adminServices';
import EditProductModal from '../modal/EditProductModal'


import styles from './ProductCard.module.css'

const ProductCard = ({
    brand,
    model,
    product_price,
    discounted_price,
    slug,
    images,
    gender,
    category,
    is_published,

    updateProductsOnDelete,
    updateProductsOnEdit
}) => {
    const [editModal, setEditModal] = useState(false);

    const onDelete = async (e) => {
        e.preventDefault();
        const confirmation = window.confirm('Are you sure you want to delete this product? Changes cannot be revert!');
        if (!confirmation) {
            return;
        }
        try {
            const data = await deleteProduct(slug);
            updateProductsOnDelete(slug);
            return data;
        } catch (e) {
            alert(e);
        }
    }

    const openModal = () => {
        setEditModal(true);
    }
    const closeModal = () => {
        setEditModal(false);
    }



    return (
        <>
            {editModal && <EditProductModal
                brand={brand}
                model={model}
                product_price={product_price}
                discounted_price={discounted_price}
                gender={gender}
                category={category}
                slug={slug}
                images={images}
                closeModal={closeModal}
                is_published={is_published}

                updateProductsOnEdit={updateProductsOnEdit}
            />}

            <article className={styles.productCard}>
                <div className={styles.imgWrapper}>
                    <img src={images[0].image_url} alt="Product picture" />
                </div>
                <div className={styles.productInfo}>
                    <p className={styles.productTitle}>{brand} {model}</p>
                    <span className={styles.productPrice}>$ {product_price.toFixed(2)}</span>
                    {!is_published && <span className={styles.hiddenProduct}>Hidden</span>}
                    <div className={styles.cardBtns}>
                        <button onClick={() => setEditModal(true)} className={styles.editBtn}>
                            <i className="fa-solid fa-pencil"></i>
                            Edit
                        </button>
                        <button onClick={onDelete} className={styles.deleteBtn}>
                            <i className="fa-solid fa-trash"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </article>
        </>
    );
};

export default ProductCard