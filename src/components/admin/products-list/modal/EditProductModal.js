import { useContext, useRef, useState } from 'react';

import { updateProduct } from '../../../../services/adminServices';
import { AuthDataContext } from '../../../../contexts/AuthContext';
import { createFormData } from '../utils';

import styles from './EditProductModal.module.css';

const EditProductModal = ({
    closeModal,
    slug,

    brand,
    model,
    gender,
    product_price,
    discounted_price,
    images,
    category,
    is_published

}) => {
    const { userData } = useContext(AuthDataContext);
    const token = userData.token;
    const [formData, setFormData] = useState({
        'brand': brand,
        'model': model,
        'gender': gender,
        'product_price': product_price,
        'discounted_price': discounted_price,
        'category': category,
        'is_published': is_published,
        'images': [...images]
    });
    const [imgUrls, setImgUrls] = useState([...images]);

    const imgInputRef = useRef(null)

    const openInput = (e) => {
        imgInputRef.current.click();
    }

    const onChangeForm = (e) => {
        const field = e.target;
        if (field.type == 'checkbox') {
            return setFormData(oldData => ({
                ...oldData,
                'is_published': field.checked
            }))
        }
        setFormData(oldData => ({
            ...oldData,
            [field.name]: field.value
        }))
    }

    const onChangePicture = (e, action) => {
        e.preventDefault();
        if (action == 'add') {

            const newImages = [...e.target.files].map(file => ({
                'image_url': URL.createObjectURL(file)
            }));

            setImgUrls(oldImg => ([
                ...oldImg,
                ...newImages
            ]));

            return setFormData(oldData => ({
                ...oldData,
                images: [...images, [...e.target.files]]
            }));
        } else if (action == 'remove') {
            const image = e.target.parentElement.querySelector('img').src;
            setFormData(oldData => ({
                ...oldData,
                images: images.filter(img => img.image_url != image)
            }));
        }
    };

    const onSubmitEdit = async (e) => {
        e.preventDefault();
        if (!formData.brand || !formData.model || !formData.gender ||
            !formData.category || !formData.product_price || formData.images.length < 1) {
            return;
        }
        const body = createFormData(formData);
        try {
            const data = await updateProduct(slug, body, token);
            console.log(data);
        } catch(e){
            alert(e);
        }
    };



    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Edit product</h2>
                    <button onClick={closeModal} className="close-modal">&times;</button>
                </div>
                <div className="modal-content">

                    <form onSubmit={onSubmitEdit} method='post'>
                        <div className={styles.formRow}>
                            <div className={styles.inputWrapper}>
                                <label className={styles.formLabel} htmlFor="brand">Brand</label>
                                <input className={styles.formInput}
                                    value={formData.brand}
                                    name='brand'
                                    type="text"
                                    placeholder='Brand...'
                                    onChange={onChangeForm}
                                />

                            </div>

                            <div className={styles.inputWrapper}>
                                <label className={styles.formLabel} htmlFor="model">Model</label>
                                <input className={styles.formInput}
                                    value={formData.model}
                                    name='model'
                                    type="text"
                                    placeholder='Model...'
                                    onChange={onChangeForm}
                                />
                            </div>

                        </div>


                        <div className={styles.formRow}>
                            <div className={styles.inputWrapper}>

                                <label className={styles.formLabel} htmlFor="gender">Gender</label>
                                <select defaultValue={formData.gender} onChange={onChangeForm} className={`${styles.formInput} ${styles.genderSelect}`} name="gender" id="gender">
                                    <option value="Man">Man</option>
                                    <option value="Woman">Woman</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                            </div>

                            <div className={styles.inputWrapper}>
                                <label className={styles.formLabel} htmlFor="category">Category</label>
                                <select value={formData.category} onChange={onChangeForm} className={`${styles.formInput} ${styles.genderSelect}`} name="category" id="category">
                                    <option value="Sunglasses">Sunglasses</option>
                                    <option value="Lens">Lens</option>
                                    <option value="Prism">Prism</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputWrapper}>

                                <label className={styles.formLabel} htmlFor="product_price">Price</label>
                                <input className={styles.formInput}
                                    value={formData.product_price}
                                    name='product_price' type="number"
                                    placeholder='Price...'
                                    onChange={onChangeForm}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label className={styles.formLabel} htmlFor="discounted_price">Discounted Price</label>
                                <input className={styles.formInput}
                                    value={formData.discounted_price}
                                    name='discounted_price'
                                    type="number"
                                    placeholder='Discount...'
                                    onChange={onChangeForm}
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <label className={styles.formLabel} htmlFor="published">Publish on shop</label>
                            <input type="checkbox" onChange={onChangeForm} checked={formData.is_published} name='published' />
                        </div>

                        <div className={styles.formRow}>

                            <div className={styles.addFormItem}>
                                <label className={styles.formLabel} htmlFor="images">Images</label>
                                <div className={styles.imagesWrapper}>
                                    {imgUrls.length > 0 && imgUrls.map((image, index) => (
                                        <div key={index} className={styles.uploadedImage}>
                                            <img src={image.image_url} alt={`Selected Image ${index + 1}`} />
                                            <button onClick={(e) => onChangePicture(e, 'remove')} className={styles.uploadedImageRmvBtn}>X</button>
                                        </div>
                                    ))}

                                    <div onClick={openInput} className={styles.imageUpload}>
                                        <i className="fa-solid fa-cloud-arrow-up"></i>
                                        <p>Upload</p>
                                    </div>
                                    <input onChange={(e) => onChangePicture(e, 'add')} ref={imgInputRef} type="file" name='images' multiple />

                                </div>
                            </div>
                        </div>

                        <button className={styles.btn}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProductModal




{/* <div className="modal-overlay">
<div className="modal">
    <div className="modal-header">
        <h2>Edit product</h2>
        <button onClick={closeModal} className="close-modal">&times;</button>
    </div>
    <div className="modal-content">

        <form onSubmit={onSubmitEdit} method='post'>
            <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="brand">Brand</label>
                <input className={styles.formInput}
                    value={formData.brand}
                    name='brand'
                    type="text"
                    placeholder='Brand...'
                    onChange={onChangeForm}
                />
            </div>

            <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="model">Model</label>
                <input className={styles.formInput}
                    value={formData.model}
                    name='model'
                    type="text"
                    placeholder='Model...'
                    onChange={onChangeForm}
                />
            </div>

            <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="gender">Gender</label>
                <select defaultValue={formData.gender} onChange={onChangeForm} className={`${styles.formInput} ${styles.genderSelect}`} name="gender" id="gender">
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="Unisex">Unisex</option>
                </select>
            </div>

            <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="category">Category</label>
                <select value={formData.category} onChange={onChangeForm} className={`${styles.formInput} ${styles.genderSelect}`} name="category" id="category">
                    <option value="Sunglasses">Sunglasses</option>
                    <option value="Lens">Lens</option>
                    <option value="Prism">Prism</option>
                </select>
            </div>

            <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="product_price">Price</label>
                <input className={styles.formInput}
                    value={formData.product_price}
                    name='product_price' type="number"
                    placeholder='Price...'
                    onChange={onChangeForm}
                />
            </div>

            <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="discounted_price">Discounted Price</label>
                <input className={styles.formInput}
                    value={formData.discounted_price}
                    name='discounted_price'
                    type="number"
                    placeholder='Discount...'
                    onChange={onChangeForm}
                />
            </div>
            <div className={styles.formRow}>

                <div className={styles.addFormItem}>
                    <label className={styles.formLabel} htmlFor="images">Images</label>
                    <div className={styles.imagesWrapper}>
                        {imgUrls.length > 0 && imgUrls.map((image, index) => (
                            <div key={index} className={styles.uploadedImage}>
                                <img src={image.image_url} alt={`Selected Image ${index + 1}`} />
                                <button onClick={(e) => onChangePicture(e, 'remove')} className={styles.uploadedImageRmvBtn}>X</button>
                            </div>
                        ))}

                        <div onClick={openInput} className={styles.imageUpload}>
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            <p>Upload</p>
                        </div>
                        <input onChange={(e) => onChangePicture(e, 'add')} ref={imgInputRef} type="file" name='images' multiple />

                    </div>
                </div>
            </div>

            <button className={styles.btn}>Save</button>
        </form>
    </div>
</div>
</div>
) */}