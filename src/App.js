

import  {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from './components/Forms/UserRegister';
import Notfoundpage from './components/Pages/404/NotFoundPage';
import UserLogin from './components/Forms/UserLogin';
import { FilepondComponent } from './components/Validation/FilepondComponent';
import { login, register, logout } from './utils/Auth/JWTAuth';

class App extends Component {
/*
  async login(){
    let info = {
        username:datos.form.username,
        password:datos.form.password
    };

    await login(info);

  } 
  async register(){
    let info = {
      name: datos.form.name,
      surname: datos.form.surname,
      email: datos.form.email,
      password: datos.form.password
    };

    await register(info); 
  }
  */
  render() {

    return (
      <div className="container">
      <div className="row">
        <h1>React JWT Authentication Example</h1>

        <button className="btn btn-primary" onClick = { this.register }>Sign up</button>

        <button className="btn btn-primary" onClick = { this.login }>Log in</button>

        <button className="btn btn-primary" onClick = { logout }>Log out</button>

      </div>
      </div>
    );
  }
}

export default App;
