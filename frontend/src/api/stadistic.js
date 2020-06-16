import axios from 'axios'

//const baseUrl = 'http://localhost:5000/api/v1'
const baseUrl = "https://rest-reportes.herokuapp.com/api/v1"

export async function getStadisticYear (year){
  try{
    const response = await axios({
      url: `${baseUrl}/estadistica/fallaYear/${year}`,
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
      },
      data: {
        year
      }
    })
    return response
  }catch(error){
    console.log(error)
    return error.response
  }
}

export async function getOldestYear (){
  try{
    const response = await axios({
      url: `${baseUrl}/estadistica/PrimerYear/`,
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
      },
    })
    return response
  }catch(error){
    console.log(error)
    return error.response
  }
}

export async function getStadisticAtenPorMes (year){
  try{
    const response = await axios({
      url: `${baseUrl}/estadistica/fallasAtendidas/${year}`,
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
      },
      data: {
        year
      }
    })
    return response
  }catch(error){
    console.log(error)
    return error.response
  }
}

export async function getStadisticFrecuente (year, semestre){
  try{
    const response = await axios({
      url: `${baseUrl}/estadistica/fallaFrecuente/${year}/${semestre}`,
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
      },
      data: {
        year,
        semestre
        
      }
    })
    return response
  }catch(error){
    console.log(error)
    return error.response
  }
}


export async function getSalones (aula, semestre, year){
  try{
    const response = await axios({
      url: `${baseUrl}/estadistica/salones/${aula}/${semestre}/${year}`,
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
      },
      data: {
        aula,
        semestre,
        year
      }
    })
    return response
  }catch(error){
    console.log(error)
    return error.response
  }
}

export async function getEquipo (equipo, semestre, year){
  try{
    const response = await axios({
      url: `${baseUrl}/estadistica/equipo/${equipo}/${semestre}/${year}`,
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
      },
      data: {
        equipo,
        semestre,
        year
      }
    })
    return response
  }catch(error){
    console.log(error)
    return error.response
  }
}

export async function getStadisticPersona (year, idUsuario){
  try{
    const response = await axios({
      url: `${baseUrl}/estadistica/persona/${year}/${idUsuario}`,
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
      },
      data: {
        year,
        idUsuario
      }
    })
    return response
  }catch(error){
    console.log(error)
    return error.response
  }
}

export async function getStadisticEstado (desde, hasta){
  try{
    const response = await axios({
      url: `${baseUrl}/estadistica/estado/${desde}/${hasta}`,
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
      },
      data: {
        desde,
        hasta
      }
    })
    return response
  }catch(error){
    console.log(error)
    return error.response
  }
}
