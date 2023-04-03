import { useState } from 'react';
import AddCategoryModal from './AddCategoryModal';

import styles from './CategoriesList.module.css'
import DeleteCategoryModal from './DeleteCategoryModal';

const CategoriesList = ({
    categories,
    addCategoryToState,
    removeCategoryFromState
}) => {
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState({
        'active': false,
        'id': '',
        'name': ''
    });

    const openModal = (e, modalName) => {
        if (modalName == 'addModal') {
            setAddModal(true);
        } else if (modalName == 'deleteModal') {
            const categoryId = e.target.id;
            const category = categories.filter(category => category.id == categoryId)[0];

            setDeleteModal({
                'active': true,
                'id': category.id,
                'name': category.category
            });
        };
    }

    const closeModal = (modalName) => {
        if (modalName == 'addModal') {
            setAddModal(false);
        } else if (modalName == 'deleteModal') {
            setDeleteModal({
                'active': false,
                'id': '',
                'name': '',
            });
        };
    };

    return (
        <>
            {addModal && <AddCategoryModal
                addCategoryToState={addCategoryToState}
                openModal={openModal}
                closeModal={closeModal}
            />}

            {deleteModal.active && <DeleteCategoryModal
                categoryName={deleteModal.name}
                categoryId={deleteModal.id}
                removeCategoryFromState={removeCategoryFromState}
                openModal={openModal}
                closeModal={closeModal}
            />}

            <div className={styles.categoriesHeader}>
                <h2>Categories List</h2>
                <button onClick={(e) => openModal(e, 'addModal')}>
                    <i className="fa-solid fa-plus"></i>
                    Create new
                </button>
            </div>
            <div className={styles.categoriesSection}>
                <table>
                    <thead>
                        <th>#id</th>
                        <th>Category name</th>
                        <th>Products count</th>
                        <th>Delete</th>
                    </thead>

                    <tbody>
                        {categories.map(category =>
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.category}</td>
                                <td>{category.total_products}</td>
                                <td>
                                    <button id={category.id} onClick={(e) => openModal(e, 'deleteModal')} className={styles.deleteBtn}>
                                        <i className="fa-solid fa-trash"></i>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CategoriesList