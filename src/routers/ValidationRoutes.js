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
import ValidationPage from '../components/Pages/UploadFiles/ValidationPage';


export const ValidationRoutes = ()=> {
  function PrivateRoute({ children }) {
    const [logged, setLogged] = useState(true);
   
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

