import react, {useState, useEffect} from 'react';

import '../App.css';

import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Notfoundpage from '../components/Pages/404/NotFoundPage';
import { FilepondComponent } from '../components/Validation/FilepondComponent';
import Profilepage from '../components/Pages/profile/profilePage';
import { login, logout } from '../utils/Auth/JWTAuth';
import { useLocalStorage } from "../hooks/useLocalStorage";
import LoginPage from '../components/Pages/Register/LoginPage';
import RegisterPage from '../components/Pages/Register/RegisterPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import ValidationPage from '../components/Pages/UploadFiles/ValidationPage';


export const ValidationRoutes = ()=> {
  
  const [storedToken, setToken] = useLocalStorage('access_token',localStorage.getItem('access_token'));

  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
  }, [setToken]);
 
  console.log(storedToken);

  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="*" element={<Notfoundpage />} />
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage/>
            </PublicRoute>  
          } />
          
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>  
          } />
          
          <Route path="/" element={
            <PrivateRoute>
              <ValidationPage></ValidationPage>
            </PrivateRoute>
         } />
        </Routes>
      </BrowserRouter>
  );
}

