import axios from 'axios';
const API_URL = "https://obvalid4.herokuapp.com";

const login = async (data) => {
    const LOGIN_ENDPOINT = `${API_URL}/api/auth/login`;

    try {

        let response = await axios.post(LOGIN_ENDPOINT, data);

        if(response.status === 200 && response.data.token){
            let jwt = response.data.token;

            localStorage.setItem("access_token", jwt);

        }


    } catch(e){
        console.log(e);
    }
    console.log("Estamos en login");
}

const register = async (data) => {
    const SIGNUP_ENDPOINT = `${API_URL}/api/auth/register`;
    try {
        let response = await axios({
            method: 'post',
            responseType: 'json',
            url: SIGNUP_ENDPOINT,
            data: data
          });
    } catch(e){
        console.log(e);
    }
    console.log("Estamos en registro");
}

const logout = () => {
    localStorage.removeItem("access_token");
    console.log("Logout");
}

export { login, register, logout } 