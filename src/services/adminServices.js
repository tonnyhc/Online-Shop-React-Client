import { get, del } from "./api"

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
    try{
        const data = await del(url + `/products/${slug}/delete/`);
        return data;
    } catch(e){
        throw e
    }
}