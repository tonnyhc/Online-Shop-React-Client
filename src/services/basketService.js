import {del, get, post} from './api';


const url = '/basket/'

export const getBasket = async (username) => {
    try {
        const data = await get(url + username + '/');
        return data;
    } catch(e) {
        throw new Error(e);
    }
}

export const addToBasket = async (slug, body, csrfToken) => {
    try{
        const data = await post(`${url}add-to-basket/${slug}/`, body, csrfToken);
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