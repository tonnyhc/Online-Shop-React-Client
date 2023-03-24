import {del, get, post, put} from './api';


const url = '/basket/'
const orderUrl = '/orders/'

export const getBasket = async (username) => {
    try {
        const data = await get(url + username + '/');
        return data;
    } catch(e) {
        throw new Error(e);
    }
}

export const addToBasket = async (slug, csrfToken) => {
    try{
        const data = await post(`${url}add-to-basket/${slug}/`, csrfToken);
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

export const removeFromBasket = async (slug, body, csrfToken) => {
    try{
        const data = await del(`${url}remove-from-basket/${slug}/`, body, csrfToken);
        return data
    } catch(e){
        throw new Error(e);
    }

}

export const createOrder = async (body, csrfToken) => {
    try{
        const data = await post(`${orderUrl}create/`, body, csrfToken);
        return data;
    } catch(e) {
        throw new Error(e)
    }
}

export const updateBasketItemQuantity = async (slug, body, csrfToken) => {
    try{
        const data = await post(`${url}update-quantity/${slug}/`, body, csrfToken);
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

export const applyDiscountRequest = async(body) => {
    try{
        const data = await post(`${url}apply-discount/`, body);
        return data;
    } catch(e) {
        throw new Error(e);
    }
}

export const removeDiscountRequest = async () => {
    try{ 
        const data = await post(`${url}remove-discount/`);
        return data;
    } catch(e){
        throw new Error(e);
    }
}