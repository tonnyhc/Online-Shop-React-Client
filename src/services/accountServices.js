import { get } from "./api"



export const getAccountDetails = async () => {
    try {
    const data = await get('/accounts/myaccount')
    return data;
    } catch (e) {
        throw new Error(e);
    }
}