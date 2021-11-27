import react, {useState, useEffect} from 'react';

import './App.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Notfoundpage from './components/Pages/404/NotFoundPage';
import { FilepondComponent } from './components/Validation/FilepondComponent';
import Profilepage from './components/Pages/profile/profilePage';
import { login, logout } from './utils/Auth/JWTAuth';
import { useLocalStorage } from "./hooks/useLocalStorage";
import LoginPage from './components/Pages/Register/LoginPage';
import RegisterPage from './components/Pages/Register/RegisterPage';


export const ValidationRoutes = ()=> {
  
  const [storedToken, setToken] = useLocalStorage('access_token',localStorage.getItem('access_token'));
  const [inLogin,setinLogin] = useState(false);
  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
  }, [setToken]);
 
  console.log(storedToken);

  function PrivateRoute({ children }) {
    return (
      
      inLogin 
      ? 
      children 
      : 
      <Navigate to="/login" />
    
    );
  }
  return (
    <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Notfoundpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/validation" element={
          <PrivateRoute> <FilepondComponent /></PrivateRoute>
         } />
        </Routes>
      </Router>
  );
}

