import axiosConfig from '../utils/config/axios.config';

const login = (username, password) => {
    return axiosConfig
        .post('auth/login', {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('TOKEN_KEY', JSON.stringify(response.data.token));
            }

            return response.data;
        });
};

const getUserInfo = (token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return axiosConfig
        .get('whoami', { headers })
        .then((response) => {
            if (response.data) {
                localStorage.setItem('USER_INFO', JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('TOKEN_KEY');
};

const removeUserInfo = () => {
    localStorage.removeItem('USER_INFO');
};

const userService = {
    login,
    logout,
    getUserInfo,
    removeUserInfo
};

export default userService;
