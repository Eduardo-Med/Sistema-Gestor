const {poolPromise} = require("../models/database");
const moment = require("moment")


class ReporteControlador{

    async obtenerReportes (req, res) {
        try {
          const pool = await poolPromise
          const result = await pool.request().query('exec Buscar_Reporte_Con_Usuario ')
          res.status("200").send({reportes: result.recordset});
        } catch (e) {
          res.status("204").send(e);
        }
      };
      
      async obtenerReportesPorSalon(req, res) {
        try {
          const pool = await poolPromise
          const result = await pool.request().query(`exec Buscar_Reporte_Por_Salon ${req.params.Salon}`)
          res.status("200").send({reportes: result.recordset});
        } catch (e) {
          res.status("204").send(e);
        }
      };
      

      async crearReporte (req, res){
          try {
            let fecha,hora;
            fecha = moment().format().substr(0,10);;
            hora =  moment().format('h:mm:ss a').substr(0,8);
            const pool = await poolPromise
            const {descripcion,accion,cpu,monitor,teclado,mouse,red,cableEnergia,cableVgaHdmi,canon,Equipo,Salon,idUsuario} = req.body
            await pool.request().query(`exec Insercion_Reporte '${fecha}', '${hora}','Pendiente','${descripcion}','${accion}',${cpu},${monitor},${teclado},${mouse},${red},${cableEnergia},${cableVgaHdmi},${canon},'${Equipo}','${Salon}',${idUsuario} `);      
            res.status(200).json({Info: "Reporte Agregado Correctamente"});
            console.log("Reporte Agregado Correctamente")
          } catch (e) {
            console.log(e)
            res.status(400).json({code: e.code,message: e.sqlMessage});
          }
        };
      
      
      
      
        async actualizarReporte (req, res) {
          try {
            let fecha,hora;
            fecha = moment().format().substr(0,10);;
            hora =  moment().format('h:mm:ss a').substr(0,8);
            const pool = await poolPromise
            const {descripcion,estado,accion,cpu,monitor,teclado,mouse,red,cableEnergia,cableVgaHdmi,canon,Equipo,Salon,idUsuario} = req.body
            console.log(req.body)
            console.log(req.params.idReporte)
              await pool.request().query(`exec Modificar_Reporte ${req.params.idReporte}, '${fecha}', '${hora}','${estado}','${descripcion}','${accion}',${cpu},${monitor},${teclado},${mouse},${red},${cableEnergia},${cableVgaHdmi},${canon},'${Equipo}','${Salon}',${idUsuario}`);
              console.log("actualizado")
              res.status(200).json({message: "Reporte Actualizado Correctamente"})
          } catch (error) {
              console.log(error)
              res.status(400).json({code: error.code,message: error.sqlMessage});
          }
          
      }
      
        
      async borrarReporte (req, res) {
          try {
              const pool = await poolPromise
              await pool.request().query(`exec Eliminar_reporteID ${req.params.idReporte}`);
              console.log(req.params.idReporte)
              res.status(200).json("Reporte Eliminado")
          } catch (e) {
            console.log(e)
              res.status(400).json(e)
          }
      
       }
      
}


module.exports = ReporteControlador;