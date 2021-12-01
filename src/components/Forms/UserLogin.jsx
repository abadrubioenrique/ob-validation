import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../store/slices/auth';
import '../Styles/userRegister.scss';

const UserLogin = () => {
    const [requestError, setRequestError] = useState('');
    /* const [isLogging, setIsLogging] = useState(false); */
    const dispatch = useDispatch();
    const isLogging = useSelector((state) => state.auth.isLoggedIn)
    const [datos, setDatos] = useState(
        {
            data: [],
            form: {
                username: '',
                password: ''
            }
        }
    );

    const handleChange = async e => {
        e.persist();
        await setDatos({
            form: {
                ...datos.form,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = async e => {

        e.preventDefault();
        setRequestError('');
        let username = datos.form.username;
        let password = datos.form.password
        dispatch(login({ username, password }))
            .unwrap()
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                setRequestError("Hubo un error, compruebe su email y contraseña.");
            });
    }
    const { form } = datos;

    return (
        <>
            {
                !isLogging ?
                    <>
                        <h1>Login de Usuarios</h1>
                        <form onSubmit={handleSubmit} className="formulario shadow">

                            <label htmlFor="id">Usuario</label>
                            <input className="form-control" maxLength="50" type="email" name="username" id="username" required onChange={handleChange} value={form ? form.username : ''} />

                            <label htmlFor="username">Contraseña</label>
                            <input className="form-control" type="password" name="password" id="password" required onChange={handleChange} value={form ? form.password : ''} />
                            <button type="submit">Enviar</button>
                            {(requestError === ('') && isLogging === true) ?
                                (<p className="success">Login Correcto.</p>)
                                : (<p className="error">{requestError}</p>)}
                        </form>
                    </> : <div style={{ margin: '3rem', display: 'flex', justifyContent: 'center' }} >
                        <p className="success" style={{ display: 'inline-block' }}>Login Correcto. Para seguir el proceso de validación dirigase a <Link to="/validation/pass">Validación</Link></p>
                    </div>
            }


        </>
    )
}


export default UserLogin;
