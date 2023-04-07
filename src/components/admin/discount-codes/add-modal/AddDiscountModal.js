import { useState } from 'react';

import styles from '../../products-list/modal/EditProductModal.module.css';



const AddDiscountModal = ({
    closeModal,
    onSubmit
}) => {
    const [formErrors, setFormErrors] = useState({
        'code': "",
        'discount': "",
        'date': ""
    })

    const checkFields = (e) => {
        if (e.target.value == "" || !e.target.value) {
            setFormErrors(oldErorrs => ({
                ...oldErorrs,
                [e.target.name]: "This field is required"
            }));
        }
    };


    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add new discount code</h2>
                    <button onClick={closeModal} className="close-modal">&times;</button>
                </div>
                <div className="modal-content">
                    <form onSubmit={onSubmit} action="">
                        <div className={styles.formRow}>
                            {Object.values(formErrors).some((error) => error !== "") && (
                                <p className={styles.formError}>There are errors in the form</p>
                            )}
                            <label
                                style={{ minWidth: '80px' }} className={styles.formLabel} htmlFor="code">Code</label>
                            <input
                                onBlur={checkFields}
                                type="text" name='code'
                                className={`${styles.formInput} ${formErrors.code && styles.formFieldError}`} placeholder="Code ..." />
                        </div>

                        <div className={styles.formRow}>
                            <label
                                style={{ minWidth: '80px' }} className={styles.formLabel} htmlFor="discount">Discount %</label>
                            <input
                                onBlur={checkFields}
                                type="number"
                                name='discount'
                                className={`${styles.formInput} ${formErrors.discount && styles.formFieldError}`}
                                placeholder="Discount ..." />
                        </div>

                        <div className={styles.formRow}>
                            <label
                                style={{ minWidth: '80px' }} className={styles.formLabel} htmlFor="discount">Expiry date</label>
                            <input
                                onBlur={checkFields}
                                type="date"
                                name='date'
                                className={`${styles.formInput} ${formErrors.date && styles.formFieldError}`} />
                        </div>
                        <button className={styles.btn}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDiscountModal;