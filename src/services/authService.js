import * as requester from "./api"

export const userLogin = (loginData) => {
    return requester.post('/accounts/sign-in/', loginData)

}