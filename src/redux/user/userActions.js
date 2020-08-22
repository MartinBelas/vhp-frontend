export const loginAction = loginData => {
    return {
        type: "user/login",
        payload: loginData
    }
}

export const logoutAction = () => {
    return {
        type: "user/logout",
        payload: ""
    }
}
