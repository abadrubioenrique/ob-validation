import { useEffect, useState} from "react";
import { AuthContext } from "../utils/Auth/authContext";
import { Navigate , useLocation} from "react-router-dom";
import { getToken } from "../utils/helpers/auth-helpers";
import axios from "axios";
export const PrivateRoute = ({children}) => {
    const [usuario,setUsuario]= useState(null);
    const [cargandoUsuario, setCargandoUsuario] = useState(true);
    const API_URL = 'https://obvalid4.herokuapp.com';
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
                setCargandoUsuario(false);
            }catch(error){
                console.log(error);
            }
    }
    cargarUsuario();
       
    }, []);
    const location = useLocation();
    localStorage.setItem('lastPath', location.pathname);
    
    return cargandoUsuario===false
    ?
    children
    :
    <Navigate to = "/login"/>
}
