import React, {useState} from 'react';
import logo from './logoIth.png';
import { useCookies } from "react-cookie";
import './style.css';
import {iniciarSesion} from '../../api/autentificacion'

const Login = () => {

  const [datosForm, setDatosForm] = useState({});
  const [, setCookie, ] = useCookies(["cookie-name"]);
  const [mensajeError, setMensajeError] = useState('')

  const handleInputChange = (event) => {
      event.persist();
      setDatosForm({...datosForm, [event.target.name]: event.target.value});
  }

  const enviarInformacion= async()=>{
      const response = await iniciarSesion(datosForm);
      if (response.status === 200) {
        console.log(response)
        setCookie("token", response.data.token, { path: "/", maxAge: 3600 });
        setCookie("userId", response.data.userId, { path: "/", maxAge: 3600 });
        setCookie("tipoUsuario", response.data.tipoUsuario, {path: "/",maxAge: 3600,});
        response.data.tipoUsuario === 1 ? 
        window.location.href = "http://localhost:3000/Registrousuario" :
        window.location.href = "http://localhost:3000/FormularioReporte"
      } else if (response.status === 404) {
        setMensajeError("Numero de control no existe")
      } else {
        setMensajeError("Contraseña Incorrecta")
      }
   
  }

  return (
    <div className="Login">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="" />
        <h1 >Inicio de sesión </h1>
        <label className="text-danger">{mensajeError}</label>
        <input className="form-control col-11 col-sm-10 col-md-6 col-lg-4 col-xl-4 mt-2" name="noControl" placeholder="Número de Control" autoFocus onChange={handleInputChange}></input>
        <input className="form-control col-11 col-sm-10 col-md-6 col-lg-4 col-xl-4 mt-2" name="password" placeholder="Contraseña" type="password" onChange={handleInputChange}></input>
        <button className="form-control text-white bg-success col-11 col-sm-10 col-md-6 col-lg-4 col-xl-4 mt-4" onClick={() => enviarInformacion()}>Ingresar</button>
      </div>
    </div>
  );
}

export default Login;
