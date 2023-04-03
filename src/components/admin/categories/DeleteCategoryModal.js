import { fontWeight } from '@mui/system';
import { deleteCategory } from '../../../services/adminServices';
import styles from './CategoriesList.module.css';

const DeleteCategoryModal = ({
    categoryName,
    categoryId,
    closeModal,
    removeCategoryFromState
}) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const {confirmation} = Object.fromEntries(new FormData(e.target));
        if (confirmation !== "DELETE"){
            return;
        };
        try{

            const data = await deleteCategory(categoryId);
            removeCategoryFromState(categoryId);
            closeModal('deleteModal');
            return data;
        } catch(e){
            alert(e);
        }

    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Delete category - {categoryName}</h2>
                    <button onClick={() => closeModal('deleteModal')} className="close-modal">&times;</button>
                </div>
                <div className="modal-content">
                    <p
                    style={{
                        color: "firebrick",
                        fontWeight: 500
                    }}>Please type "DELETE" in the field bellow</p>
                    <form onSubmit={onSubmit}>
                        <div className={styles.formRow}>
                            <div className={styles.inputWrapper}>
                                <input className={styles.formInput}
                                    name='confirmation'
                                    type="text"
                                    placeholder='Type here...'
                                />
                            </div>
                        </div>
                        <button className={styles.btn}>Delete category</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default DeleteCategoryModal;