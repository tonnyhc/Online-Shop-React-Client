
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteOrder, editOrder } from '../../../services/orderServices';

import EditOrderModal from '../modals/EditOrderModal';
import DeleteOrderModal from '../modals/DeleteOrderModal';
import styles from './OrderCard.module.css';

const OrderCard = ({
    id,
    date_of_order,
    total_price,
    order_status,
    removeOrder,
}) => {

    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const onEdit = () => {
        setIsOpenEditModal(true);
    }

    const onDelete = () => {
        setIsOpenDeleteModal(true);
    }


    const closeEditModal = () => {
        setIsOpenEditModal(false);
    }

    const closeDeleteModal = () => {
        setIsOpenDeleteModal(false);
    }

    const submitEditHandler = async (e, data) => {
        e.preventDefault();
        try {
            const result = await editOrder(id, data);
            closeEditModal();
            return result;
        } catch (e) {
            alert(e);
        }
        console.log(data);
    }

    const submitDeleteHandler = async (e) => {
        e.preventDefault();
        const {id} = Object.fromEntries(new FormData(e.target));
        try{
            const response = await deleteOrder(id);
            removeOrder(id);
            return response;
        } catch(e) {
            alert(e);
        }
    }

    return (
        <>

        {isOpenEditModal && <EditOrderModal id={id} onSubmit={submitEditHandler} closeModal={closeEditModal} /> }
        {isOpenDeleteModal && <DeleteOrderModal id={id} onSubmit={submitDeleteHandler} closeModal={closeDeleteModal} /> }

            <article className={styles.card}>

                <div className={styles.cardHeader}>
                    <div>
                        <p className={styles.orderNumber}>Order <i>№</i> <span>{id}</span></p>
                        <p className={styles.orderDetails}>Registered on:
                            <span className={styles.orderDate}> {date_of_order}</span>
                            <span> | </span>
                            <span className={styles.orderPrice}>
                                Total: {total_price ? total_price.toFixed(2) : total_price} $
                            </span>
                        </p>
                    </div>
                    <div className={styles.orderDetailsLink}>
                        <Link to={`/orders/order/${id}`}>Order details</Link>
                    </div>
                </div>

                <div className={styles.cardBody}>
                    <div>
                        <p className={styles.orderPrice}>
                            Total : <span>{total_price ? total_price.toFixed(2) : total_price}</span> $
                        </p>
                        <p className={styles.orderStatus}>
                            <span>{order_status}</span>
                        </p>
                    </div>
                    {order_status == "InPreparation" ?

                        <div>
                            <button onClick={onEdit} className={styles.btn}>Edit order data</button>
                            <button onClick={onDelete} className={`${styles.btn} ${styles.deleteBtn}`}>Cancel order</button>
                        </div>
                        :
                        ""
                    }
                </div>
            </article>
        </>
    );
}


export default OrderCard;