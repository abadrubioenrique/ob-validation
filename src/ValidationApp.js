import { useReducer, useEffect } from 'react';
import { AuthContext } from './utils/Auth/authContext';
import { authReducer } from './utils/Auth/authReducer';
import { ValidationRoutes } from './routers/ValidationRoutes';

const init = () =>{
    return JSON.parse(localStorage.getItem('user')) || {logged:false};   
}

export const Validationapp = () => {

    const [user,dispatch] = useReducer(authReducer, {}, init);

    useEffect(() => {
        if(!user) return;
        localStorage.setItem('user', JSON.stringify(user));

        
       
    }, [user]);

    return (
        <AuthContext.Provider value={{
            user,
            dispatch
        }}>
        <ValidationRoutes/>
        </AuthContext.Provider>
    );
}

