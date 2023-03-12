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

                        <button className={`${styles.btn} ${styles.deleteBtn}`}>Delete</button>
                        <button onClick={closeModal} className={styles.btn}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteOrderModal;