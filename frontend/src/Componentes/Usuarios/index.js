import React, {useState, useEffect} from 'react'
import {getUsers, deleteUsers} from '../../api/user'
import EditarUsuario from '../EditarUsuario'
import VentaVerificacion from '../Otros/VentanaConfirmacion'
import './vistaAdmin.css'
function Usuarios() {
  const [isLoading, setIsLoading] = useState(true);
  const [usuarios, setUsuarios] = useState({})
  const [usuario, setUsuario] = useState({})
  const [usuarioId, setUsuarioId] = useState();

  useEffect(() => {
    async function loadUsuarios() {
      const response = await getUsers();
      if (response.status === 200) {
        setUsuarios(response.data.usuario);
        console.log(response)
        setIsLoading(false);
      }
    }
    loadUsuarios();
  }, []);


  const eliminarUsuario=async(id)=>{
    await deleteUsers(id)
    window.location.reload(false);
  }

  const editarUsuario=(user)=>{
    setUsuario(user)
  }

  const asignarIdUsuario=(id)=>{
    setUsuarioId(id)
  }


  const renderTipoUsuario=(idTipo)=>{
      if(idTipo === 1){
        return "Administrador"
      }else if(idTipo === 2){
        return "Soporte Técnico"
      }else{
        return "Reportador"
      }
  }
  

  const renderUsuarios=()=> {          
    if(!isLoading){
      return (
        <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Correo electronico</th>
            <th scope="col">Semestre</th>
            <th scope="col">numero de control</th>
            <th scope="col">Tipo de usuario</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
            {usuarios.map((usuario,index) =>(
               <tr key={index}>
               <td>{usuario.nombre}</td>
               <td>{usuario.email}</td>
               <td>{usuario.semestre}</td>
               <td>{usuario.noControl}</td>
               <td>{renderTipoUsuario(usuario.idTipo)}</td>
               <td>
                  <button className="btn btn-danger mr-2" data-toggle="modal" data-target=".bd-example-modal-sm" onClick={()=>asignarIdUsuario(usuario.idUsuario)}>Eliminar</button>
                  <button className="btn btn-primary mr-2" data-toggle="modal" data-target="#ModalEditar" onClick={()=>editarUsuario(usuario)}>Editar</button>
               </td>
             </tr>
            ))}
        </tbody>
      </table>
      )
    }
  }
  return (
    <div classname="container2 center-block" style={{minWidth: '100%'}}>
      <div classname="form__top">
        <h2 classname="text-center mt-5" style={{textAlign: 'center'}}>Usuarios registrados</h2>
      </div>
      <div className="table-responsive">
      {renderUsuarios()}
      </div>
      <EditarUsuario usuario={usuario}/>
      <VentaVerificacion eliminar={eliminarUsuario} usuarioId={usuarioId}/>
      <div classname="btn__form">
        <input type="button" className=" btn__button btn btn-info" data-toggle="modal" data-target="#exampleModalCenter"  value="NUEVO REGISTRO"/>
      </div>
    </div>
  );
}

export default Usuarios