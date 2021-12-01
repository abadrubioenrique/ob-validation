import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/auth';
import { removeUserInfo } from '../../store/slices/user';

import './navigation.scss';
const Navcomponent = ({isLoggedIn}) => {
    console.log(isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let userInfo = null;
    userInfo = useSelector((state) => state.user.userInfo);
    
    const handleLogout = () => {
      dispatch(logout());
      dispatch(removeUserInfo());
      navigate('/');
    };


    return ( 
        <div>
            {userInfo != null ?
                <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient">
                    <div className="container-fluid">
                        <Link className="navbar-brand mb-0 h1 text-light validation" to="/">ValidationProject</Link>

                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                        <ul className="navbar-nav ml-auto">
                            <span className="nav-item nav-link text-white-50">
                                Bienvenido {userInfo.name + " " + userInfo.surname}
                            </span>
                            <button
                                className="nav-item nav-link btn logout"
                                onClick={handleLogout}
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
                        <NavLink className={({ isActive }) => 'nav-item nav-link text-dark' + (isActive ? 'active text-light' : '')} to="/register">
                            Register</NavLink>
                        <NavLink className={({ isActive }) => 'nav-item nav-link text-dark' + (isActive ? 'active text-light ' : '')} to="/login">
                            Login</NavLink>


                    </div>
                </nav>
            }

        </div>
    );
}

export default Navcomponent;
