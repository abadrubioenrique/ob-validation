import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios";
import '../Styles/userRegister.scss';
import { login, register, logout } from '../../utils/Auth/JWTAuth';
import { useNavigate } from 'react-router-dom';




const UserLogin = () => {
    const [formulario, setFormulario] = useState(false);
    const [token, setToken] = useState('');
    const [requestError,setRequestError] = useState();
    const navigate = useNavigate();
    const [datos, setDatos] = useState(
        {
            data:[],
            form:{
                username:'',
                password:''
            }
        }
    );
    useEffect(() => {
        if(token !== ''){
            console.log("Token = " + token);
        }
        
    },[token])
    const ApiUrl="https://obvalid4.herokuapp.com/api/auth/login";


    const peticionPost=()=>{
        axios.post(ApiUrl,
                {
                    username:datos.form.username,
                    password:datos.form.password
                })
                .then(response=>{
                    if(response.status === 200 && response.data.token){
                        let jwt = response.data.token;

                        localStorage.setItem("access_token", jwt);
                        setToken(jwt);
            
                    }
                }).catch(error=>{
                    setRequestError(error.message);
                    })       

        }
       
   

       
    const handleChange=async e=>{
        e.persist();
        await setDatos({
            form:{
            ...datos.form,
            [e.target.name]: e.target.value  
            }
        });
        }
      
    const handleSubmit=async e=>{
        e.preventDefault();
        peticionPost();
       

        }

        const {form}=datos;

    return (
            <>
            <h1>Login de Usuarios</h1>
            <form onSubmit={handleSubmit} className="formulario shadow">

            <label htmlFor="id">Usuario</label>
            <input className="form-control" maxLength="50" type="email" name="username" id="username" required onChange={handleChange} value={form?form.username: ''}/>

            <label htmlFor="username">Contraseña</label>
            <input className="form-control" type="password" name="password" id="password" required onChange={handleChange} value={form?form.password: ''}/>
            <button type="submit" >Enviar</button>
            <p>{requestError}</p>
            </form>
            </>
        )}


export default UserLogin;
