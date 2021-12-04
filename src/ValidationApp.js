import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Route, Routes, Navigate, HashRouter  } from 'react-router-dom';
import Notfoundpage from './components/Pages/404/NotFoundPage';
import LoginPage from './components/Pages/Register/LoginPage';
import RegisterPage from './components/Pages/Register/RegisterPage';
import ValidationPage from './components/Pages/UploadFiles/ValidationPage';
import NavComponent from './components/Navigation/NavComponent';
import QrPage from './components/Pages/qr/QrPage';
import { PrivateOutlet } from './routers/PrivateOutlet';
/** Slices imports */
import { getUserInfo } from './store/slices/user';
import { clearMessage } from './store/slices/message';

export function Validationapp(){
  const { isLoggedIn, authToken : token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

    useEffect(() => {
      if(isLoggedIn){
      dispatch(clearMessage());
      dispatch(getUserInfo(token))
    }
       
    }, [dispatch, isLoggedIn, token]);
    
      return (
        <HashRouter>
            <NavComponent isLoggedIn={isLoggedIn}/>
            <Routes>
              <Route path="*" element={<Notfoundpage />} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/validation" element={<PrivateOutlet isLogged={isLoggedIn} />}>
                <Route path="pass" element={<QrPage />} />
              </Route>
              <Route path={`files/*`} element={<ValidationPage />} />
              <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
          </HashRouter>
      );
}

