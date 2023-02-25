import {get} from './api';

const url = '/products/';

export const getAll = async () => {
    try{
        const data = await get(url);
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