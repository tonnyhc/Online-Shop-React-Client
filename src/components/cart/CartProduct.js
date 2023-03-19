import { useContext } from 'react';
import { AuthDataContext } from '../../contexts/AuthContext';
import { BasketContext } from '../../contexts/BasketContext';
import { removeFromBasket, updateBasketItemQuantity } from '../../services/basketService';
import styles from './Cart.module.css';

export const CartProduct = (props) => {
    const { csrfToken } = useContext(AuthDataContext);
    const { removeItemFromBasket } = useContext(BasketContext);

    const { image, quantity, product, discounted_price, product_price, subtotal, slug } = props.props.item;
    const { setBasketItemsOnQuantityChange} = {...props.props};
    const index = props.props.index + 1;

    const onRemoveItem = async (e) => {
        e.preventDefault();

        try {
            const { product } = Object.fromEntries(new FormData(e.target));
            const body = {
                product
            }
            const data = await removeFromBasket(slug, body, csrfToken);
            removeItemFromBasket(product);
            return data;
        } catch (e) {
            alert(e);
        }
    };

    const onQuantityChange = async(e) => {
        e.preventDefault();
        let body = {};

        let value = undefined;

        if (e.target.tagName == "I"){
            value = e.target.parentElement.value;
        } else if (e.target.tagName == 'BUTTON'){
            value = e.target.value;
        }


        if (value == '-') {
            body = {'action': '- 1'}
        } else {
            body = {'action': "+ 1"}
        }
        
        try {
            if (value == '-' && quantity == 1){
                return;
            }
            const data = await updateBasketItemQuantity(slug, body, csrfToken);
            const {discounted_price} = {...data};
            setBasketItemsOnQuantityChange(slug, discounted_price, value);
            return data;
        } catch(e) {
            alert(e);
        }

    }

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
                        <button className={styles.quantityChanger} onClick={onQuantityChange} value='-'>
                            <i className="fa-sharp fa-solid fa-minus"></i>
                        </button>
                    </div>
                    <div className={styles.quantity}><span>{quantity}</span></div>
                    <div >
                        <button className={styles.quantityChanger} onClick={onQuantityChange} value='+'>
                            <i className="fa-sharp fa-regular fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>

            <td className={styles.tdGray}>
                <span>{product}</span>
            </td>

            <td className={styles.tdGray}>
                
                <span>$ 
                    {(discounted_price? discounted_price : product_price).toFixed(2)}
                </span>
            </td>

            <td className={styles.tdGray}>
                <span>$ {subtotal.toFixed(2)}</span>
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