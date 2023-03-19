import * as requester from "./api"

export const login = async (loginData) => {
    try{
        const data = await requester.post('/accounts/sign-in/', loginData);
        return data;
    } catch (e){
        throw new Error(e);
    }
}

export const register = async (registerData) => {
    try{
        const data = await requester.post('/accounts/sign-up/', registerData);
        return data
    } catch(e){
        throw new Error(e);
    }
}

export const logout = (token) => {
    const data =  requester.get('/accounts/sign-out/', token);
    return data;
}