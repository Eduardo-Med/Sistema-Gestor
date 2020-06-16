import axios from 'axios'

//const baseUrl = 'http://localhost:5000/api/v1'
const baseUrl = "https://rest-reportes.herokuapp.com/api/v1"


export async function iniciarSesion (data){
    const {noControl,password} = data
    console.log(data)
    try{
      const response = await axios({
        url: `${baseUrl}/autentificar/login`,
        method: 'POST',
        data: {
          noControl,
          password
      },
      })
      console.log("hola")
      return response
    }catch(error){
      console.log(error)
      return error.response
      
    }
  }