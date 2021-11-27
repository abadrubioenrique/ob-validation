import React from 'react';
import '../../../App.css';
import UserLogin from '../../Forms/UserLogin';
import Navcomponent from '../../Navigation/navComponent';

const LoginPage = () => {


    return (
        <div>
        <Navcomponent></Navcomponent>
        <UserLogin></UserLogin>
        </div>
       
        
    );
}

export default LoginPage;
