import React, {useState, useEffect} from 'react'
import {getUsers, deleteUsers} from '../../api/user'
import './vistaAdmin.css'
function Usuarios() {
  const [isLoading, setIsLoading] = useState(true);
  const [usuarios, setUsuarios] = useState({})

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
  

  const renderUsuarios=()=> {          
    if(!isLoading){
      return (
        <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">No. de Control</th>
            <th scope="col">Correo electronico</th>
            <th scope="col">semestre</th>
            <th scope="col">telefono</th>
            <th scope="col">Accion</th>

          </tr>
        </thead>
        <tbody>
            {usuarios.map((usuario,index) =>(
               <tr key={index}>
               <td>{usuario.nombre}</td>
               <td>{usuario.noControl}</td>
               <td>{usuario.email}</td>
               <td>{usuario.semestre}</td>
               <td>{usuario.telefono}</td>
               <td>
                  <button className="btn btn-danger mr-2" onClick={()=>eliminarUsuario(usuario.idUsuario)}>Eliminar</button>
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
      <div classname="btn__form">
        <input type="button" className=" btn__button btn btn-info" data-toggle="modal" data-target="#exampleModalCenter"  value="NUEVO REGISTRO"/>
      </div>
    </div>
  );
}

export default Usuarios