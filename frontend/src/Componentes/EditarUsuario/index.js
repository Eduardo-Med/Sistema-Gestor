import React, {useState, useEffect} from 'react'

import {updateUser} from '../../api/user'

function EditarUsuario({usuario}) {
    const [datosForm, setDatosForm] = useState({});
    const [seleccionado1, setSeleccionado1] = useState(false);
    const [seleccionado2, setSeleccionado2] = useState(false);
    const [seleccionado3, setSeleccionado3] = useState(false);
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
            
            switch (usuario.idTipo) {
                case 1:
                    setSeleccionado1(true)
                    break;
                case 2:
                    setSeleccionado2(true)
                    break;

                case 3:
                    setSeleccionado3(true)
                    break;
                default:
                    break;
            }
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
                <form className="form__reg" autoComplete="off"  onSubmit={ () => editarUsuario(datosForm)}>
                    <input min="3" max="60" className="input1" value={datosForm.nombre} name="nombre" type="text" placeholder="&#128100; Nombre" required autofocus onChange={handleInputChange}/>
                    <input max="75" pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$" className="input1" value={datosForm.email} name="email" type="email" placeholder="&#9993; Email" required onChange={handleInputChange}/>
                    <input min="0" max="13" className="input1" value={datosForm.semestre} name="semestre" type="sem" placeholder="&#8962; Semestre" required onChange={handleInputChange}/>
                    <input maxLength="8" minLength="8" className="input1" value={datosForm.noControl} name="noControl" type="tel" placeholder="# No. Control" required onChange={handleInputChange}/>
                    <input maxLength="8" minLength="8" className="input1" value={datosForm.contra} name="contra" type="password" placeholder="Contraseña" required onChange={handleInputChange}/>
                    <select  className="input1" name="idTipo"  type="sem" placeholder="tipo de usuario"  id="idTipo" onChange={handleInputChange}>
                    <option value="-----">Seleccione tipo de usuario</option>
                        <option value="Administrador" selected={seleccionado1}>Administrador</option>
                        <option value="Soporte Técnico" selected={seleccionado2}>Soporte Técnico</option>
                        <option value="Reportador" selected={seleccionado3}>Reportador</option>
                    </select>
                    <div className="btn__form">
                        <input className="btn_submit" type="submit" value="EDITAR"/>
                        <input  type="button" className="btn_submit" data-dismiss="modal" value="CERRAR"/>
                    </div>
                </form>
            </div>
            </div>
           </div>
        </div>
        )
}

export default EditarUsuario
