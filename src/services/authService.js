import * as requester from "./api"

export const login = (loginData) => {
    return requester.post('/accounts/sign-in/', loginData);
}

export const register = (registerData) => {
    return requester.post('/accounts/sign-up/', registerData)
}

export const logout = (token) => {
    const data =  requester.get('/accounts/sign-out/', token);
    console.log(data);
    return data;
}