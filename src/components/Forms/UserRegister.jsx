import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import '../Styles/userRegister.scss';
const UserRegister = () => {
    const [formulario, setFormulario] = useState(false);
    const [requestError, setRequestError] = useState('');
     
    const ApiUrl="https://obvalid4.herokuapp.com/api/auth/register";


    const peticionPost=(datos)=>{

            axios.post(ApiUrl,
                {
                  name:datos.name,
                  surname:datos.surname,
                  email:datos.email,
                  password:datos.password
                }
               ).then(
                setRequestError('')
               ).catch(error=>{
                setFormulario(false);
                if(error.response.status ===400){
                    setRequestError("Ese e-mail ya está en uso");
                }else{
                    setRequestError(error.message);
                }
                });   
        }
    

    return (

        <Formik
        initialValues={{
            name: '',
            surname:'',
            email:'',
            password:''
        }}
        validate={(values) => {
            let errors = {};

            // Validation title
            if(!values.name){
                errors.name = 'Por favor ingrese su nombre'
            } else if(!/^[a-zA-ZÀ-ÿ\s]{1,30}$/.test(values.name)){
                errors.name = 'El nombre solo puede contener letras y espacios, y no debe superar los 30 caracteres'
            }
            // Validation surname
            if(!values.surname){
                errors.surname = 'Por favor ingrese sus apellidos'
            } else if(!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(values.surname)){
                errors.surname = 'Los apellidos solo pueden contener letras y espacios y no debe superar los 50 caracteres'
            }
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
            
            peticionPost(values);
            setFormulario(true);
            setTimeout(() => setFormulario(false), 2700);
        }}
    >
        {( {errors} ) => (
            <>
            <h1>Registro de Usuarios</h1>
            <Form className="formulario shadow">
                <div>
                    <label htmlFor="name">Nombre</label>
                    <Field                        
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Nombre"
                    />
                    <ErrorMessage name="name" component={() => (<div className="error">{errors.name}</div>)} />
                </div>
                <div>
                    <label htmlFor="surname">Apellidos</label>
                    <Field
                        type="text" 
                        id="surname" 
                        name="surname" 
                        placeholder="Apellidos"
                    />
                    <ErrorMessage name="surname" component={() => (<div className="error">{errors.surname}</div>)} />
                </div>
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
                {(requestError===('') && formulario ===true) ? (<p className="success">Formulario enviado!</p>):(<p className="error">{requestError}</p>) }


            </Form>
            </>
        )}

    </Formik>
    );
}

export default UserRegister;