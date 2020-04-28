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
    const {nombre, email, semestre, noControl, contra} = data
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
  