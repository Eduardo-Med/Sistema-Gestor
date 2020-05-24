
const nodemailer = require('nodemailer')

class CorreoControlador{
    async enviarCorreo(req, res){
        try { 
            const {Equipo,Salon,email} = req.body

            console.log(Equipo)
            console.log(Salon)
            console.log(email)

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: 'laprortocorreo@gmail.com',
                    pass: 'Laproorto'
                }
            })
        
            const mailOptions = {
                from:"Sistema Gestor ITH",
                to: `${email}`,
                subject: "Equipo Reparado",
                html: `<div> 
                <h1>Gracias por su informe del equipo: ${Equipo} del Salon ${Salon} </h1> 
                <p>por este medio le avisamos que el reporte del fallo que usted realizo a quedado resuelto, le a gradecemos su ayuda</p> 
             </div> `
            }
      
          transporter.sendMail(mailOptions, (error, info)=>{
              if(error){
                  console.log(error.message)
                  res.status(500).send(error.message);
              } else{
                  res.status(200).jsonp(req.body);
              }
          } )
          console.log("enviado")
          res.send('recivido')
        } catch (error) {
          console.log(error.error)
          res.status(500).json({message: 'A ocurrido un error con el envio del mensaje', error })
        }
      }
}

module.exports = CorreoControlador;

