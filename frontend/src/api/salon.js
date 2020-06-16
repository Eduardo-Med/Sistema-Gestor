import axios from 'axios'


//const baseUrl = 'http://localhost:5000/api/v1/salon'
const baseUrl = "https://rest-reportes.herokuapp.com/api/v1/salon"
export async function obtenerSalones (){
    try{
      const response = await axios({
        url: `${baseUrl}`,
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


export async function agregarSalon(salon){
    try{
      const response = await axios({
        url: `${baseUrl}`,
        method: 'POST',
        data:{
          salon
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

  export async function eliminarSalon (id){
    try{
      console.log(`${baseUrl}/${id}`)
      const response = await axios({
        url: `${baseUrl}/${id}`,
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