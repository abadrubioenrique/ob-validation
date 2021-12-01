import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Styles/userRegister.scss';
import { login } from '../../utils/Auth/JWTAuth';

const UserLogin = () => {
    const [requestError, setRequestError] = useState('');
    const [isLogging, setIsLogging] = useState(false);
    const dispatch = useDispatch();
   
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
        dispatch(login({ username, password }))
        .unwrap()
        .then(() => {
          props.history.push('/profile');
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
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
            {(requestError===('') && isLogging ===true) ? 
                (<p className="success">Login Correcto. Para seguir el proceso de validación dirigase a <Link to="/validation/pass">Validación</Link></p>)
                :(<p className="error">{requestError}</p>) }
            </form>
            
            </>
        )}


export default UserLogin;
