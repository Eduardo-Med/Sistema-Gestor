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
                    <input min="3" max="60" className="input1" name="nombre" type="text" placeholder="&#128100; Nombre" required autofocus onChange={handleInputChange}/>
                    <input max="75" pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$" className="input1" name="email" type="email" placeholder="&#9993; Email" required onChange={handleInputChange}/>
                    <input min="0" max="13" className="input1" name="semestre" type="number" placeholder="&#8962; Semestre" required onChange={handleInputChange}/>
                    <input maxLength="8" minLength="8" className="input1" name="noControl" type="tel" placeholder="# No. Clave" required onChange={handleInputChange}/>
                    <input minLength="8" maxLength="8" className="input1" name="contra" type="password" placeholder="Contraseña" required onChange={handleInputChange}/>
                    <label style={{marginBottom: "-4px"}}>Seleccione Tipo de Usuario</label>
                    <select  required className="input1" name="idTipo"  type="sem" placeholder="tipo de usuario"  id="idTipo" onChange={handleInputChange}>
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

