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
        await addUser(datosForm);
        window.location.reload(false);
    }

    return (
        <div class="modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog " role="document">
            <div className="container1">
                <div class="modal-content">
                <div className="form__top">
                    <h2>Formulario <span style={{color: "#F39B53"}}>Registro</span></h2>
                </div>
                <div className="form__reg">
                    <input className="input1" name="nombre" type="text" placeholder="&#128100; Nombre" required autofocus onChange={handleInputChange}/>
                    <input className="input1" name="email" type="email" placeholder="&#9993; Email" required onChange={handleInputChange}/>
                    <input className="input1" name="semestre" type="sem" placeholder="&#8962; Semestre" required onChange={handleInputChange}/>
                    <input className="input1" name="noControl" type="tel" placeholder="# No. Control" required onChange={handleInputChange}/>
                    <input className="input1" name="contra" type="sem" placeholder="Contraseña" required onChange={handleInputChange}/>
                    <div className="btn__form">
                        <input className="btn_submit" type="submit" onClick={() => agregarUsuario()} value="REGISTRAR"/>
                        <input  type="button" className="btn_submit" data-dismiss="modal" value="CERRAR"/>
                    </div>
                </div>
            </div>
            </div>
           </div>
        </div>
        )
}

export default RegistroUsuarios

