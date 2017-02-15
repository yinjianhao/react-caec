function isLogin() {
    return localStorage.getItem('token');
}

export {
    isLogin
};