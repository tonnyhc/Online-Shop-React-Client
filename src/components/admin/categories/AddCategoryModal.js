import { useState } from 'react';
import { addCategory } from '../../../services/adminServices';

import styles from './CategoriesList.module.css';

const AddCategoryModal = ({
    openModal,
    closeModal,
    addCategoryToState
}) => {
    const [categoryName, setCategoryName] = useState('');
    const [modalErrors, setModalErrors] = useState('');

    const checkField = (e) => {
        const value = e.target.value;

        if (!value) {
            setModalErrors('This field is required');
        } else if (value.length < 3) {
            setModalErrors('Category name must be longer that 3 characters');
        }
        else if (value.length > 20){
            setModalErrors("Category name can't be more than 20 characters")
        } else{
            setModalErrors('');
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName || categoryName.length < 3 || categoryName.length > 20){
            return;
        };
        try{
            const body = {
                'category': categoryName 
            }
            const data = await addCategory(body);
            addCategoryToState(data);
            closeModal('addModal');
            return data;
        } catch(e){
            alert(e)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add new category</h2>
                    <button onClick={() => closeModal('addModal')} className="close-modal">&times;</button>
                </div>
                <div className="modal-content">
                    <form onSubmit={onSubmit} method='post'>
                        <div className={styles.formRow}>
                            <div className={styles.inputWrapper}>
                                {modalErrors && <p className={styles.formError}>{modalErrors}</p>}
                                <input className={`${styles.formInput} ${modalErrors && styles.formFieldError}`}
                                    name='category'
                                    type="text"
                                    maxLength={20}
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    onBlur={checkField}
                                    placeholder='Category name...'
                                />
                            </div>
                        </div>
                        <button className={styles.btn}>Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCategoryModal