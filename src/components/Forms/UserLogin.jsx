import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../Styles/userRegister.scss';
import { setToken } from '../../utils/helpers/auth-helpers';
import { login } from '../../utils/Auth/JWTAuth';

const UserLogin = () => {
    const [requestError, setRequestError] = useState('');
    const [isLogging, setIsLogging] = useState(false);
    const navigate = useNavigate();
    const API_URL = 'https://obvalid4.herokuapp.com';
   
    const [datos, setDatos] = useState(
        {
            data:[],
            form:{
                username:'',
                password:''
            }
        }
    );

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
        setRequestError('');
        login({username:datos.form.username,
            password:datos.form.password}).catch(error=>{
                    setRequestError("Hubo un error, compruebe su email y contraseña");
                    console.log("Error: " + error.message);
            })
            setIsLogging(true);
            setTimeout(function(){window.location.reload(true);}, 3000);
            


        
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
            </form>
            
            </>
        )}


export default UserLogin;
