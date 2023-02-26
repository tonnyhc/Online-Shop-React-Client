import { useContext } from 'react';
import { AuthDataContext } from '../../contexts/AuthContext';
import { removeFromBasket } from '../../services/basketService';
import styles from './Cart.module.css';

export const CartProduct = (props) => {
    const { csrfToken } = useContext(AuthDataContext);

    const { image, quantity, product, discounted_price, product_price, subtotal, slug } = props.props.item;
    const setBasketItems = props.props.setBasketItems;
    const index = props.props.index + 1;

    const onRemoveItem = async (e) => {
        e.preventDefault();

        try {
            const { product } = Object.fromEntries(new FormData(e.target));
            const body = {
                product
            }
            const data = await removeFromBasket(slug, body, csrfToken);
            setBasketItems(oldItems => {
                return oldItems.filter(item => item.slug !== product);
            })
            return data;
        } catch (e) {
            alert(e);
        }
    };

    return (
        <tr>
            <td>{index}</td>

            <td>
                <div className={styles.productImage}>
                    <img src={image} alt="Product Image" />
                </div>
            </td>

            <td>
                <div className={styles.quantityWrapper}>
                    <div >
                        <button className={styles.quantityChanger}>
                            <i className="fa-sharp fa-solid fa-minus"></i>
                        </button>
                    </div>
                    <div className={styles.quantity}><span>{quantity}</span></div>
                    <div >
                        <button className={styles.quantityChanger}>
                            <i className="fa-sharp fa-regular fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>

            <td className={styles.tdGray}>
                <span>{product}</span>
            </td>

            <td className={styles.tdGray}>
                <span>$ {product_price}</span>
            </td>

            <td className={styles.tdGray}>
                <span>$ {subtotal}</span>
            </td>

            <td className={styles.removeBtn}>
                <form action="" method='delete' onSubmit={onRemoveItem}>
                    <input type="hidden" name='product' value={slug} />
                    <button><i className="fa-solid fa-xmark"></i></button>
                </form>
            </td>

        </tr>
    );
}