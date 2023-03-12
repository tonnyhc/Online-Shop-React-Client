import { useEffect, useState } from 'react';

import { getOrderDetails } from '../../../services/orderServices';
import styles from './Modal.module.css';


const EditOrderModal = ({
    id,
    closeModal,
    onSubmit
}) => {

    const [orderData, setOrderData] = useState({});
    const [formFieldErrors, setFormFieldErrors] = useState({
        'full_name': "",
        'phone_number': "",
        'town': "",
        'address': "",
        'post_code': ''
    })

    useEffect(() => {
        async function fetchOrder(orderId) {
            try {
                const data = await getOrderDetails(orderId);
                setOrderData(data);
            } catch (e) {
                alert(e);
            }
        }
        fetchOrder(id);
    }, [])


    const onChange = (e) => {
        let field = e.target;
        let value = field.value;

        setOrderData(oldData => {
            return {
                ...oldData,
                [field.name]: value
            }
        })

    }

    const checkFieldData = (e) => {
        const field = e.target;

        if (field.name == 'full_name') {
            if (!field.value || field.value == "") {
                return setFormFieldErrors(oldErrors => {
                    return {
                        ...oldErrors,
                        full_name: "Please enter your full name"
                    }
                })
            }

            return setFormFieldErrors(oldErrors => {
                return {
                    ...oldErrors,
                    full_name: ""
                }
            })
        }

        if (field.name == "phone_number") {

            if (!field.value || field.value == "") {
                return setFormFieldErrors(oldErrors => {
                    return {
                        ...oldErrors,
                        phone_number: "This field is required"
                    }
                })
            };

            const isOnlyNumbers = /^\d+$/.test(field.value);
            if (!isOnlyNumbers) {
                return setFormFieldErrors(oldErrors => {
                    return {
                        ...oldErrors,
                        phone_number: "Please enter a valid phone number"
                    }
                }
                )
            };

            setFormFieldErrors(oldErrors => {
                return {
                    ...oldErrors,
                    phone_number: ""
                }
            });


        }

        if (field.name == "town") {
            if (!field.value || field.value == "") {
                return setFormFieldErrors(oldErrors => {
                    return {
                        ...oldErrors,
                        town: "Please enter your town name"
                    }
                })
            }
            return setFormFieldErrors(oldErrors => {
                return {
                    ...oldErrors,
                    town: ""
                }
            })
        }

        if (field.name == 'address') {
            if (!field.value || field.value == ""){
                setFormFieldErrors(oldErrors => {
                    return {
                        ...oldErrors,
                        address: "Please enter your correct address"
                    }
                })
            }
        }

        if (field.name == 'post_code') {

            if (!field.value || field.value =="") {
                return setFormFieldErrors(oldErrors => {
                    return {
                        ...oldErrors,
                        post_code: "Please enter your post code"
                    }
                });
            };

            if (!/^\d+$/.test(field.value)) {
                return setFormFieldErrors(oldErrors => {
                    return {
                        ...oldErrors,
                        post_code: "Please enter a valid post code"
                    }
                })
            };

            return setFormFieldErrors(oldErrors => {
                return {
                    ...oldErrors,
                    post_code: ""
                }
            })
        }
    }


    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Edit order data</h2>
                    <button onClick={closeModal} className="close-modal">&times;</button>
                </div>
                <div className="modal-content">

                    <form method='post' className={styles.modalForm} onSubmit={(e) => onSubmit(e, orderData)}>

                        <div className={`${styles.formRow}`}>
                            {formFieldErrors.full_name &&
                                <span className={styles.formError}>{formFieldErrors.full_name}
                                </span>}
                            <label className={styles.formLabel} htmlFor="full_name">Full name:</label>
                            <input
                                onBlur={checkFieldData}
                                onChange={onChange}
                                className={`${styles.formInput} ${formFieldErrors.full_name ? styles.formFieldError : ""}`}
                                type="text" name='full_name'
                                placeholder='Full name...'
                                defaultValue={orderData['full_name']} />
                        </div>

                        <div className={`${styles.formRow}`}>
                            {formFieldErrors.phone_number &&
                                <span className={styles.formError}>{formFieldErrors.phone_number}
                                </span>}
                            <label className={styles.formLabel} htmlFor="phone_number">Phone number:</label>
                            <input
                                onBlur={checkFieldData}
                                onChange={onChange}
                                className={`${styles.formInput} ${formFieldErrors.phone_number ? styles.formFieldError : ""}`}
                                type="text" name='phone_number'
                                placeholder='Phone number...'
                                defaultValue={orderData['phone_number']} />
                        </div>

                        <div className={`${styles.formRow}`}>
                            {formFieldErrors.town &&
                                <span className={styles.formError}>{formFieldErrors.town}
                                </span>}
                            <label className={styles.formLabel} htmlFor="town">Town:</label>
                            <input
                                onBlur={checkFieldData}
                                onChange={onChange}
                                className={`${styles.formInput} ${formFieldErrors.town ? styles.formFieldError : ""}`}
                                type="text" name='town'
                                placeholder='Town...'
                                defaultValue={orderData['town']} />
                        </div>

                        <div className={`${styles.formRow}`}>
                            {formFieldErrors.address &&
                                <span className={styles.formError}>{formFieldErrors.address}
                                </span>}
                            <label className={styles.formLabel} htmlFor="address">Address:</label>
                            <input
                                onBlur={checkFieldData}
                                onChange={onChange}
                                className={`${styles.formInput} ${formFieldErrors.address ? styles.formFieldError : ""}`}
                                type="text" name='address'
                                placeholder='Address...'
                                defaultValue={orderData['address']} />
                        </div>

                        <div className={`${styles.formRow}`}>
                            {formFieldErrors.post_code &&
                                <span className={styles.formError}>{formFieldErrors.post_code}
                                </span>}
                            <label className={styles.formLabel} htmlFor="address">Post code:</label>
                            <input
                                onBlur={checkFieldData}
                                onChange={onChange}
                                className={`${styles.formInput} ${formFieldErrors.post_code ? styles.formFieldError : ""}`}
                                type="text" name='post_code'
                                placeholder='Post code...'
                                defaultValue={orderData['post_code']} />
                        </div>

                        <button className={styles.btn}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditOrderModal;