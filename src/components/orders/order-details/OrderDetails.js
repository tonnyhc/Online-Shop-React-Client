import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getOrderDetails, editOrder, deleteOrder } from '../../../services/orderServices';

import BannerSmall from '../../banner/BannerSmall';
import EditOrderModal from '../modals/EditOrderModal';
import DeleteOrderModal from '../modals/DeleteOrderModal';
import ItemCard from './ItemCard';


import styles from './OrderDetails.module.css';

const OrderDetails = () => {
    const [order, setOrder] = useState([]);
    const { orderId } = useParams();
    const [actionBtns, setActionBtns] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchOrderDetails() {

            try {
                const data = await getOrderDetails(orderId);
                return setOrder(data);
            } catch (e) {
                alert(e);
            }
        };

        fetchOrderDetails();

    }, []);

    const handleActionBtnsDropDown = () => {
        setActionBtns(actionBtns => !actionBtns)
    };

    const showEditModal = () => {
        setEditModal(true);
    };
    const closeEditModal = () => {
        setEditModal(false);
    };
    const showCancelModal = () => {
        setCancelModal(true);
    };
    const closeCancelModal = () => {
        setCancelModal(false);
    }

    const onSubmitEdit = async (e, orderData) => {
        e.preventDefault();
        const data = await editOrder(orderId, orderData);
        closeEditModal();
        return setOrder(oldOrder => {
            return {
                ...oldOrder,
                full_name: data.full_name,
                phone_number: data.phone_number,
                town: data.town,
                address: data.address,
                post_code: data.post_code
            }
        });
    }

    const onSubmitDelete = async (e) => {
        e.preventDefault();
        const {id } = Object.fromEntries(new FormData(e.target));
        const data = await deleteOrder(id);
        navigate('/profile/orders')
        console.log(data);
    }


    return (
        <>
            <BannerSmall currPage={`Order ${order.id}`} />
            {editModal &&
                <EditOrderModal id={order.id} closeModal={closeEditModal} onSubmit={onSubmitEdit} />
            }
            {cancelModal &&
                <DeleteOrderModal id={order.id} closeModal={closeCancelModal} onSubmit={onSubmitDelete} />
            }

            <section className={styles.orderDetailsSection}>

                <h2 className={styles.bigHeading}>Order № {order.id}</h2>
                <div className={styles.detailsWhiteBox}>

                    <div className={styles.topInfoWrapper}>

                        <div className='row'>

                            <span className={styles.simple_label}>
                                Registered on:
                            </span>
                            <strong className={styles.simple_info}>
                                {order.date_of_order}
                            </strong>
                        </div>

                        <div className='row'>

                            <span className={styles.simple_label}>
                                Total:
                            </span>
                            <strong className={styles.simple_info}>
                                {order.total_price && order.total_price.toFixed(2)} $
                            </strong>
                        </div>

                    </div>
                    {order.order_status === 'InPreparation' &&

                        <div className={styles.asideActionBtns}>
                            <button onClick={handleActionBtnsDropDown} className={styles.orderActions}>
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>

                            {actionBtns &&
                                <div className={styles.actionDropDown}>
                                    <button onClick={showEditModal} className={`${styles.dropDownBtn} ${styles.primaryBtn}`}>
                                        Edit shipping data
                                    </button>

                                    <button onClick={showCancelModal} className={`${styles.dropDownBtn} ${styles.secondaryBtn}`}>
                                        Cancel order
                                    </button>
                                </div>
                            }

                        </div>
                    }

                </div>

                <h3>Order details</h3>

                <div className={`${styles.detailsWhiteBox} ${styles.orderItemsDetails}`}>

                    <div className={styles.shippingStatus}>
                        <div className={styles.iconWrapper}>
                            <i className="fa-solid fa-cart-flatbed"></i>
                        </div>

                        <div className={styles.orderStatus}>
                            <p className={styles.statusP}>{order.order_status}</p>
                            {/* TODO: Check this later */}
                            {order.shipping_date && order.order_status === 'Shipped' &&
                                <p className={styles.statusDate}>Shipping date : <strong>28 март 2022</strong></p>
                            }
                        </div>
                    </div>

                    <div className={styles.infoCardsSection}>

                        <div className={styles.infoCard}>
                            <p className={styles.deliveryTitle}>Delivery : </p>
                            <p>Delivery with courier</p>

                            <p className={styles.deliverySubtitle}>For :</p>
                            <p>{order.full_name}, {order.phone_number}</p>

                            <p className={styles.deliverySubtitle}>Address:</p>
                            <p>{order.address}, {order.town} ({order.post_code})</p>
                        </div>

                    </div>

                    <div className={styles.orderItems}>

                        <ul className={styles.orderItemsList} role='list'>
                            {order.items && order.items.map(item => {
                                return <ItemCard key={item.product.slug} {...item} />
                            })}
                        </ul>


                    </div>

                    <div className={styles.orderItemsSummary}>
                        <div className={styles.orderItemsSummaryWrapper}>
                            <div className={styles.orderItemsProductPrice}>
                                <span className={styles.priceType}>All products : </span>
                                <span className={styles.right}>{order.total_price && order.total_price.toFixed(2)} $</span>
                            </div>
                            {/* TODO: Fix this when have vouchers */}
                            <div className={styles.orderItemsProductPrice}>
                                <span className={styles.priceType}>Discount : </span>
                                <span className={styles.priceRight}>{
                                order.discount?.code ? order.discount.code : '----'  }
                                </span>
                            </div>

                            <div className={styles.orderItemsTotalPrice}>
                                <span className={styles.priceType}>Total price to pay :</span>
                                <span className={styles.priceRight}>{order.discounted_price ? order.discounted_price?.toFixed(2) : order.total_price?.toFixed(2)} $</span>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}


export default OrderDetails;
