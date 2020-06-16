import React, {useState, useEffect} from 'react'
import {getUsers, deleteUsers,activarUsuario,desactivarUsuario} from '../../api/user'
import EditarUsuario from '../EditarUsuario'
import VentaVerificacion from '../Otros/VentanaConfirmacion'
import {accessControlAdmin} from '../../helpers/accessControlAdmin'
import swal from 'sweetalert';
import Salones from '../ReporteFallas/Salones'
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
        console.log(response.data.usuario)
        setIsLoading(false);
      }
    }
    loadUsuarios();
  }, []);


  const eliminarUsuario=async(id)=>{
    await deleteUsers(id)
    window.location.reload(false);
  }
  
  const desactivar=async(id)=>{
    swal({
      title: "¿Estas Seguro?",
      text: `Se va a desactivar el usuario`,
      icon: "warning",
      buttons: {cancelar: {text: "Cancelar", value:"Cancelar"}, aceptar: {text: "Desactivar", value: "Eliminar",className: "btn-danger"} },
      dangerMode: true,
    })
    .then(async(value) => {
      if (value === "Eliminar") {
        const result = await desactivarUsuario(id)
        if(result.status === 200){
          swal("Desactivando Usuario!", "Espere un momento porfavor", "success");
          window.location.reload(false)
        }else{
          swal("A ocurrido un error!", "Intentelo de nuevo mas tarde", "error");
        }
      } 
    });
  }

  const activar=async(id)=>{
    swal({
      title: "¿Estas Seguro?",
      text: `Se va a activar el usuario`,
      icon: "warning",
      buttons: {cancelar: {text: "Cancelar", value:"Cancelar"}, aceptar: {text: "Activar", value: "Eliminar",className: "btn-danger"} },
      dangerMode: true,
    })
    .then(async(value) => {
      if (value === "Eliminar") {
        const result = await activarUsuario(id)
        if(result.status === 200){
          swal("Activando Usuario!", "Espere un momento porfavor", "success");
          window.location.reload(false)
        }else{
          swal("A ocurrido un error!", "Intentelo de nuevo mas tarde", "error");
        }
      } 
    });
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
            <th scope="col">Estado</th>
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
               <td>{!usuario.activo ? "Desactivado" : "Activado"}</td>
               <td className="col-12">
                  {!usuario.activo ?
                  <button className="btn btn-dark mr-2" onClick={()=>activar(usuario.idUsuario)}>Activar</button>
                  :
                  <button  className="btn btn-dark mr-2" onClick={()=>desactivar(usuario.idUsuario)}>Desactivar</button>}
                  <button className="btn btn-primary mr-2" data-toggle="modal" data-target="#ModalEditar" onClick={()=>editarUsuario(usuario)}>Editar</button>
                  <button className="btn btn-danger mr-2" data-toggle="modal" data-target=".bd-example-modal-sm" onClick={()=>asignarIdUsuario(usuario.idUsuario)}>Eliminar</button>
               </td>
             </tr>
            ))}
        </tbody>
      </table>
      )
    }
  }
  return (
  <div className="container">
    <div classname="container2 center-block" style={{minWidth: '100%'}}>
      <div classname="form__top">
        <h2 classname="text-center " style={{textAlign: 'center', marginTop:"50px"}}>Usuarios registrados 
        <i class=" iconoColor fas fa-plus-circle ml-1" data-toggle="modal" data-target="#exampleModalCenter"></i>
        </h2>
      </div>
      <div className=" tamanoTabla1">
      {renderUsuarios()}
      </div>
      <EditarUsuario usuario={usuario}/>
      <VentaVerificacion eliminar={eliminarUsuario} usuarioId={usuarioId}/>
    </div>
    <div>
        <Salones/>
    </div>
  </div>
  );
}

export default accessControlAdmin(Usuarios)