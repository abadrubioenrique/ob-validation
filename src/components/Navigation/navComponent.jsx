import { useState,useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/Auth/JWTAuth';
import { getToken } from '../../utils/helpers/auth-helpers';
import axios from 'axios';

import './navigation.scss';
const Navcomponent = () => {
    const navigate = useNavigate();
    const API_URL = 'https://obvalid4.herokuapp.com';
    const [usuario,setUsuario]= useState(null);
    const [cargandoUsuario, setCargandoUsuario] = useState(true);
    const handleLogout =()=>{
        navigate('/login',
        {
            replace:true
        });
        logout();
        setUsuario(null);
    }


    useEffect(() => {
        async function cargarUsuario(){
            if(!getToken()){
                setCargandoUsuario(false);
                console.log("No hay token")
                return;
            }
            try{
                const {data: usuario} = await axios.get(API_URL + '/api/whoami');
                setUsuario(usuario);
                console.log(JSON.stringify(usuario));
                setCargandoUsuario(false);
            }catch(error){
                console.log(error);
            }
    }
        cargarUsuario();
       
    }, []);
    return (
    <div>
    {usuario!=null ?
        <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient">
            <div className="container-fluid">
                <Link className="navbar-brand mb-0 h1 text-light validation" to ="/">ValidationProject</Link>

                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                <span className="nav-item nav-link text-white-50">
                   Bienvenido {usuario.name + " " + usuario.surname}
                </span>
                    <button 
                        className="nav-item nav-link btn logout" 
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
               
                :
                <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient">
            <div className="container-fluid">
                <div className="navbar-brand mb-0 h1 text-light" >ValidationProject</div>
                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                    <NavLink  className={ ({ isActive }) => 'nav-item nav-link text-dark' + (isActive ? 'active text-light' : '') } to="/register">
                        Register</NavLink>
                    <NavLink  className={ ({ isActive }) => 'nav-item nav-link text-dark' + (isActive ? 'active text-light ' : '') } to="/login">
                        Login</NavLink>


            </div>
        </nav>
            }
        
</div>
    );
}

export default Navcomponent;
