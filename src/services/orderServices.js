import { get } from './api'

export const getOrders = async () => {
    try {
        const data = await get('/orders/');
        return data;
    } catch (e) {
        throw new Error(e);
    }
}
