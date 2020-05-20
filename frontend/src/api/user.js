import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/v1'

export async function getUsers (){
    try{
      const response = await axios({
        url: `${baseUrl}/usuario`,
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
        }
      })
      return response
    }catch(error){
      console.log(error)
      return error.response
    }
  }


export async function addUser(data){
    const {nombre, email, semestre, noControl, contra, idTipo} = data
    try{
      const response = await axios({
        url: `${baseUrl}/usuario`,
        method: 'POST',
        data: {
          nombre,
          email,
          semestre,
          noControl,
          contra,
          idTipo
      },
      headers: {
        "Content-Type": 'application/json',
      }
      })
      return response
    }catch(error){
      console.log(error)
      return error.response
    }
  }

  export async function updateUser(data){

    try{
      const response = await axios({
        url: `${baseUrl}/usuario/${data.idUsuario}`,
        method: 'PUT',
        data,
        headers: {
          "Content-Type": 'application/json'
          
        }
      })
      return response
    }catch(error){
      return error.response
    }
  }


  export async function deleteUsers (id){
    try{
      const response = await axios({
        url: `${baseUrl}/usuario/${id}`,
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
        }
      })
      return response
    }catch(error){
      console.log(error)
      return error.response
    }
  }

  export async function activarUsuario (id){
    try{
      const response = await axios({
        url: `${baseUrl}/usuario/activar/${id}`,
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
        }
      })
      return response
    }catch(error){
      console.log(error)
      return error.response
    }

    export async function getUsersType (tipo){
      try{
        const response = await axios({
          url: `${baseUrl}/usuario/tipo/${tipo}`,
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
          },
          data: {
            tipo
          }
        })
        return response
      }catch(error){
        console.log(error)
        return error.response
      }
  }

  export async function desactivarUsuario (id){
    try{
      const response = await axios({
        url: `${baseUrl}/usuario/desactivar/${id}`,
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
        }
      })
      return response
    }catch(error){
      console.log(error)
      return error.response
    }
  }
}
