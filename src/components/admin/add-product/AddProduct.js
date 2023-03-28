import { useState } from 'react';
import { useRef } from 'react';
import { addProduct } from '../../../services/adminServices';
import styles from './AddProduct.module.css'

const AddProduct = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState({
        'brand': "",
        'model': "",
        'productId': "",
        'category': "",
        'gender': "",
        'price': "",
        'images': [],
        'publish': "",
    });

    const [formErrors, setFormErrors] = useState({
        'global': "",
        'brand': "",
        'model': "",
        'productId': "",
        'category': "",
        'price': "",
        'images': ""
    })

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    }

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                imagesArray.push(reader.result);
                console.log(imagesArray);
                setSelectedImages(oldImages => ([...oldImages, ...imagesArray]));

            };
            setFormData(oldData => ({
                ...oldData,
                'images': [...oldData.images, file]
            }));
        }
    }

    const checkFieldsOnBlur = (e) => {
        const field = e.target;
        const value = field.value;
        if (!value || value == "") {
            setFormErrors(oldErrors => ({
                ...oldErrors,
                [field.name]: "This field is required"
            }))
        } else {
            setFormErrors(oldErrors => ({
                ...oldErrors,
                [field.name]: ""
            }));
        }
    }

    const handleFormDataChange = (e) => {
        const field = e.target
        setFormData(oldData => ({
            ...oldData,
            [field.name]: field.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const body = new FormData();
        const { brand, model, price, productId, category, gender, images } = { ...formData };

        if (!brand || !model || !price || !productId || !category || !gender || !images) {
            setFormErrors(oldErorrs => ({
                ...oldErorrs,
                global: "You need to fill all fields"
            }));
            return
        }

        body.set('brand', brand);
        body.set('model', model);
        body.set('product_price', price);
        body.append('product_id', productId);
        body.append('category', category);
        body.append('gender', gender);

        for (let image of images) {
            body.append('images', image);
        }

        try {
            const data = await fetch('http://localhost:8000/api/admin-panel/add-product/', {
                method: 'POST',
                headers: {
                    Authorization: "Token 519ad8d797aaa8bae758ccbacf59eedd0f971e84",
                },
                body
            });
            setFormData({
                'brand': "",
                'model': "",
                'productId': "",
                'category': "",
                'gender': "",
                'price': "",
                'images': [],
                'publish': "",
            })
            const a = 5
        } catch (e) {
            alert(e);
        }
    }


    return (
        <section className={styles.addProductSection}>
            <h2>Add Product</h2>

            <div className={styles.addForm}>
                <form enctype='multipart/form-data' onSubmit={onSubmit} method='post'>
                    {formErrors.global && <p className={styles.error}>{formErrors.global}</p>}
                    <div className={styles.addFormItem}>
                        <label htmlFor="brand">Product brand</label>
                        <input
                            type="text"
                            className={formErrors.brand && `${styles.inputError}`}
                            name='brand'
                            placeholder="Brand..."
                            value={formData.brand}
                            onBlur={checkFieldsOnBlur}
                            onChange={handleFormDataChange} />
                    </div>

                    <div className={styles.addFormItem}>
                        <label htmlFor="model">Product model</label>
                        <input
                            type="text"
                            className={formErrors.model && `${styles.inputError}`}
                            name='model'
                            placeholder="Model..."
                            value={formData.model}
                            onBlur={checkFieldsOnBlur}
                            onChange={handleFormDataChange} />
                    </div>

                    <div className={styles.categoryWrapper}>

                        <div className={styles.addFormItem}>
                            <label htmlFor="productId">Product Id</label>
                            <input
                                type="text"
                                className={formErrors.productId && `${styles.inputError}`}
                                name='productId'
                                placeholder="Product id..."
                                maxLength={25}
                                value={formData.productId}
                                onBlur={checkFieldsOnBlur}
                                onChange={handleFormDataChange} />
                        </div>

                        <div className={styles.addFormItem}>
                            <label htmlFor="gender">Gender</label>
                            <select onChange={handleFormDataChange} name="gender" id="gender">
                                <option value=''>------</option>
                                <option value="Man">Man</option>
                                <option value="Woman">Woman</option>
                            </select>
                        </div>


                    </div>

                    <div className={`${styles.addFormItem} ${styles.categoryWrapper}`}>

                        <div>
                            <label htmlFor="category">Category</label>
                            <select onChange={handleFormDataChange} name="category" id="category">
                                <option value="">------</option>
                                <option value="Sunglasses">Sunglasses</option>
                                <option value="Lens">Lens</option>
                                <option value="Prism">Prism</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="price">Price</label>
                            <input
                                value={formData.price}
                                className={formErrors.price && `${styles.inputError}`}
                                onChange={handleFormDataChange}
                                onBlur={checkFieldsOnBlur}
                                type="number" name='price'
                                placeholder="Price..." />
                        </div>

                    </div>

                    <div className={styles.addFormItem}>
                        <label htmlFor="images">Images</label>
                        <div className={styles.imagesWrapper}>
                            {selectedImages.length > 0 && selectedImages.map((image, index) => (
                                <div key={index} className={styles.uploadedImage}>
                                    <img src={image} alt={`Selected Image ${index + 1}`} />
                                </div>
                            ))}

                            <div onClick={handleUploadClick} className={styles.imageUpload}>
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                                <p>Upload</p>
                            </div>
                            <input onChange={handleFileInputChange} ref={fileInputRef} type="file" name='images' multiple />

                        </div>
                    </div>

                    <div className={styles.publishWrapper}>
                        <input name='publish' type="checkbox" />
                        <label htmlFor="publish">Publish in shop</label>
                    </div>

                    <button>Add product</button>

                </form>
            </div>

        </section>
    );
}


export default AddProduct;