import styles from './Modal.module.css'

const DeleteOrderModal = ({
    id,
    closeModal,
    onSubmit
}) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <p className={styles.deleteP}>Are you sure you want to cancel your order?</p>
                    <form method='post' onSubmit={(e) => onSubmit(e)} className={`${styles.modalForm} ${styles.deleteForm}`} >

                        <input type="hidden" name='id' value={id} />

                        <button type='submit' className={`${styles.btn} ${styles.deleteBtn}`}>Cancel order</button>
                        <button type='button' onClick={closeModal} className={styles.btn}>Go back</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteOrderModal;