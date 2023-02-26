import styles from './Cart.module.css';

export const CartProduct = (props) => {
    const {image, quantity, product , discounted_price, product_price, subtotal } = props.props.item;
    const index = props.props.index + 1;
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
                            <i class="fa-sharp fa-solid fa-minus"></i>
                        </button>
                    </div>
                    <div className={styles.quantity}><span>{quantity}</span></div>
                    <div >
                        <button className={styles.quantityChanger}>
                            <i class="fa-sharp fa-regular fa-plus"></i>
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

            <td>
                <a href="#">
                    <i class="fa-solid fa-xmark"></i>
                </a>
            </td>

        </tr>
    );
}