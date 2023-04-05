import { get, del, post } from "./api"

const url = '/admin-panel'

export const fetchDashboard = async () => {
    try {
        const data = await get(url + '/dashboard');
        return data;
    } catch (e) {
        throw e;
    }
};

export const addProduct = async (body, token) => {
    try {
        const data = await fetch('http://localhost:8000/api/admin-panel/add-product/', {
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
            },
            body
        });
        return data;
    } catch (e) {
        throw e;
    }
};

export const fetchProductList = async () => {
    try {
        const data = await get(url + '/products/');
        return data;
    } catch (e) {
        throw e;
    }
};


export const deleteProduct = async (slug) => {
    try {
        const data = await del(url + `/products/${slug}/delete/`);
        return data;
    } catch (e) {
        throw e
    }
};

export const updateProduct = async (slug, body, token) => {
    try {
        const data = await fetch(`http://localhost:8000/api` + url + `/products/${slug}/edit/`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`,
            },
            body
        });
        return data;
    }
    catch (e) {
        throw e
    }
};


export const getCategories = async () => {
    try {
        const data = await get(url + '/products/categories');
        return data;
    } catch (e) {
        throw e
    }
};


export const addCategory = async (body) => {
    try {
        const data = await post(url + '/products/categories/create/', body);
        return data
    } catch (e) {
        throw e
    }
};


export const deleteCategory = async (id) => {
    try {
        const data = await del(url + `/products/categories/delete/${id}`);
        return data;
    } catch (e) {
        throw e
    }
}


export const fetchOrders = async () => {
    try{
        const data = await get(url + '/orders/');
        return data;
    } catch(e){
        throw e;
    }
}


export const getOrderDetails = async (orderId) => {
    try{
        const data = await get(url + `/orders/${orderId}/`);
        return data;
    } catch(e){
        throw e
    }
}