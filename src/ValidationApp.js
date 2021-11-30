import { useState, useEffect } from 'react';
import axios from 'axios';
import { setToken, deleteToken, getToken, initAxiosInterceptors } from './utils/helpers/auth-helpers';


import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Notfoundpage from './components/Pages/404/NotFoundPage';
import LoginPage from './components/Pages/Register/LoginPage';
import RegisterPage from './components/Pages/Register/RegisterPage';
import ValidationPage from './components/Pages/UploadFiles/ValidationPage';

//Ejecuta axiosinterceptors para checkear si hay un token
initAxiosInterceptors();
export function Validationapp(){
    const API_URL = 'https://obvalid4.herokuapp.com';
    const [usuario,setUsuario]= useState(null);
    const [cargandoUsuario, setCargandoUsuario] = useState(true);
    const [logged, setLogged]= useState(false);

    useEffect(() => {
        async function cargarUsuario(){
            if(!getToken()){
                setCargandoUsuario(false);
                return;
            }
            try{
                const {data: usuario} = await axios.get(API_URL + '/api/whoami');
                setUsuario(usuario);
                setLogged(true);
                setCargandoUsuario(false);
            }catch(error){
            }
    }
        cargarUsuario();
       
    }, []);

    function PrivateRoute({ children }) {
        return  logged ? children : <Navigate to="/login" />;
    }
      return (
        <BrowserRouter>
            <Routes>
              <Route path="*" element={<Notfoundpage />} />
              <Route path="/login" element={
    
                  <LoginPage/>
     
              } />
              
              <Route path="/register" element={
    
                  <RegisterPage />
     
              } />
              
              <Route path="/" element={
                <PrivateRoute>
                  <ValidationPage/>
                </PrivateRoute>
             } />
            </Routes>
          </BrowserRouter>
      );
}

