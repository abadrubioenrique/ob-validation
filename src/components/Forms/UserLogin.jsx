import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import '../Styles/userRegister.scss';

const UserLogin = () => {
    const [formulario, setFormulario] = useState(false);
    
    const [datos, setDatos] = useState();    
    const ApiUrl="https://obvalid4.herokuapp.com/api/auth/login";

    const peticionPost=async()=>{
        await axios.post(ApiUrl,
         {
           username:datos.email,
           password:datos.password
         }
        )}
        
    return (
        <Formik
        initialValues={{
            email:'',
            password:''
        }}
        validate={(values) => {
            let errors = {};

            if (!values.email) {
                errors.email = 'Por favor ingrese su e-mail';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'E-mail incorrecto';
            }
            if(!values.password){
                errors.password = 'Por favor ingrese una contraseña'
            } else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)){
                errors.password = 'La contraseña debe tener mínimo ocho caracteres, al menos una letra y un número:'
            }

            return errors;
        }}
        
            onSubmit={(values, {resetForm}) => {
            resetForm();
            console.log('Formulario enviado');
            alert(JSON.stringify(values, null, 2));
            setDatos(values);
            console.log("Bienvenido" + datos.username);
            setFormulario(true);
            peticionPost();
            setTimeout(() => setFormulario(false), 3000);
        }}
    >
        {( {errors} ) => (
            <>
            <h1>Login de Usuarios</h1>
            <Form className="formulario shadow">
                <div>
                    <label htmlFor="email">E-mail</label>
                    <Field
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="E-mail"
                    />
                    <ErrorMessage name="email" component={() => (<div className="error">{errors.email}</div>)} />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <Field
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Ingrese una contraseña"
                    />
                    <ErrorMessage name="password" component={() => (<div className="error">{errors.password}</div>)} />
                </div>

                <button type="submit">Enviar</button>
                {formulario && <p className="success">Formulario enviado con exito!</p>}
            </Form>
            </>
        )}

    </Formik>
    );
}

export default UserLogin;
