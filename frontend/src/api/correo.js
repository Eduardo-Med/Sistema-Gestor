import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/v1/correo'

export async function enviarCorreo(data){

    try{
      const response = await axios({
        url: `${baseUrl}/`,
        method: 'POST',
        data,
      heders: {
        'content-type': 'multipart/form-data'
    }
      })
      return response
    }catch(error){
      return error.response
    }
  }