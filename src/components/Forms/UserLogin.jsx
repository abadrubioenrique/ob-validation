import React, {useState, useEffect} from 'react';
import axios from "axios";
import '../Styles/userRegister.scss';
import { login, register, logout } from '../../utils/Auth/JWTAuth';

const UserLogin = () => {
    const [token, setToken] = useState('');
    const [requestError, setRequestError] = useState('');
    const [isLogging, setIsLogging] = useState(false);
    
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

        login({username:datos.form.username,
            password:datos.form.password}).then(setRequestError('')).catch(error=>{
                if(error.response.status ===401){
                    setRequestError("Usuario o contraseña incorrectos");
                }else{
                    setRequestError(error.message);
                }
            });
        setIsLogging(true);

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
            <button type="submit">Enviar</button>
            {(requestError===('') && isLogging ===true) ? (<p className="success">Login Correcto</p>):(<p className="error">{requestError}</p>) }
            <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
            </form>
            
            </>
        )}


export default UserLogin;
