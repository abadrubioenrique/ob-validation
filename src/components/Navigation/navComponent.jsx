import React,{useContext} from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { types } from '../../types/types';
import { AuthContext } from '../../utils/Auth/authContext';


const Navcomponent = () => {
    const { user, dispatch } = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogout =()=>{
        dispatch({type: types.logout})
        navigate('/login',
        {
            replace:true
        });
    }
    return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient">
            <div className="container-fluid">
                <Link className="navbar-brand mb-0 h1 text-light" to ="/validation">ValidationProject</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <NavLink  className={ ({ isActive }) => 'nav-item nav-link text-dark' + (isActive ? 'active text-light ' : '') } to="/login">
                        Login</NavLink>
                        <NavLink  className={ ({ isActive }) => 'nav-item nav-link text-dark' + (isActive ? 'active text-light' : '') } to="/register">
                        Register</NavLink>

                        </div>
                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">

                    <span className="nav-item nav-link text-white-50">
                        {user.name}
                    </span>
                    
                    <button 
                        className="nav-item nav-link btn" 
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
</div>
    );
}

export default Navcomponent;
