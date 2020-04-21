import React from 'react';
import logo from './logoIth.png';
import './style.css';

const Login = () => {
  return (
    <div className="Login">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="" />
        <h1 >Inicio de sesión </h1>
        <input className="form-control col-11 col-sm-10 col-md-6 col-lg-4 col-xl-4 mt-2" placeholder="Número de Control"></input>
        <input className="form-control col-11 col-sm-10 col-md-6 col-lg-4 col-xl-4 mt-2" placeholder="Contraseña" type="password"></input>
        <button className="form-control text-white bg-success col-11 col-sm-10 col-md-6 col-lg-4 col-xl-4 mt-4">Ingresar</button>
      </div>
    </div>
  );
}

export default Login;
