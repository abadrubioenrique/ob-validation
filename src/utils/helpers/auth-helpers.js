/* import axios from 'axios'; */

const TOKEN_KEY = 'access_token';

export function setToken(token){
    localStorage.setItem(TOKEN_KEY,token);
}

export function splitToken(){
    const authToken = window.location.pathname.split('/files/')[1];
    return authToken;
}

export function deleteToken(){
    localStorage.removeItem(TOKEN_KEY);
}
/* 
export function initAxiosInterceptors(){
    axios.interceptors.request.use(function(config){
        const token = getToken();

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    axios.interceptors.response.use(
        function(response){
            return response;
        },
        function(error){
            if(error.response.status ===401){
            }
        }
    )
} */