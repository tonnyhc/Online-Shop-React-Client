import { useState } from 'react';

import styles from './EditProfileModal.module.css';

const EditProfileModal = ({
    userinfo,
    gender,
    birth_year,
    handleCloseModal,
}) => {

    const [modalData, setModalData] = useState({
        full_name : userinfo['full_name'],
        birth_year,
        gender
    });

    const onChangeHandler = (e) => {
        let field = e.target;
        let value = field.value;

        if (field.type == 'radio'){
            value = field.id == 'man' ? "Man" : "Woman"
        }
        if (field.name == "fullName"){
            field = 'full_name'
        } else if (field.name == 'gender'){
            field = 'gender'
        } else{
            field = 'birth_year'
        }

        setModalData(oldData => {
            return {
                ...oldData,
                [field]: value
            }
        })
    }


    return (
        <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Manage your personal data</h2>
                            <button onClick={handleCloseModal} className="close-modal">&times;</button>
                        </div>
                        <div className="modal-content">
                            <form className={styles.modalForm}>

                                <div className={`${styles.formRow} ${styles.gender}`}>
                                    <label className={styles.formLabel} htmlFor="gender">Gender: </label>
                                    <div className={styles.genderRow}>
                                        <div>
                                            <label htmlFor="man">Man</label>
                                            <input onChange={onChangeHandler} id='man' type="radio" name='gender' checked={modalData.gender == 'Man'} />
                                        </div>
                                        <div>
                                            <label htmlFor="woman">Woman</label>
                                            <input onChange={onChangeHandler} id='woman' type="radio" name='gender' checked={modalData.gender == 'Woman'}/>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.formRow}`}>
                                    <label className={styles.formLabel} htmlFor="fullName">Full name:</label>
                                    <input onChange={onChangeHandler} className={styles.formInput} type="text" name='fullName' placeholder='Full name...' defaultValue={modalData['full_name']}/>
                                </div>

                                <div className={`${styles.formRow}`}>
                                    <label className={styles.formLabel} htmlFor="birthYear">Birth year:</label>
                                    <input onChange={onChangeHandler} className={styles.formInput} type="date" name='birthYear' defaultValue={birth_year} />
                                </div>
                                
                                <button className={styles.btn}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
    );
}

export default EditProfileModal