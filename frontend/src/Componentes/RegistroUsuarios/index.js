import React, {useState} from 'react'
import './main.css'
import {addUser} from '../../api/user'

function RegistroUsuarios() {
    const [datosForm, setDatosForm] = useState({});
    const handleInputChange = (event) => {
        event.persist();
        setDatosForm({...datosForm, [event.target.name]: event.target.value});
    }

    const agregarUsuario= async()=>{
        const response =await addUser(datosForm);
        if(response === 201){
            window.location.reload(false);
        }

    }

    return (
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog " role="document">
            <div className="container1">
                <div class="modal-content">
                <div className="form__top">
                    <h2>Formulario <span style={{color: "#F39B53"}}>Registro</span></h2>
                </div>
                <form className="form__reg" autoComplete="off" onSubmit={agregarUsuario}>
                    <label style={{marginBottom: "-4px"}}>Nombre*</label>
                    <input pattern="[A-Za-z0-9 ]+" min="3" max="60" maxLength="60" minLength="3" className="input1" name="nombre" type="text" placeholder="&#128100; Nombre" required autofocus onChange={handleInputChange}/>
                    <label style={{marginBottom: "-4px"}}>Correo*</label>
                    <input max="75" maxLength="75"  pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$" className="input1" name="email" type="email" placeholder="&#9993; Email" required onChange={handleInputChange}/>
                    <label style={{marginBottom: "-4px"}}>Semestre*</label>
                    <input min="0" max="13" className="input1" name="semestre" type="number" placeholder="&#8962; Semestre" required onChange={handleInputChange}/>
                    <label style={{marginBottom: "-4px"}}>No. Clave*</label>
                    <input maxLength="8" minLength="8" className="input1" name="noControl" type="tel" placeholder="# No. Clave" required onChange={handleInputChange}/>
                    <label style={{marginBottom: "-4px"}}>Contraseña</label>
                    <input minLength="8" maxLength="8" className="input1" name="contra" type="password" placeholder="Contraseña" required onChange={handleInputChange}/>
                    <label style={{marginBottom: "-4px"}}>Seleccione Tipo de Usuario*</label>
                    <select  required className="input1" name="idTipo"  type="sem" placeholder="tipo de usuario*"  id="idTipo" onChange={handleInputChange}>
                        <option value="Administrador">Administrador</option>
                        <option value="Soporte Técnico">Soporte Técnico</option>
                        <option value="Reportador">Reportador</option>
                    </select>
                    <div className="btn__form">
                        <input className="btn_submit" type="submit" value="REGISTRAR"/>
                        <input  type="submit" className="btn_submit" data-dismiss="modal" value="CERRAR"/>
                    </div>
                </form>
            </div>
            </div>
           </div>
        </div>
        )
}

export default RegistroUsuarios

