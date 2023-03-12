import { get, put } from "./api"



export const getAccountDetails = async () => {
    try {
    const data = await get('/accounts/myaccount')
    return data;
    } catch (e) {
        throw new Error(e);
    }
}

export const updateAccountDetails = async (body) => {
    try{
        const data = await put('/accounts/myaccount/edit', body);
        return data;
    } catch (e){
        throw new Error(e);
    }
}