import { useState } from 'react';
import { updateAccountDetails } from '../../services/accountServices';

import styles from './EditProfileModal.module.css';

const EditProfileModal = ({
    full_name,
    gender,
    birth_year,
    handleCloseModal,
    changeProfileData,
}) => {

    const [modalData, setModalData] = useState({
        full_name,
        birth_year,
        gender
    });

    const [formFieldErrors, setFormFieldErrors] = useState({
        'fullName': '',
        'birth_year': ""
    })

    const onChangeHandler = (e) => {
        let field = e.target;
        let value = field.value;

        if (field.type == 'radio') {
            value = field.id == 'man' ? "Man" : "Woman"
        }
        if (field.name == "fullName") {
            field = 'full_name'
        } else if (field.name == 'gender') {
            field = 'gender'
        } else {
            field = 'birth_year'
        }

        setModalData(oldData => {
            return {
                ...oldData,
                [field]: value
            }
        })
    }

    const checkFieldData = (e) => {
        const field = e.target;

        if (field.name == 'fullName' && !field.value && field.value == "") {
            return setFormFieldErrors(oldErrors => {
                return {
                    ...oldErrors,
                    fullName: "This field is required"
                }
            })
        } else {
            setFormFieldErrors(oldErrors => {
                return {
                    ...oldErrors,
                    fullName: ""
                }
            })
        }

        if (field.name == "birthYear" && !field.value || field.value == ""){
            return setFormFieldErrors(oldErrors => {
                return {
                    ...oldErrors,
                    birth_year: "This field is required"
                }
            })
        } else {
            setFormFieldErrors(oldErrors => {
                return {
                    ...oldErrors,
                    birth_year: ""
                }
            })
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!modalData.full_name || !modalData.birth_year || !modalData.gender){
            return
        }

        const body = {
            full_name: modalData['full_name'],
            birth_year: modalData['birth_year'],
            gender: modalData['gender'],
        }
        const data = await updateAccountDetails(body);
        setModalData(data);
        changeProfileData(data);
        handleCloseModal();
        return data;
        

    }


    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Manage your personal data</h2>
                    <button onClick={handleCloseModal} className="close-modal">&times;</button>
                </div>
                <div className="modal-content">
                    <form className={styles.modalForm} onSubmit={onSubmit}>

                        <div className={`${styles.formRow} ${styles.gender}`}>
                            <label className={styles.formLabel} htmlFor="gender">Gender: </label>
                            <div className={styles.genderRow}>
                                <div>
                                    <label htmlFor="man">Man</label>
                                    <input onChange={onChangeHandler} id='man' type="radio" name='gender' checked={modalData.gender == 'Man'} />
                                </div>
                                <div>
                                    <label htmlFor="woman">Woman</label>
                                    <input onChange={onChangeHandler} id='woman' type="radio" name='gender' checked={modalData.gender == 'Woman'} />
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.formRow}`}>
                            {formFieldErrors.fullName && 
                            <span className={styles.formError}>{formFieldErrors.fullName}
                            </span>}
                            <label className={styles.formLabel} htmlFor="fullName">Full name:</label>
                            <input
                                onBlur={checkFieldData}
                                onChange={onChangeHandler}
                                className={`${styles.formInput} ${formFieldErrors.fullName ? styles.formFieldError : ""}`}
                                type="text" name='fullName'
                                placeholder='Full name...'
                                defaultValue={modalData['full_name']} />
                        </div>

                        <div className={`${styles.formRow}`}>
                            {formFieldErrors['birth_year'] && 
                            <span className={styles.formError}>{formFieldErrors['birth_year']}
                            </span>}
                            <label className={styles.formLabel} htmlFor="birthYear">Birth year:</label>
                            <input 
                            onBlur={checkFieldData} 
                            onChange={onChangeHandler} 
                            className={`${styles.formInput} ${formFieldErrors.birth_year ? styles.formFieldError : ""}`} 
                            type="date" 
                            name='birthYear' 
                            defaultValue={birth_year} />
                        </div>

                        <button className={styles.btn}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfileModal