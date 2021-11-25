import react, {useEffect} from 'react';

import './App.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserRegister from './components/Forms/UserRegister';
import Notfoundpage from './components/Pages/404/NotFoundPage';
import UserLogin from './components/Forms/UserLogin';
import { FilepondComponent } from './components/Validation/FilepondComponent';
import Profilepage from './components/Pages/profile/profilePage';



function AppRoutes() {
  let logged = false;

  useEffect(() => {
    logged = localStorage.getItem('access_token');
    
  }, []);

  function PrivateRoute({ children }) {
    return logged ? children : <Navigate to="/login" />;
  }
  return (
    <Router>
        <Routes>
          <Route path="/register" element={<UserRegister />} />
          <Route path="*" element={<Notfoundpage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/validation" element={
          <PrivateRoute> <FilepondComponent /></PrivateRoute>
         } />
        </Routes>
      </Router>
  );
}

export default AppRoutes;
