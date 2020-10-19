import cookie from 'js-cookie';

export const setCookie = (key, value) => {
    if (window !== "undefiend") {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

export const removeCookie = (key) => {
    if (window !== "undefiend") {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key) => {
    if (window !== "undefiend") {
        return cookie.get(key)
    }
};

export const setLocalStorage = (key, value) => {
    if (window !== "undefiend") {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = (key) => {
    if (window !== "undefiend") {
        localStorage.removeItem(key)
    }
};


//Auth user after login
export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next();
};

//Get user info from localstorage
export const isAuth = () => {
    if (window !== 'undefiend') {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
}

export const updateUser = (response, next) => {
    if (window !== 'undefiend') {
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next();
};