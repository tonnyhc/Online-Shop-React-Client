import { get, post } from "./api"

const url = '/admin-panel'

export const fetchDashboard = async () => {
    try{
        const data = await get(url + '/dashboard');
        return data;
    } catch (e){
        throw e;
    }
}

export const addProduct = async (body) => {
    try{
        const data = await post(url + '/add-product/', body);
        return data;
    } catch(e){
        throw e
    }
}

export const fetchProductList = async () => {
    try{
        const data = await get(url + '/products/');
        return data;
    } catch(e){
        throw e;
    }
}