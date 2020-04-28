import React, {useState, useEffect} from 'react'

import {updateUser} from '../../api/user'

function EditarUsuario({usuario}) {
    const [datosForm, setDatosForm] = useState({});

    useEffect(() => {
        if(usuario){
            setDatosForm({
                idUsuario: usuario.idUsuario,
                nombre: usuario.nombre, 
                email: usuario.email,
                semestre: usuario.semestre,
                noControl: usuario.noControl,
                contra: usuario.contra,
                idTipo: usuario.idTipo
            })
        }
    }, [usuario])

    const handleInputChange = (event) => {
        event.persist();
        setDatosForm({...datosForm, [event.target.name]: event.target.value});
    }

    const editarUsuario= async(data)=>{
        updateUser(data)
        window.location.reload(false);
    }

    return (
        <div class="modal fade" id="ModalEditar" tabindex="-1" role="dialog" aria-labelledby="ModalEditar" aria-hidden="true">
          <div class="modal-dialog " role="document">
            <div className="container1">
                <div class="modal-content">
                <div className="form__top">
                    <h2>Formulario <span style={{color: "#F39B53"}}>Registro</span></h2>
                </div>
                <div className="form__reg">
                    <input className="input1" value={datosForm.nombre} name="nombre" type="text" placeholder="&#128100; Nombre" required autofocus onChange={handleInputChange}/>
                    <input className="input1" value={datosForm.email} name="email" type="email" placeholder="&#9993; Email" required onChange={handleInputChange}/>
                    <input className="input1" value={datosForm.semestre} name="semestre" type="sem" placeholder="&#8962; Semestre" required onChange={handleInputChange}/>
                    <input className="input1" value={datosForm.noControl} name="noControl" type="tel" placeholder="# No. Control" required onChange={handleInputChange}/>
                    <input className="input1" value={datosForm.contra} name="contra" type="password" placeholder="Contraseña" required onChange={handleInputChange}/>
                    <select  className="input1" name="idTipo"  type="sem" placeholder="tipo de usuario"  id="idTipo" onChange={handleInputChange}>
                    <option value="-----">Seleccione tipo de usuario</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Soporte Técnico">Soporte Técnico</option>
                        <option value="Reportador">Reportador</option>
                    </select>
                    <div className="btn__form">
                        <input className="btn_submit" type="submit" onClick={() => editarUsuario(datosForm)} value="EDITAR"/>
                        <input  type="button" className="btn_submit" data-dismiss="modal" value="CERRAR"/>
                    </div>
                </div>
            </div>
            </div>
           </div>
        </div>
        )
}

export default EditarUsuario
