import {del, get, post} from './api';

const url = '/products/';

export const getAll = async (params) => {
    try{
        const data = await get(url, params);
        return data;
    } catch (e){
        throw new Error(e.msg)
    }
}

export const getBySlug = async (slug) => {
    try{
        const data = await get(url + slug);
        return data
    } catch (e){
        throw new Error(e.msg)
    }
}

export const getFavorites = async () => {
    const data = await get(url + 'favorites/');
    return data;
}

export const rateProduct = async (slug, score) => {
    try {
        const body = {score};
        const data = await post(url + slug + '/rate/', body);
        return data;
    } catch(e) {
        throw new Error(e);
    }
}

export const addToFavorites = async (slug) => {
    const data = await post(url + `favorites/${slug}/add/`);
    return data
}

export const removeFromFavorites = async (slug) => {
    const data = await del(url + `favorites/${slug}/remove/`);
    return data;
}