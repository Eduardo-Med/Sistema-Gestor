import axios from 'axios'

//const baseUrl = 'http://localhost:5000/api/v1/reporte'
const baseUrl = "https://rest-reportes.herokuapp.com/api/v1/reporte"
export async function obtenerReportes (){
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

  export async function obtenerReportesPorSalon (Salon){
    try{
      const response = await axios({
        url: `${baseUrl}/salon/${Salon}`,
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


export async function agregarReporte(data){
    try{
      const response = await axios({
        url: `${baseUrl}`,
        method: 'POST',
        data,
        usuario:1,
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

  export async function actualizarReporte(data){

    try{
      const response = await axios({
        url: `${baseUrl}/${data.idReporte}`,
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


  export async function eliminarReporte (id){
    try{
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
  