import { del, get, put} from './api'

export const getOrders = async () => {
    try {
        const data = await get('/orders/');
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

export const getOrderDetails = async (orderId) => {
    try{
        const data = await get(`/orders/details/${orderId}/`);
        return data;
    } catch(e) {
        throw new Error(e);
    }
}

export const editOrder = async (orderId, body) => {
    try {
        const data = await put(`/orders/edit/${orderId}/`, body);
        return data;
    } catch (e){
        throw new Error(e);
    }
}


export const deleteOrder = async (orderId) => {
    try{
        const data = await del(`/orders/delete/${orderId}`);
        return data;
    } catch(e) {
        throw new Error(e);
    }
}