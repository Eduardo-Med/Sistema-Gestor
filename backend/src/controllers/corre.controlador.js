
const nodemailer = require('nodemailer')
const moment = require("moment")

class CorreoControlador{
    async enviarCorreo(req, res){
        try { 
            let fecha,hora;
            fecha = moment().format().substr(0,10);;
            hora =  moment().format('h:mm:ss a').substr(0,8);
            const {descripcion,estado,accion,cpu,monitor,teclado,mouse,red,cableEnergia,cableVgaHdmi,canon,Equipo,Salon,idUsuario,email} = req.body


            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: process.env.CORREO,
                    pass: process.env.PASSWORD
                }
            })
        
            const mailOptions = {
                from: email,
                to: process.env.CORREO,
                subject: "Equipo Reparado",
                html: `<div> 
                <h1>Gracias por su informe del equipo: ${equipo} </h1> 
                <p><h1 >La situacion de este equipo es la siguiente: </h1></p> 
                <p><h1 style="float: left">Problemas: </h1><span>${email}</span></p> 
                <p><h1 style="float: left">Estado: </h1><span>${descripcion}</span></p> 
             </div> `
            }
      
          transporter.sendMail(mailOptions, (error, info)=>{
              if(error){
                  res.status(500).send(error.message);
              } else{
                  res.status(200).jsonp(req.body);
              }
          } )
          console.log("enviado")
          res.send('recivido')
        } catch (error) {
          res.status(500).json({message: 'A ocurrido un error con el envio del mensaje', error })
        }
      }
}

module.exports = CorreoControlador;

