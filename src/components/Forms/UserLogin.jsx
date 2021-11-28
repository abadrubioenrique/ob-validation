import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../Styles/userRegister.scss';
import { login } from '../../utils/Auth/JWTAuth';
import { types } from '../../types/types';
import { AuthContext } from '../../utils/Auth/authContext';

const UserLogin = () => {
    const [token, setToken] = useState('');
    const [requestError, setRequestError] = useState('');
    const [isLogging, setIsLogging] = useState(false);
    //NAVIGATE
    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext);


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

        login({username:datos.form.username,
            password:datos.form.password}).then(setRequestError('')).catch(error=>{
                if(error.response.status ===401){
                    setRequestError("Usuario o contraseña incorrectos");
                }else{
                    setRequestError(error.message);
                }
            });
        setIsLogging(true);
        
        const action = {
            type : types.login,
            payload:{name : datos.form.username,
            }
        }
        dispatch(action);
        navigate('/', {
            replace: true
        });
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
